window.GET_PAGE_EDITOR_DATA = () =>
  fetch('/get-page-editor-display-context')
    .then(response => response.json())
    .then(json => {
      const content = JSON.parse(json.displayContext);

      Object.entries(content.config).forEach(([key, value]) => {
        if (
          typeof value === 'string' &&
          value.indexOf(process.env.LIFERAY_HOST) !== -1
        ) {
          content.config[key] = value.replace(
            process.env.LIFERAY_HOST,
            'localhost:8090',
          );
        }
      });

      return content;
    });
