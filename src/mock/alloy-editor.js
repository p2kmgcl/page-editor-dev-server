window.CKEDITOR = {
  dom: {
    node: () => {},
  },
};

const editable = (target, opts) => {
  target.setAttribute('contenteditable', 'true');

  let onChange;
  let onBlur;

  const nativeEditor = {
    getData: () => {
      return target.innerHTML;
    },

    getSelection: () => ({
      selectRanges: () => {},

      getRanges: () => [
        {
          setStart: () => {},
          setEnd: () => {},
        },
      ],
    }),

    on: (eventName, handler) => {
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
    },

    execCommand: () => {},

    focus: () => {
      target.focus();
    },
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
