const puppeteer = require('puppeteer');

const login = async (page) => {
  await page.goto(
    'http://localhost:8080/web/guest/home?p_p_id=com_liferay_login_web_portlet_LoginPortlet&p_p_lifecycle=0&p_p_state=maximized&p_p_mode=view&saveLastPath=false&_com_liferay_login_web_portlet_LoginPortlet_mvcRenderCommandName=%2Flogin%2Flogin',
  );
  await page.type('#_com_liferay_login_web_portlet_LoginPortlet_login', 'test');
  await page.type(
    '#_com_liferay_login_web_portlet_LoginPortlet_password',
    'test',
  );
  await page.click('.btn.btn-primary');
  await page.waitForNavigation();
};

const getGetDisplayContext = (page, url) => async () => {
  const response = await page.goto(url);
  const result = /(\{"portletId".+\}), '[a-z]{4}'\);\n/g.exec(
    await response.text(),
  );

  if (!result || !result[1]) {
    console.log('Session has expired, retrying...');
    await login(page);
    return await getDisplayContext(page, url);
  } else {
    return result[1];
  }
};

module.exports = async (masterPage) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  console.log('Logging in...');
  await login(page);

  console.log(`Creating new content page with master page "${masterPage}"...`);

  await page.goto(
    'http://localhost:8080/group/guest/~/control_panel/manage?p_p_id=com_liferay_layout_admin_web_portlet_GroupPagesPortlet&p_p_lifecycle=0&p_p_state=maximized&p_p_mode=view&_com_liferay_layout_admin_web_portlet_GroupPagesPortlet_mvcPath=%2Fselect_layout_page_template_entry.jsp&_com_liferay_layout_admin_web_portlet_GroupPagesPortlet_redirect=%2Fgroup%2Fguest%2F~%2Fcontrol_panel%2Fmanage%3Fp_p_id%3Dcom_liferay_layout_admin_web_portlet_GroupPagesPortlet%26p_p_lifecycle%3D0%26p_p_state%3Dmaximized%26p_v_l_s_g_id%3D20121%26p_p_auth%3DB9JHzlM8&_com_liferay_layout_admin_web_portlet_GroupPagesPortlet_backURL=%2Fgroup%2Fguest%2F~%2Fcontrol_panel%2Fmanage%3Fp_p_id%3Dcom_liferay_layout_admin_web_portlet_GroupPagesPortlet%26p_p_lifecycle%3D0%26p_p_state%3Dmaximized%26p_v_l_s_g_id%3D20121%26p_p_auth%3DB9JHzlM8&_com_liferay_layout_admin_web_portlet_GroupPagesPortlet_groupId=20121&_com_liferay_layout_admin_web_portlet_GroupPagesPortlet_selPlid=0&_com_liferay_layout_admin_web_portlet_GroupPagesPortlet_privateLayout=false&_com_liferay_layout_admin_web_portlet_GroupPagesPortlet_selectedTab=basic-templates&p_p_auth=B9JHzlM8',
  );

  await page.$$('.add-layout-action-option').then(async (handles) => {
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

  await page.waitFor(1000);
  await page.waitForSelector('.dialog-iframe-node');

  await page.$eval('.dialog-iframe-node', async (f) => {
    const fillForm = async () => {
      if (!f || !f.contentDocument) return;

      const button = f.contentDocument.querySelector('.btn.btn-primary');
      const input = f.contentDocument.querySelector(
        '#_com_liferay_layout_admin_web_portlet_GroupPagesPortlet_name',
      );

      if (!input || !button) return setTimeout(fillForm, 1000);

      input.value = 'AutoContent';
      await new Promise((resolve) => setTimeout(resolve, 1000));
      button.click();

      return setTimeout(fillForm, 1000);
    };

    fillForm();
  });

  await page.waitForSelector('.page-editor__layout-viewport');

  console.log('Getting DisplayContext url...');
  const url = await page.url();

  return getGetDisplayContext(page, url);
};
