"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = exports.debounce = void 0;
/** 函数防抖
 * @param {function} func: 回调函数
 * @param {number} delay: 延迟(毫秒)
 */
const debounce = function (func, delay = 300) {
    let timeout;
    return function (...param) {
        const that = this;
        if (timeout) {
            clearTimeout(timeout);
        }
        if (typeof func === "function")
            timeout = setTimeout(func.bind(that, ...param), delay);
    };
};
exports.debounce = debounce;
/** 函数节流
 *  @param {function} func: 回调函数
 *  @param {number} delay: 延迟(毫秒)
 *  @param {boolean} leading: 调回函数是否在节流前
 */
const throttle = function (func, delay = 300, leading = true) {
    let allow = true;
    return function (...param) {
        const that = this;
        if (!allow)
            return;
        setTimeout(() => {
            allow = true;
        }, delay);
        if (leading) {
            const cb = func.bind(that, ...param);
            cb();
            allow = false;
        }
        else {
            allow = false;
            setTimeout(func.bind(that, ...param), delay);
        }
    };
};
exports.throttle = throttle;
