// добавление разметки сайта

const addLayout = () => {
  const main = document.createElement('main');
  main.className = 'main';

  const title = document.createElement('h1');
  title.className = 'title';
  title.textContent = 'Virtual Keyboard';

  const textarea = document.createElement('textarea');
  textarea.className = 'textarea';
  textarea.placeholder = 'Введите текст...';

  const keyboard = document.createElement('div');
  keyboard.className = 'keyboard';
  keyboard.id = 'keyboard';

  const discription = document.createElement('div');
  discription.className = 'discription';

  const discriptionParagraph = ['Клавиатура создана в ОС Windows', 'Для переключения языка нажмите левые Ctrl + Alt'];
  discriptionParagraph.forEach((text) => {
    const paragraph = document.createElement('p');
    paragraph.className = 'paragraph';
    paragraph.textContent = text;

    discription.append(paragraph);
  });

  main.append(title, textarea, keyboard, discription);
  document.body.append(main);
};

export { addLayout };
