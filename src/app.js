import 'atlas';
import 'PageEditorStyles';
import 'PageEditorMock';

import 'react-hot-loader';
import { hot } from 'react-hot-loader/root';

import React from 'react';
import ReactDOM from 'react-dom';
import { ClayIconSpriteContext } from '@clayui/icon';
import PageEditorApp from 'PageEditorApp';

let cachedData;

const HotApp = hot(({ pageEditorData }) => (
  <ClayIconSpriteContext.Provider value="/o/classic-theme/images/lexicon/icons.svg">
    <PageEditorApp
      config={pageEditorData.config}
      state={pageEditorData.state}
    />
  </ClayIconSpriteContext.Provider>
));

const mount = pageEditorData => {
  const dp = document.getElementById('dp');
  dp && dp.parentElement.removeChild(dp);

  ReactDOM.render(
    <HotApp pageEditorData={pageEditorData} />,
    document.getElementById('layoutContent'),
  );
};

if (cachedData) {
  mount(cachedData);
} else {
  window.GET_PAGE_EDITOR_DATA().then(pageEditorData => {
    cachedData = pageEditorData;
    mount(pageEditorData);
  });
}
