/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = "ru-RU") {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || "";
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = "ru-RU", options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Форматирование вложенного списка с префиксами
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function getNested(array) {
  function buildTree(data) {
    const tree = [];
    const map = {};

    data.forEach((item) => {
      map[item._id] = item;
      item.children = [];
    });

    data.forEach((item) => {
      if (item.parent) {
        map[item.parent._id].children.push(item);
      } else {
        tree.push(item);
      }
    });

    return tree;
  }

  const tree = buildTree(array);

  function getNestedSelectOptions(tree, level = 0, result = []) {
    tree.forEach((item) => {
      const prefix = "-".repeat(level);
      const newItem = { ...item, title: `${prefix}${item.title}` };
      result.push({ ...newItem, children: undefined });

      if (item.children && item.children.length > 0) {
        getNestedSelectOptions(item.children, level + 1, result);
      }
    });

    return result;
  }

  return getNestedSelectOptions(tree);
}
