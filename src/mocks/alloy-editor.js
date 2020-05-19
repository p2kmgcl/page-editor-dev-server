window.CKEDITOR = {
  dom: {
    node: () => {},
  },
};

const editable = (target, opts) => {
  target.setAttribute('contenteditable', 'true');

  let onChange;
  let onBlur;

  const on = (eventName, handler) => {
    if (eventName === 'change') {
      onChange = handler;
    } else if (eventName === 'blur') {
      onBlur = handler;
    } else if (eventName === 'instanceReady') {
      handler();
    }

    return {
      removeListener: () => {},
    };
  };

  const nativeEditor = {
    getSelection: () => ({
      selectRanges: () => {},

      getRanges: () => [
        {
          setStart: () => {},
          setEnd: () => {},
        },
      ],
    }),

    setData: data => {
      target.innerHTML = data;
    },

    on,
    once: on,
    execCommand: () => {},
    focus: () => target.focus(),
    getData: () => target.innerHTML,
  };

  const onKeyUp = () => {
    onChange && onChange();
  };

  const onNativeBlur = () => {
    onBlur && onBlur();
  };

  target.addEventListener('blur', onNativeBlur);
  target.addEventListener('keyup', onKeyUp);

  return {
    _mainUI: { state: { hidden: true } },

    destroy: () => {
      target.removeAttribute('contenteditable');
      target.removeEventListener('keyup', onKeyUp);
      target.removeEventListener('blur', onNativeBlur);
    },

    get: () => nativeEditor,
  };
};

window.AlloyEditor = {
  editable,
};
