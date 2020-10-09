// 克隆方法
const clone = (any) => {
  const newObject = Array.isArray(any) ? [] : {}
  for (const i in any) {
    const data = any[i]
    const type = Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
    switch (type) {
      case 'object':
        newObject[i] = clone(data)
        break
      case 'array':
        newObject[i] = data.map(item => clone(item))
        // newObject[i] = data.slice()
        break
      case 'date':
        newObject[i] = new Date(data)
        break
      default: newObject[i] = data
    }
  }
  return newObject
}

// 对象深度克隆
const cloneObject = function (obj) {
  if (Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() === 'object') {
    return clone(obj)
  } else {
    return obj
  }
}

// 数组深度克隆
const cloneArray = (arr = []) => {
  return arr.map(item => clone(item))
}

/* 判断是否为空对象 */
const isEmptyObject = obj => {
  return Object.keys(obj).length === 0
}

/**
 * 获取数据类型
 * 如果传入null 则返回 'null'
 * typeOf(null) 会返回 'object'
 */
const getDataType = data => {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
}

/* 判断对象类型是否为 object */
const isObject = obj => {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() === 'object'
}

/* 获取数字长度 */
const getNumberLength = (number) => {
  return number.toString().split('.')[0].length * 1
}

/**
 * 对象转路由参数
 * {key: '1', key2: '2'} => key=1&key2=2
 */
const setRoutePathParams = (object) => {
  // const arr = []
  // for (let i in object) {
  //   arr.push(`${i}=${object[i]}`)
  // }
  // return arr.join('&')
  if (isObject(object)) {
    let path = ''
    for (const i in object) {
      if (object[i] != null) {
        path += `${i}=${object[i]}&`
      }
    }
    return path
  } else {
    return ''
  }
}

/* 函数防抖 */
class Debounce {
  constructor () {
    this._function = false

    return this.start.bind(this)
  }

  start (callback, time = 300) {
    clearTimeout(this._function)
    this._function = setTimeout(callback, time)

    /* 返回终止的方法 */
    return {
      stop: () => {
        clearTimeout(this._function)
      }
    }
  }
}

/* 函数防抖 */
const debounce = new Debounce()

/* 函数节流 */
class Throttle {
  constructor () {
    this.canRun = true

    return this.start.bind(this)
  }

  start (callback, time = 300) {
    if (this.canRun) {
      this.canRun = false
      setTimeout(() => {
        this.canRun = true
        callback()
      }, time)
    }
  }
}

/* 函数节流 */
const throttle = new Throttle()

/* 对象'.'表示法字符串查询数据 */
const getValueOfKey = (data, key) => {
  /* 用于深度获取对象内容 */
  const newKey = key.split('.')
  let newData = data
  for (const i in newKey) {
    newData = newData[newKey[i]]
  }
  return newData
}

module.exports = {
  cloneObject,
  cloneArray,
  isEmptyObject,
  getDataType,
  isObject,
  getNumberLength,
  setRoutePathParams,
  debounce,
  Debounce,
  throttle,
  Throttle,
  getValueOfKey
}
