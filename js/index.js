import { addLayout } from './modules/addLayout.js';
import { keyCodeArr } from './modules/keyCodeArr.js';
import { addKey } from './modules/addKey.js';
import { keydown, keyup } from './modules/eventKey.js';

// добавление разметки
addLayout();

// добавление языка по умолчанию
if (!localStorage.lang) localStorage.lang = 'en';

// созданиея клавиатуры в зависимости от языка
if (localStorage.lang === 'en') keyCodeArr.forEach(element => addKey(element.keyCode, element.key, element.type));
if (localStorage.lang === 'ru') {
  keyCodeArr.forEach(element => {
    let {keyCode, key, keyRu, type} = element;

    if (type === 'service') addKey(keyCode, key, type);
    else addKey(keyCode, keyRu, type);
  })
}

window.addEventListener('keydown', (event) => {
  event.preventDefault();
  keydown(event.code, keyCodeArr);
})

window.addEventListener('keyup', (event) => {
  keyup(event.code, keyCodeArr);
})

window.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('key') && event.button === 0) {
    event.preventDefault();
    keydown(event.target.id, keyCodeArr);
  }
})

window.addEventListener('mouseup', (event) => {
  if (event.target.classList.contains('key') && event.button === 0) {
    keyup(event.target.id, keyCodeArr);
  }
})