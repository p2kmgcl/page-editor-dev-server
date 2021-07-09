const DYNAMIC_MODULES = {
  '/page_editor/plugins/browser/index': () =>
    import('page_editor/plugins/browser'),
  '/page_editor/plugins/comments/index': () =>
    import('page_editor/plugins/comments'),
  '/page_editor/plugins/page-structure/index': () =>
    import('page_editor/plugins/page-structure'),
  '/page_editor/plugins/contents/index': () =>
    import('page_editor/plugins/contents'),
  '/page_editor/plugins/experience/index': () =>
    import('page_editor/plugins/experience'),
  '/page_editor/plugins/fragments-widgets/index': () =>
    import('page_editor/plugins/fragments-widgets'),
  '/page_editor/plugins/page-design-options/index': () =>
    import('page_editor/plugins/page-design-options'),
};

window.bestFunctionEventer = requestAnimationFrame;

window.PREPARE_LIFERAY = () =>
  fetch('/web/guest/home')
    .then((response) => response.text())
    .then((content) => {
      const contentElement = document.createElement('div');
      contentElement.innerHTML = content;

      return [...contentElement.querySelectorAll('script')]
        .map((script) =>
          script.src
            ? fetch(script.src).then((response) => response.text())
            : Promise.resolve(script.innerHTML),
        )
        .map(
          (scriptContentPromise) => () =>
            scriptContentPromise.then(
              (scriptContent) =>
                new Promise((resolve) => {
                  const scriptClone = document.createElement('script');

                  scriptClone.appendChild(
                    document.createTextNode(`
                  try {
                    ;;${scriptContent};;
                  } catch (error) {}
                `),
                  );

                  window.bestFunctionEventer(() => {
                    resolve();
                  });

                  document.body.appendChild(scriptClone);
                }),
            ),
        )
        .reduce((p, fn) => p.then(() => fn()), Promise.resolve())
        .then(() => {
          const loaderRequire = window.Liferay.Loader.require;

          window.Liferay.Loader.require = (deps, cb, errorCb) => {
            if (
              Array.isArray(deps) &&
              deps.some((dep) =>
                dep.startsWith('layout-content-page-editor-web'),
              )
            ) {
              Promise.all(
                deps
                  .map((dep) =>
                    dep.replace(
                      /layout-content-page-editor-web@[0-9]+\.[0-9]+\.[0-9]+/g,
                      '',
                    ),
                  )
                  .map((dep) => {
                    if (typeof DYNAMIC_MODULES[dep] !== 'function') {
                      throw new Error(
                        `"${dep}" is not defined in mocks/liferay.js/DYNAMIC_MODULES`,
                      );
                    }

                    return DYNAMIC_MODULES[dep]();
                  }),
              )
                .then((modules) => {
                  if (modules.some((module) => !module)) {
                    throw new Error('Some deps not found\n' + deps.join('\n'));
                  }

                  cb(...modules);
                })
                .catch(errorCb);
            } else {
              loaderRequire.call(window.Liferay.Loader, deps, cb, errorCb);
            }
          };

          window.Liferay.Language.get = (str) => {
            const words = str.split('-');
            let varCount = 0;
            words[0] = words[0].charAt(0).toUpperCase() + words[0].substr(1);
            return words
              .map((word) => (word === 'x' ? `{${varCount++}}` : word))
              .join(' ');
          };
        });
    });
