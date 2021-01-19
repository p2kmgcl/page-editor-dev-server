const puppeteer = require('puppeteer');

const LOGIN_USERNAME = 'test';
const LOGIN_PASSWORD = 'test';

const LOGIN_INPUT_SELECTOR =
  '#_com_liferay_login_web_portlet_LoginPortlet_login';
const PASSWORD_INPUT_SELECTOR =
  '#_com_liferay_login_web_portlet_LoginPortlet_password';
const LOGIN_BUTTON_SELECTOR = '.btn.btn-primary';
const ADD_LAYOUT_BUTTON_SELECTOR = '.add-layout-action-option';
const PAGE_NAME_INPUT_SELECTOR =
  '#_com_liferay_layout_admin_web_portlet_GroupPagesPortlet_name';
const PAGE_NAME_BUTTON_SELECTOR = '.btn.btn-primary';
const PAGE_EDITOR_VIEWPORT_SELECTOR = '.page-editor__layout-viewport';

const DISPLAY_CONTEXT_REGEXP = /(\{"portletId":"com_liferay_layout_content_page_editor_web.+_ContentPageEditorPortlet_"\}), /;

const getLoginURL = (host) =>
  `http://${host}/web/guest/home?p_p_id=com_liferay_login_web_portlet_LoginPortlet&p_p_lifecycle=0&p_p_state=maximized&p_p_mode=view&saveLastPath=false&_com_liferay_login_web_portlet_LoginPortlet_mvcRenderCommandName=%2Flogin%2Flogin`;
const getPageAdminURL = (host) =>
  `http://${host}/group/guest/~/control_panel/manage?p_p_id=com_liferay_layout_admin_web_portlet_GroupPagesPortlet&p_p_lifecycle=0&p_p_state=maximized&p_p_mode=view&_com_liferay_layout_admin_web_portlet_GroupPagesPortlet_mvcPath=%2Fselect_layout_page_template_entry.jsp&_com_liferay_layout_admin_web_portlet_GroupPagesPortlet_groupId=20121&_com_liferay_layout_admin_web_portlet_GroupPagesPortlet_selPlid=0&_com_liferay_layout_admin_web_portlet_GroupPagesPortlet_privateLayout=false&_com_liferay_layout_admin_web_portlet_GroupPagesPortlet_selectedTab=basic-templates`;

const login = async (host, page) => {
  await page.goto(getLoginURL(host));
  await page.type(LOGIN_INPUT_SELECTOR, LOGIN_USERNAME);
  await page.type(PASSWORD_INPUT_SELECTOR, LOGIN_PASSWORD);
  await page.click(LOGIN_BUTTON_SELECTOR);
  await page.waitForNavigation();
};

const getGetDisplayContext = (host, page, url) =>
  async function getDisplayContext() {
    const response = await page.goto(url);
    const result = DISPLAY_CONTEXT_REGEXP.exec(await response.text());

    if (!result || !result[1]) {
      console.log('Display context was not found.');
      console.log('Session might have expired, retrying...');

      try {
        await login(host, page);
        return await getDisplayContext();
      } catch (error) {
        console.log('\nLogin failed. Server will exit.');
        console.log(error.toString());
      }

      process.exit(1);
    } else {
      return result[1];
    }
  };

module.exports = async (host, masterPage) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  console.log(`Logging in (${LOGIN_USERNAME}:${LOGIN_PASSWORD})...`);
  await login(host, page);

  console.log(`Creating new content page with master page "${masterPage}"...`);

  await page.goto(getPageAdminURL(host));

  await page.$$(ADD_LAYOUT_BUTTON_SELECTOR).then(async (handles) => {
    const tuples = await Promise.all(
      handles.map(async (handle) => [
        handle,
        await handle.evaluate((element) => element.textContent.trim()),
      ]),
    );

    try {
      const [handle, title] = tuples.find(([, title]) => title === masterPage);

      if (!title) throw new Error();
      return handle.click();
    } catch (error) {
      await browser.close();
      throw new Error(`Master page "${masterPage}" not found`);
    }
  });

  await page.waitForTimeout(1000);
  await page.waitForSelector('iframe');

  await page.$eval(
    'iframe',
    async (f, buttonSelector, inputSelector) => {
      const fillForm = async () => {
        if (!f || !f.contentDocument) return;

        const button = f.contentDocument.querySelector(buttonSelector);
        const input = f.contentDocument.querySelector(inputSelector);

        if (!input || !button) return setTimeout(fillForm, 1000);

        input.value = 'AutoContent';
        await new Promise((resolve) => setTimeout(resolve, 1000));
        button.click();

        return setTimeout(fillForm, 1000);
      };

      await fillForm();
    },
    PAGE_NAME_BUTTON_SELECTOR,
    PAGE_NAME_INPUT_SELECTOR,
  );

  console.log('Waiting for page editor to be ready...');
  await page.waitForSelector(PAGE_EDITOR_VIEWPORT_SELECTOR);
  const url = await page.url();
  return getGetDisplayContext(host, page, url);
};
