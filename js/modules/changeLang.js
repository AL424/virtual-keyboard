// функция смены языка

const changeLang = (keyCodeArr, isCapsActive) => {
  if (localStorage.lang === 'en') localStorage.lang = 'ru';
  else if (localStorage.lang === 'ru') localStorage.lang = 'en';

  changeLangKey(keyCodeArr, localStorage.lang, isCapsActive);
}

const changeLangKey = (keyCodeArr, lang, isCapsActive) => {
  keyCodeArr.forEach(element => {
    if (element.type === 'alphanumeric') {
      const key = document.getElementById(element.keyCode);
      key.textContent = lang === 'en' ? element.key : element.keyRu;
      if (isCapsActive) key.textContent = key.textContent.toUpperCase();
    }
  })
}

export {changeLang, changeLangKey};