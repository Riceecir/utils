const { getNumberLength, isObject } = require('./util');

/* 根据金额长度判断单位 */
const getMoneyUnit = number => {
  let [length, unit] = [getNumberLength(number), null];
  let unitList = [
    {
      unit: '元',
      needLength: 1
    },
    {
      unit: '千',
      needLength: 4
    },
    {
      unit: '万',
      needLength: 5
    },
  ];
  for (let item of unitList){
    if (length >= item.needLength) {
      unit = item;
    }
  }
  return unit;
};

/**
 * 商家类型版本，顺便兼容2.0版本号, 例如: 33 => 30, 43 => 40
 * 20, 30等作为基础版本号， 23, 33等作为扩展版本号
 */
const compatibleVersionUid = code => {
  /* 测试版本号 */
  let splitCode = code + ''.split('');
  if (splitCode.length >= 2) {
    /* 取第一位数 * 10 */
    let newCode = splitCode[0] * 10;
    return newCode;
  } else {
    return code;
  }
}

/**
 * 对象转路径参数
 * {key: '1', key2: '2'} => ?key=1&key2=2
 */
const setRoutePathParams = object => {
  if (isObject(object)) {
    let path = '';
    for (let i in object) {
      if (object[i] != null) {
        path += `${i}=${object[i]}&`;
      }
    }
    return path;
  } else {
    return '';
  }
};

module.exports = {
  getMoneyUnit,
  compatibleVersionUid,
  setRoutePathParams
}