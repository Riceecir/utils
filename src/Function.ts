
/** 函数防抖
 * @param {function} func: 回调函数
 * @param {number} delay: 延迟(毫秒)
 */
export const debounce = function (func: Function, delay = 300,) {
  let timeout: number;
  
  return function (...param: any[]) {
    const that = this
    if (timeout) {
      clearTimeout(timeout);
    }
    
    if (typeof func === "function") timeout = setTimeout(func.bind(that, ...param), delay)
  };
};

/** 函数节流
 *  @param {function} func: 回调函数
 *  @param {number} delay: 延迟(毫秒)
 *  @param {boolean} leading: 调回函数是否在节流前
 */
export const throttle = function (func: Function, delay = 300, leading = true) {
  let allow = true

  return function (...param: any[]) {
    const that = this

    if (!allow) return

    setTimeout(() => {
      allow = true
    }, delay)

    if (leading) {
      const cb = func.bind(that, ...param)
      cb()

      allow = false
    } else {
      allow = false

      setTimeout(func.bind(that, ...param), delay)
    }
  }
}