import { addLayout } from './modules/addLayout.js';

import { keyCodeArr } from './modules/keyCodeArr.js';

import { addKey } from './modules/addKey.js';

addLayout();

keyCodeArr.forEach(element => {
  addKey(element.keyCode, element.key);
});