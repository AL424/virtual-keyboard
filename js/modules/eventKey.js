import { changeLang } from './changeLang.js';
import { changeKey } from './changeKey.js';

// функции событий нажатия и отпуска клавиш

let isCapsActive = false;
let isShiftActive = false;

const keydown = (code, keyCodeArr) => {
  if (!document.getElementById(code)) return;

  const key = document.getElementById(code);
  const textarea = document.querySelector('.textarea');
  textarea.focus(); // textarea становится в фокусе
  key.classList.add('key_active'); // подсвечивает заданную кнопку

  // работа с символами
  const isSymbol = key.classList.contains('alphanumeric') || ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(key.id) ||
                   code === 'Tab' || code === 'Enter';

  if (isSymbol) {
    
    let symbol = key.textContent;
    if (code === 'Tab') symbol = '    ';
    if (code === 'Enter') symbol = '\n';

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
  const isChangeLang = code === 'ControlLeft' && document.getElementById('AltLeft').classList.contains('key_active') ||
                       code === 'AltLeft' && document.getElementById('ControlLeft').classList.contains('key_active');
  if (isChangeLang) changeLang(keyCodeArr, isCapsActive);

  // caps
  if (code === 'CapsLock') {
    if (!isCapsActive) {
      isCapsActive = true;
      changeKey(code, isCapsActive, 0, keyCodeArr);
    } else if (isCapsActive) {
      isCapsActive = false;
      changeKey(code, isCapsActive, 0, keyCodeArr);
    }
  }
  // shift
  if (code === 'ShiftLeft' || code === 'ShiftRight') {
    isShiftActive = true;
    changeKey(code, isCapsActive, localStorage.lang, keyCodeArr, isShiftActive);
  }  

  // backspase 
  if (code === 'Backspace') {
    
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
  if (code === 'Delete') {

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

const keyup = (code, keyCodeArr) => {
  if (!document.getElementById(code)) return;

  const key = document.getElementById(code);

  if (code === 'ShiftLeft' || code === 'ShiftRight') {
    isShiftActive = false;
    changeKey(code, isCapsActive, localStorage.lang, keyCodeArr, isShiftActive);
  }  
 
  if (!(code === 'CapsLock') || code === 'CapsLock' && !isCapsActive) key.classList.remove('key_active');
}

export {keydown, keyup};