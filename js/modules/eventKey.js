import { changeLang } from './changeLang.js';
import { changeKey } from './changeKey.js';

// функции событий нажатия и отпуска клавиш

let isCapsActive = false;
let isShiftActive = false;

const keydown = (event, keyCodeArr) => {
  if (!document.getElementById(event.code)) return;

  const key = document.getElementById(event.code);
  const textarea = document.querySelector('.textarea');
  textarea.focus(); // textarea становится в фокусе
  key.classList.add('key_active'); // подсвечивает заданную кнопку

  // работа с символами
  if (key.classList.contains('alphanumeric')) {
    textarea.value += key.textContent;
  }

  // работа с сервисными клавишами
  // переключение языка
  const isChangeLang = event.code === 'ControlLeft' && document.getElementById('AltLeft').classList.contains('key_active') ||
                       event.code === 'AltLeft' && document.getElementById('ControlLeft').classList.contains('key_active');
  if (isChangeLang) changeLang(keyCodeArr, isCapsActive);

  // caps
  if (event.code === 'CapsLock') {
    if (!isCapsActive) {
      isCapsActive = true;
      changeKey(event.code, isCapsActive, 0, keyCodeArr);
    } else if (isCapsActive) {
      isCapsActive = false;
      changeKey(event.code, isCapsActive, 0, keyCodeArr);
    }
  }
  // shift
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    isShiftActive = true;
    changeKey(event.code, isCapsActive, localStorage.lang, keyCodeArr, isShiftActive);
  }  
  // tab
  if (event.code === 'Tab') textarea.value += '    ';
  // enter 
  if (event.code === 'Enter') textarea.value += '\n';

}

const keyup = (event, keyCodeArr) => {
  if (!document.getElementById(event.code)) return;

  const key = document.getElementById(event.code);
  const textarea = document.querySelector('.textarea');
  const keyCode = event.code;

  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    isShiftActive = false;
    changeKey(event.code, isCapsActive, localStorage.lang, keyCodeArr, isShiftActive);
  }  
 
  if (!(event.code === 'CapsLock') || event.code === 'CapsLock' && !isCapsActive) key.classList.remove('key_active');
}

export {keydown, keyup};