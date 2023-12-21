export function buildNestedComments(list, key = "_id") {
  let trees = {};
  let roots = {};
  for (const item of list) {
    // Добавление элемента в индекс узлов и создание свойства children
    if (!trees[item[key]]) {
      trees[item[key]] = item;
      trees[item[key]].children = [];
      // Ещё никто не ссылался, поэтому пока считаем корнем
      roots[item[key]] = trees[item[key]];
    } else {
      trees[item[key]] = Object.assign(trees[item[key]], item);
    }

    // Если элемент имеет родителя, то добавляем его в подчиненные родителя
    if (item.parent?.[key]) {
      // Если родителя ещё нет в индексе, то индекс создаётся, ведь _id родителя известен
      if (!trees[item.parent[key]]) {
        trees[item.parent[key]] = { children: [] };
        roots[item.parent[key]] = trees[item.parent[key]];
      }
      // Добавления в подчиненные родителя
      trees[item.parent[key]].children.push(trees[item[key]]);
      // Так как элемент добавлен к родителю, то он уже не является корневым
      if (roots[item[key]]) delete roots[item[key]];
    }
  }

  const tree = Object.values(roots);

  function getNestedComments(tree, level = -1, result = []) {
    tree.forEach((item) => {
      const newItem = { ...item, level };
      result.push({ ...newItem, children: undefined });

      if (item.children && item.children.length > 0) {
        getNestedComments(item.children, level + 1, result);
      }
    });

    return result;
  }

  return getNestedComments(tree).slice(1);
}
