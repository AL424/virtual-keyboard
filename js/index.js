import { addLayout } from './modules/addLayout.js';
import { keyCodeArr } from './modules/keyCodeArr.js';
import { addKey } from './modules/addKey.js';
import { keydown, keyup } from './modules/eventKey.js';


addLayout();

keyCodeArr.forEach(element => {
  addKey(element.keyCode, element.key, element.type);
});

window.addEventListener('keydown', (event) => {
  event.preventDefault();
  keydown(event);
})

window.addEventListener('keyup', (event) => {
  keyup(event);
})