export const DYNAMIC_MODULES = {
  'layout-content-page-editor-web@2.0.23/page_editor/plugins/comments/index': import(
    'page_editor/plugins/comments/index'
  ),
  'layout-content-page-editor-web@2.0.23/page_editor/plugins/page-structure/index': import(
    'page_editor/plugins/page-structure/index'
  ),
  'layout-content-page-editor-web@2.0.23/page_editor/plugins/contents/index': import(
    'page_editor/plugins/contents/index'
  ),
  'layout-content-page-editor-web@2.0.23/page_editor/plugins/widgets/index': import(
    'page_editor/plugins/widgets/index'
  ),
  'layout-content-page-editor-web@2.0.23/page_editor/plugins/experience/index': import(
    'page_editor/plugins/experience/index'
  ),
  'layout-content-page-editor-web@2.0.23/page_editor/plugins/fragments/index': import(
    'page_editor/plugins/fragments/index'
  ),
};

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

  Loader: {
    require: (deps, cb, errorCb) => {
      Promise.all(deps.map(dep => DYNAMIC_MODULES[dep]))
        .then(modules => {
          if (modules.some(module => !module)) {
            throw new Error('Some deps not found\n' + deps.join('\n'));
          }

          cb(...modules);
        })
        .catch(errorCb);
    },
  },

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
