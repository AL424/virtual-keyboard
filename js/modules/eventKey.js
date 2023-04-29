import { changeLang } from './changeLang.js';

// функции событий нажатия и отпуска клавиш

const keydown = (event, keyCodeArr) => {
  const key = document.getElementById(event.code);
  const textarea = document.querySelector('.textarea');
  textarea.focus(); // textarea становится в фокусе
  key.classList.add('key_active'); // подсвечивает заданную кнопку

  /* if (key.classList.contains('alphanumeric')) {
    textarea.value += key.textContent;
  } */ 

  const isChangeLang = event.code === 'ControlLeft' && document.getElementById('AltLeft').classList.contains('key_active') ||
                       event.code === 'AltLeft' && document.getElementById('ControlLeft').classList.contains('key_active');
  if (isChangeLang) changeLang(keyCodeArr);
}

const keyup = (event) => {
  const key = document.getElementById(event.code);
  const textarea = document.querySelector('.textarea');
  const keyCode = event.code;
  
  key.classList.remove('key_active');
}

export {keydown, keyup};