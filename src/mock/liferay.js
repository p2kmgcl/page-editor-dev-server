import liferayLoader from './liferay-loader';

window.Liferay = {
  component: () => {},
  fire: () => {},
  zIndex: {},

  Language: {
    get: str => {
      const words = str.split('-');
      words[0] = words[0].charAt(0).toUpperCase() + words[0].substr(1);
      return words.join(' ');
    },
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
};
