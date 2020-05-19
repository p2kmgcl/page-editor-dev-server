import 'atlas';
import 'PageEditorStyles';
import 'PageEditorMocks';
import 'PageEditorTools';

import React from 'react';
import ReactDOM from 'react-dom';
import { ClayIconSpriteContext } from '@clayui/icon';
import PageEditorApp from 'PageEditorApp';

let cachedData;

const getApp = () =>
  new Promise((resolve) => {
    const App = ({ pageEditorData }) => (
      <ClayIconSpriteContext.Provider value="/o/classic-theme/images/lexicon/icons.svg">
        <PageEditorApp
          config={pageEditorData.config}
          state={pageEditorData.state}
        />
      </ClayIconSpriteContext.Provider>
    );

    resolve(App);
  });

const mount = (pageEditorData) => {
  const dp = document.getElementById('dp');
  dp && dp.parentElement.removeChild(dp);

  getApp().then((App) => {
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
