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
  const isSymbol = key.classList.contains('alphanumeric') || ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(key.id) ||
                   event.code === 'Tab' || event.code === 'Enter';

  if (isSymbol) {
    
    let symbol = key.textContent;
    if (event.code === 'Tab') symbol = '    ';
    if (event.code === 'Enter') symbol = '\n';

    if (textarea.selectionStart === textarea.selectionEnd) {
      let index = textarea.selectionStart + symbol.length;
      textarea.value = textarea.value.slice(0, textarea.selectionStart) + symbol + 
                       textarea.value.slice(textarea.selectionStart);
      textarea.setSelectionRange(index, index);
    } else {
      let index = textarea.selectionStart + symbol.length;
      textarea.value = textarea.value.slice(0, textarea.selectionStart) + symbol + 
                                                textarea.value.slice(textarea.selectionEnd);
      textarea.setSelectionRange(index, index);
    }

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

  // backspase 
  if (event.code === 'Backspace') {
    
    if (textarea.selectionStart === textarea.selectionEnd) {
      let index = textarea.selectionStart - 1 < 0 ? 0 : textarea.selectionStart - 1;
      textarea.value = textarea.value.slice(0, textarea.selectionStart - 1) + textarea.value.slice(textarea.selectionStart);
      textarea.setSelectionRange(index, index);
    } else {
      let index = textarea.selectionStart;
      textarea.value = textarea.value.slice(0, textarea.selectionStart) + textarea.value.slice(textarea.selectionEnd);
      textarea.setSelectionRange(index, index);
    }
    
  }
  // del 
  if (event.code === 'Delete') {

    if (textarea.selectionStart === textarea.selectionEnd) {
      let index = textarea.selectionStart;
      textarea.value = textarea.value.slice(0, textarea.selectionStart) + textarea.value.slice(textarea.selectionStart + 1);
      textarea.setSelectionRange(index, index);
    } else {
      let index = textarea.selectionStart;
      textarea.value = textarea.value.slice(0, textarea.selectionStart) + textarea.value.slice(textarea.selectionEnd);
      textarea.setSelectionRange(index, index);
    }
    
  }

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