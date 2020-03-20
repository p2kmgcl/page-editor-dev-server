const DYNAMIC_MODULES = {
  '/page_editor/plugins/comments/index': import(
    'page_editor/plugins/comments/index'
  ),
  '/page_editor/plugins/page-structure/index': import(
    'page_editor/plugins/page-structure/index'
  ),
  '/page_editor/plugins/contents/index': import(
    'page_editor/plugins/contents/index'
  ),
  '/page_editor/plugins/widgets/index': import(
    'page_editor/plugins/widgets/index'
  ),
  '/page_editor/plugins/experience/index': import(
    'page_editor/plugins/experience/index'
  ),
  '/page_editor/plugins/fragments/index': import(
    'page_editor/plugins/fragments/index'
  ),
};

export default {
  require: (deps, cb, errorCb) => {
    Promise.all(
      deps
        .map(dep =>
          dep.replace(
            /layout-content-page-editor-web@[0-9]+\.[0-9]+\.[0-9]+/g,
            '',
          ),
        )
        .map(dep => DYNAMIC_MODULES[dep]),
    )
      .then(modules => {
        if (modules.some(module => !module)) {
          throw new Error('Some deps not found\n' + deps.join('\n'));
        }

        cb(...modules);
      })
      .catch(errorCb);
  },
};
