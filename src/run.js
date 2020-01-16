import 'atlas';
import 'PageEditorStyles';
import React from 'react';
import ReactDOM from 'react-dom';
import { ClayIconSpriteContext } from '@clayui/icon';
import PageEditorServerData from 'PageEditorServerData';
import PageEditor from 'PageEditor';

document.body.innerHTML = `
  <style>
    .toolbar {
      height: 63px;
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

  <div class="toolbar" id="_com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet_pageEditorToolbar"></div>
  <main class="layout-content" id="layoutContent"></main>
`;

const { config, state } = PageEditorServerData;

ReactDOM.render(
  <ClayIconSpriteContext.Provider value="/o/classic-theme/images/lexicon/icons.svg">
    <PageEditor config={config} state={state} />
  </ClayIconSpriteContext.Provider>,
  document.getElementById('layoutContent'),
);
