export default function(opts, onSelect) {
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
