const toolbar = document.querySelector('.control-menu');

const id = setInterval(() => {
  if (toolbar)
    toolbar.style.paddingRight = document.querySelector(
      '.page-editor__sidebar__content--open',
    )
      ? '320px'
      : '40px';
}, 1000);

if (module.hot) {
  module.hot.dispose(() => {
    clearInterval(id);
  });
}
