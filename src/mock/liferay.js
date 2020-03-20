import liferayLoader from './liferay-loader';
import liferaySelectEntity from './liferay-select-entity';
import liferaySub from './liferay-sub';
import liferayLanguageGet from './liferay-language-get';

window.Liferay = {
  component: () => {},
  fire: () => {},
  zIndex: {},

  Language: {
    get: liferayLanguageGet,
  },

  Loader: liferayLoader,

  SideNavigation: {
    instance: () => ({
      on: () => ({
        removeListener: () => {},
      }),

      visible: () => false,
    }),
  },

  ThemeDisplay: {
    getBCP47LanguageId: () => 'en-US',
    getPathThemeImages: () => '',
  },

  Util: {
    selectEntity: liferaySelectEntity,
    sub: liferaySub,
  },
};
