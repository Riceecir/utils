"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forLengthSplit = exports.abTostr = exports.abTohex = exports.hexTostr = exports.strToHex = void 0;
/* 字符串转16进制unicode */
const strToHex = (str) => {
    if (!str || str.toString() === '')
        return [''];
    return str.split('').map(s => s.charCodeAt(0).toString(16));
};
exports.strToHex = strToHex;
/* 十六进制(unicode)转字符串 */
const hexTostr = (hex) => {
    let arr = hex.split("");
    let out = "";
    for (let i = 0; i < arr.length / 2; i++) {
        let charValue = String.fromCharCode(parseInt(arr[i * 2] + arr[i * 2 + 1], 16));
        out += charValue;
    }
    return out;
};
exports.hexTostr = hexTostr;
// ArrayBuffer转16进度字符串示例
const abTohex = (buffer) => {
    var hexArr = Array.prototype.map.call(new Uint8Array(buffer), function (bit) {
        return ('00' + bit.toString(16)).slice(-2);
    });
    return hexArr.join('');
};
exports.abTohex = abTohex;
/* ArrayBuffer转字符串 */
const abTostr = (buffer) => {
    return String.fromCharCode.apply(null, new Uint16Array(buffer));
};
exports.abTostr = abTostr;
/* 字符串按长度分割 */
const forLengthSplit = (str = '', len = 1) => {
    const reg = new RegExp(`.{1,${Math.max(1, len)}}`, 'g');
    return (str.match(reg) || []);
};
exports.forLengthSplit = forLengthSplit;
