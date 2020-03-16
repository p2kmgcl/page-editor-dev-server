const puppeteer = require('puppeteer');

module.exports = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  console.log('Logging in...');

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

  console.log('Creating new content page...');

  await page.goto(
    'http://localhost:8080/group/guest/~/control_panel/manage?p_p_id=com_liferay_layout_admin_web_portlet_GroupPagesPortlet&p_p_lifecycle=0&p_p_state=maximized&p_p_mode=view&_com_liferay_layout_admin_web_portlet_GroupPagesPortlet_mvcPath=%2Fselect_layout_page_template_entry.jsp&_com_liferay_layout_admin_web_portlet_GroupPagesPortlet_redirect=%2Fgroup%2Fguest%2F~%2Fcontrol_panel%2Fmanage%3Fp_p_id%3Dcom_liferay_layout_admin_web_portlet_GroupPagesPortlet%26p_p_lifecycle%3D0%26p_p_state%3Dmaximized%26p_v_l_s_g_id%3D20121%26p_p_auth%3DB9JHzlM8&_com_liferay_layout_admin_web_portlet_GroupPagesPortlet_backURL=%2Fgroup%2Fguest%2F~%2Fcontrol_panel%2Fmanage%3Fp_p_id%3Dcom_liferay_layout_admin_web_portlet_GroupPagesPortlet%26p_p_lifecycle%3D0%26p_p_state%3Dmaximized%26p_v_l_s_g_id%3D20121%26p_p_auth%3DB9JHzlM8&_com_liferay_layout_admin_web_portlet_GroupPagesPortlet_groupId=20121&_com_liferay_layout_admin_web_portlet_GroupPagesPortlet_selPlid=0&_com_liferay_layout_admin_web_portlet_GroupPagesPortlet_privateLayout=false&_com_liferay_layout_admin_web_portlet_GroupPagesPortlet_selectedTab=basic-templates&p_p_auth=B9JHzlM8',
  );
  await page.click('.add-layout-action-option');

  await page.waitFor(1000);
  await page.waitForSelector('.dialog-iframe-node');
  await page.$eval('.dialog-iframe-node', async f => {
    f.contentDocument.querySelector(
      '#_com_liferay_layout_admin_web_portlet_GroupPagesPortlet_name',
    ).value = 'AutoContent';
    await new Promise(resolve => setTimeout(resolve, 300));
    f.contentDocument.querySelector('.btn.btn-primary').click();
  });
  await page.waitForSelector('#page-editor');

  console.log('Getting DisplayContext...');

  const url = await page.url();
  const response = await page.goto(url);
  const data = /(\{"portletId".+\}), '[a-z]{4}'\);\n/g.exec(
    await response.text(),
  )[1];
  await browser.close();

  return data;
};
