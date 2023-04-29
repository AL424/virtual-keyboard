// создание и добавление кнопок

const addKey = (code, key, type) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.id = code;
  button.className = `key ${type}`;
  button.textContent = key;

  document.getElementById('keyboard').append(button);

  return button;
}

export {addKey};