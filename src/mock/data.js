window.PAGE_EDITOR_DATA = process.env.PAGE_EDITOR_DATA;

Object.entries(window.PAGE_EDITOR_DATA.config).forEach(([key, value]) => {
  if (typeof value === 'string' && value.indexOf('localhost:8080') !== -1) {
    window.PAGE_EDITOR_DATA.config[key] = value.replace(
      'localhost:8080',
      'localhost:8090',
    );
  }
});
