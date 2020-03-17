import 'atlas';
import 'PageEditorStyles';
import 'PageEditorMock';

import React from 'react';
import ReactDOM from 'react-dom';
import { ClayIconSpriteContext } from '@clayui/icon';
import PageEditorApp from 'PageEditorApp';

document.body.innerHTML = `
  <style>
    .toolbar {
      display: flex;
      align-items: center;
      border-bottom: solid #ddd thin;
    }

    .toolbar > .container-fluid {
      display: flex;
      justify-content: space-between;
    }

    body {
      background: white !important;
    }

    .page-editor__sidebar {
      top: 0 !important;
    }

    .page-editor__sidebar,
    .page-editor__sidebar__buttons,
    .page-editor__sidebar__content {
      height: 100vh !important;
    }
  </style>

  <div class="control-menu control-menu-container">
    <div class="lfr-control-menu-panel" id="ControlMenu"></div>
    <div class="toolbar management-bar navbar navbar-expand-md page-editor__toolbar" id="_com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet_pageEditorToolbar"></div>
  </div>

  <div id="wrapper">
    <main class="layout-content" id="layoutContent"></main>
  </div>
`;

window.GET_PAGE_EDITOR_DATA().then(pageEditorData => {
  ReactDOM.render(
    <ClayIconSpriteContext.Provider value="/o/classic-theme/images/lexicon/icons.svg">
      <PageEditorApp
        config={pageEditorData.config}
        state={pageEditorData.state}
      />
    </ClayIconSpriteContext.Provider>,
    document.getElementById('layoutContent'),
  );
});
