import 'atlas';
import 'PageEditorStyles';
import 'PageEditorMock';

import React from 'react';
import ReactDOM from 'react-dom';
import { ClayIconSpriteContext } from '@clayui/icon';
import PageEditorApp from 'PageEditorApp';

const icons = ['🕛', '🕒', '🕕', '🕘'];
const title = document.querySelector('title');

let cachedData;
let iconIndex = -1;

const intervalId = setInterval(() => {
  iconIndex = (iconIndex + 1) % icons.length;
  title.innerText = `${icons[iconIndex]} Page Editor`;
}, 100);

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

    clearInterval(intervalId);
    title.innerText = 'Page Editor';
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
