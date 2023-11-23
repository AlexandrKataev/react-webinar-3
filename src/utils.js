const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

/**
 * Создание сообщения о количестве выделений элемента
 * @param {Number} count Количество выделений элемента
 * @returns {String}
 */
export function getSelectionCountMessage(count) {
	const str = count.toString()
  if (str.match(/[234]$/) && +str.slice(-2)[0] !== 1) {
    return `Выделяли ${count} раза`;
  }
  return `Выделяли ${count} раз`;
};
