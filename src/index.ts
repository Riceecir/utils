export * from './String'
export * from './Function'
export * from './Date'

/**
 * 获取数据类型
 * @param {any} data
 */
export const getType = (data: any): string => Object.prototype.toString.call(data).slice(8, -1).toLowerCase()

/** 对象、数组深度克隆
 * @param {Object | Array} obj: 想要克隆的Object
 */
export const clone = (obj: unknown) => {
  const type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
  if (['object', 'array'].includes(type)) return cloneItem(obj)
  else return obj
}

/* 判断是否为空对象 */
export const isEmptyObject = (obj = {}) => {
  return Object.keys(obj).length === 0
}

const cloneItem = (d: any) => {
  const newObject: any = getType(d) === 'array' ? [] : {}

  for (const i in d) {
    const data = d[i]
    const type = Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
    if (type === 'object') newObject[i] = cloneItem(data)
    else if (type === 'array') newObject[i] = data.slice().map((i: unknown) => clone(i))
    else if (type === 'date') newObject[i] = new Date(data)
    else newObject[i] = data
  }
  return newObject
}