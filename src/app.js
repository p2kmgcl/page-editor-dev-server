import 'atlas';
import 'PageEditorStyles';
import 'PageEditorMocks';

import React from 'react';
import ReactDOM from 'react-dom';
import { ClayIconSpriteContext } from '@clayui/icon';

const getApp = () => {
  return import('PageEditorApp').then(({ default: PageEditorApp }) => {
    return ({ pageEditorData }) => (
      <ClayIconSpriteContext.Provider value="/o/classic-theme/images/lexicon/icons.svg">
        <PageEditorApp
          config={pageEditorData.config}
          state={pageEditorData.state}
        />
      </ClayIconSpriteContext.Provider>
    );
  });
};

let cachedData;

const mount = (pageEditorData) => {
  window
    .PREPARE_LIFERAY()
    .then(() => getApp())
    .then((App) => {
      const dp = document.getElementById('dp');
      dp && dp.parentElement.removeChild(dp);

      ReactDOM.render(
        <App pageEditorData={pageEditorData} />,
        document.getElementById('layoutContent'),
      );
    });
};

if (cachedData) {
  mount(cachedData);
} else {
  window.GET_PAGE_EDITOR_DATA().then((pageEditorData) => {
    cachedData = pageEditorData;
    mount(pageEditorData);
  });
}
