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

    .page-editor-sidebar {
      height: calc(100vh - 64px);
    }

    .page-editor-sidebar-content {
      height: calc(100vh - 64px);
    }
  </style>

  <div id="ControlMenu"></div>
  <div class="toolbar page-editor__toolbar" id="_com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet_pageEditorToolbar"></div>
  <main class="layout-content" id="layoutContent"></main>
`;

ReactDOM.render(
  <ClayIconSpriteContext.Provider value="/o/classic-theme/images/lexicon/icons.svg">
    <PageEditorApp
      config={window.PAGE_EDITOR_DATA.config}
      state={window.PAGE_EDITOR_DATA.state}
    />
  </ClayIconSpriteContext.Provider>,
  document.getElementById('layoutContent'),
);
