export const changeKey = (keyCode, isCapsActive, isChangeLang, keyCodeArr) => {
  if (keyCode === 'CapsLock') {
    
    if (isCapsActive) {
      keyCodeArr.forEach(element => {
        if (element.type === 'alphanumeric') {
          const key = document.getElementById(element.keyCode);
          key.textContent = key.textContent.toUpperCase();
        }
      })
    }

    if (!isCapsActive) {
      keyCodeArr.forEach(element => {
        if (element.type === 'alphanumeric') {
          const key = document.getElementById(element.keyCode);
          key.textContent = key.textContent.toLowerCase();
        }
      })
    }

  }
}