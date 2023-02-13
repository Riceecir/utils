/**
 * 扁平数据转树状结构
 * (会改变原数组)
 * list: 原始数据
 * id: id字段
 * parentId: 上级id字段
 */
export const toTree = <T = any>(
  list: T[] = [],
  id = "id",
  parentId = "parentId"
) => {
  if (!Array.isArray(list)) return [];
  console.time();
  // [{ id: any, ...prop }] => { [id]: { id: any, ...prop } }
  const maps = Object.fromEntries(
    list.map((i) => [(i as any)[id], i])
  );
  const tree: T[] = [];

  list.forEach((i) => {
    const parent = maps[(i as any)[parentId]] as T & {
      children?: T[];
    };
    if (parent) {
      if (!parent.children) parent.children = [];
      parent.children.push(i);
    } else {
      // 无父级，则为最顶层
      tree.push(i);
    }
  });
  console.timeEnd();

  return tree;
};
