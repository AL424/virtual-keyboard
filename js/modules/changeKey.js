export default (keyCode, isCapsActive, lang, keyCodeArr, isShiftActive) => {
  // Caps Lock functional

  if (keyCode === 'CapsLock') {
    if (isCapsActive) {
      keyCodeArr.forEach((element) => {
        if (element.type === 'alphanumeric') {
          const key = document.getElementById(element.keyCode);
          key.textContent = key.textContent.toUpperCase();
        }
      });
    }

    if (!isCapsActive) {
      keyCodeArr.forEach((element) => {
        if (element.type === 'alphanumeric') {
          const key = document.getElementById(element.keyCode);
          key.textContent = key.textContent.toLowerCase();
        }
      });
    }
  }

  // Shift functional
  if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
    if (isShiftActive) {
      if (lang === 'en') {
        keyCodeArr.forEach((element) => {
          if (element.type === 'alphanumeric') {
            const key = document.getElementById(element.keyCode);
            key.textContent = isCapsActive ? element.keyShift.toLowerCase() : element.keyShift;
          }
        });
      }

      if (lang === 'ru') {
        keyCodeArr.forEach((element) => {
          if (element.type === 'alphanumeric') {
            const key = document.getElementById(element.keyCode);
            key.textContent = isCapsActive ? element.keyRuShift.toLowerCase() : element.keyRuShift;
          }
        });
      }
    }

    if (!isShiftActive) {
      if (lang === 'en') {
        keyCodeArr.forEach((element) => {
          if (element.type === 'alphanumeric') {
            const key = document.getElementById(element.keyCode);
            key.textContent = isCapsActive ? element.key.toUpperCase() : element.key;
          }
        });
      }

      if (lang === 'ru') {
        keyCodeArr.forEach((element) => {
          if (element.type === 'alphanumeric') {
            const key = document.getElementById(element.keyCode);
            key.textContent = isCapsActive ? element.keyRu.toUpperCase() : element.keyRu;
          }
        });
      }
    }
  }
};
