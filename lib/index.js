"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmptyObject = exports.clone = exports.getType = void 0;
__exportStar(require("./String"), exports);
__exportStar(require("./Function"), exports);
/**
 * 获取数据类型
 * @param {any} data
 */
const getType = (data) => Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
exports.getType = getType;
/** 对象、数组深度克隆
 * @param {Object | Array} obj: 想要克隆的Object
 */
const clone = (obj) => {
    const type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    if (['object', 'array'].includes(type))
        return cloneItem(obj);
    else
        return obj;
};
exports.clone = clone;
/* 判断是否为空对象 */
const isEmptyObject = (obj = {}) => {
    return Object.keys(obj).length === 0;
};
exports.isEmptyObject = isEmptyObject;
const cloneItem = (d) => {
    const newObject = (0, exports.getType)(d) === 'array' ? [] : {};
    for (const i in d) {
        const data = d[i];
        const type = Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
        if (type === 'object')
            newObject[i] = cloneItem(data);
        else if (type === 'array')
            newObject[i] = data.slice().map((i) => (0, exports.clone)(i));
        else if (type === 'date')
            newObject[i] = new Date(data);
        else
            newObject[i] = data;
    }
    return newObject;
};
