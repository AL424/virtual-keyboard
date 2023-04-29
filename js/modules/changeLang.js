// функция смены языка

const changeLang = (keyCodeArr) => {
  if (localStorage.lang === 'en') localStorage.lang = 'ru';
  else if (localStorage.lang === 'ru') localStorage.lang = 'en';

  changeLangKey(keyCodeArr, localStorage.lang);
}

const changeLangKey = (keyCodeArr, lang) => {
  keyCodeArr.forEach(element => {
    if (element.type === 'alphanumeric') {
      const key = document.getElementById(element.keyCode);
      key.textContent = lang === 'en' ? element.key : element.keyRu;
    }
  })
}

export {changeLang, changeLangKey};