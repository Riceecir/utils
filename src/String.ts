/* 字符串转16进制unicode */
export const strToHex = (str: string): string[] => {
  if (!str || str.toString() === '') return ['']
  
  return str.split('').map(s => s.charCodeAt(0).toString(16))
}

/* 十六进制(unicode)转字符串 */
export const hexTostr = (hex: string) => {
  let arr = hex.split("")
  let out = ""
  for (let i = 0; i < arr.length / 2; i++) {
    let charValue = String.fromCharCode(parseInt(arr[i * 2] + arr[i * 2 + 1], 16));
    out += charValue
  }
  return out
};

// ArrayBuffer转16进度字符串示例
export const abTohex = (buffer: ArrayBuffer) => {
  var hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('');
}

/* ArrayBuffer转字符串 */
export const abTostr = (buffer: ArrayBuffer) => {
  return String.fromCharCode.apply(null, new Uint16Array(buffer) as any);
}

/* 字符串按长度分割 */
export const forLengthSplit = (str = '', len = 1): string[] => {
  const reg = new RegExp(`.{1,${Math.max(1, len)}}`, 'g')

  return (str.match(reg) || [])
}