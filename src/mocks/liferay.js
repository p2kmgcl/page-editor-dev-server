const DYNAMIC_MODULES = {
  '/page_editor/plugins/comments/index': import('page_editor/plugins/comments'),
  '/page_editor/plugins/page-structure/index': import(
    'page_editor/plugins/page-structure'
  ),
  '/page_editor/plugins/contents/index': import('page_editor/plugins/contents'),
  '/page_editor/plugins/experience/index': import(
    'page_editor/plugins/experience'
  ),
  '/page_editor/plugins/fragments-widgets/index': import(
    'page_editor/plugins/fragments-widgets'
    ),
  '/page_editor/plugins/page-design-options/index': import(
    'page_editor/plugins/page-design-options'
    ),
};

function liferayLanguageGet(str) {
  const words = str.split('-');
  let varCount = 0;
  words[0] = words[0].charAt(0).toUpperCase() + words[0].substr(1);
  return words
    .map((word) => (word === 'x' ? `{${varCount++}}` : word))
    .join(' ');
}

const liferayLoader = {
  require: (deps, cb, errorCb) => {
    Promise.all(
      deps
        .map((dep) =>
          dep.replace(
            /layout-content-page-editor-web@[0-9]+\.[0-9]+\.[0-9]+/g,
            '',
          ),
        )
        .map((dep) => DYNAMIC_MODULES[dep]),
    )
      .then((modules) => {
        if (modules.some((module) => !module)) {
          throw new Error('Some deps not found\n' + deps.join('\n'));
        }

        cb(...modules);
      })
      .catch(errorCb);
  },
};

function liferaySelectEntity(opts, onSelect) {
  const uri = opts.uri;
  let openedWindow;

  Liferay.Util.getWindow = () => ({
    hide: () => openedWindow.close(),
  });

  Liferay.fire = (eventName, event) => {
    openedWindow.close();

    try {
      onSelect(event);
    } catch (error) {
      console.log(error);
    }

    try {
      opts.dialog.on.visibleChange({ newVal: null });
    } catch (error) {
      console.log(error);
    }
  };

  openedWindow = window.open(uri);
}

function liferaySub(langKey, args) {
  const SPLIT_REGEX = /({\d+})/g;

  const keyArray = langKey.split(SPLIT_REGEX).filter((val) => val.length !== 0);

  if (!Array.isArray(args)) {
    args = [args];
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    const indexKey = `{${i}}`;

    let argIndex = keyArray.indexOf(indexKey);

    while (argIndex >= 0) {
      keyArray.splice(argIndex, 1, arg);

      argIndex = keyArray.indexOf(indexKey);
    }
  }

  return keyArray.join('');
}

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
    getLanguageId: () => 'en-US',
    getBCP47LanguageId: () => 'en-US',
    getPathThemeImages: () => '',
    getUserId: () => '20127',
  },

  Util: {
    selectEntity: liferaySelectEntity,
    sub: liferaySub,
  },
};

window.themeDisplay = Liferay.ThemeDisplay;
