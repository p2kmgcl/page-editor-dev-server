import 'atlas';
import 'PageEditorStyles';
import 'PageEditorMock';

import React from 'react';
import ReactDOM from 'react-dom';
import { ClayIconSpriteContext } from '@clayui/icon';
import PageEditorApp from 'PageEditorApp';

window.GET_PAGE_EDITOR_DATA().then(pageEditorData => {
  const dp = document.getElementById('dp');
  dp.parentElement.removeChild(dp);

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
