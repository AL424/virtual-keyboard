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
    if (element.type === 'service') addKey(element.keyCode, element.key, element.type);
    else addKey(element.keyCode, element.keyRu, element.type);
  })
}

window.addEventListener('keydown', (event) => {
  event.preventDefault();
  keydown(event, keyCodeArr);
})

window.addEventListener('keyup', (event) => {
  keyup(event);
})