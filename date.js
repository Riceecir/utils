/**
 * 获取本月第一天
 * @returns {string}
 */
export function getCurrentMonthFirst () {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  return year + '/' + month + '/01';
}

/**
* 获取上月第一天
* @returns {string}
*/
export function getBeforeMonthFirst () {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  if (month === 0) {
    month = 12;
    year = year - 1;
  }
  return year + '/' + month + '/01';
}

/**
* 获取前一天日期
* @returns {string}
*/
export function getBeforeDay () {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate() - 1;
  return year + '/' + month + '/' + day;
}

/**
* 获取上一年
* @returns {string}
*/
export function getLastYear () {
  let date = new Date();
  let year = date.getFullYear() - 1;
  let month = date.getMonth() + 2;
  if (month < 10) {
    month = '0' + month;
  }
  return year + '/' + month + '/01';
}

/**
* 获取本月
* @returns {string}
*/
export function getCurrentMonth () {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  return year + '/' + month;
}

/**
 * 格式化时间
 * @returns {string}
 */
export function dateFormat (oldDate, format) {
  if (oldDate == null) return oldDate;
  if (typeof(oldDate) === 'string' || typeof(oldDate) === 'number') oldDate = new Date(oldDate);
  if (format === undefined) format = 'yyyy-MM-dd hh:mm:ss';
  try {
    let date = {
      'M+': oldDate.getMonth() + 1,
      'd+': oldDate.getDate(),
      'q+': Math.floor((oldDate.getMonth() + 3) / 3), // 这个是季度
      'H+': oldDate.getHours(),  // 24小时制
      'h+': oldDate.getHours() % 12 === 0 ? 12 : oldDate.getHours() % 12, // 12小时制
      'm+': oldDate.getMinutes(),
      's+': oldDate.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (oldDate.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in date) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
      }
    }
    return format;
  } catch (error) {
    return oldDate;
  }
}

/**
 * 当前日期是今年第几周
 * @returns {string}
 */
export function getCurrenthWeek () {
  let currentYearFirst = new Date();
  let today = new Date();
  currentYearFirst.setMonth(0);
  currentYearFirst.setDate(1);
  /**
   * 从今年的第一个周一开始计算相差天数
   * 1月1日 与 第一个周一的差
   **/
  let differFirstMonday = 0;
  if (currentYearFirst.getDay() !== 1) differFirstMonday = (7 - currentYearFirst.getDay());
  /**
   * 86400000: 一天的毫秒数
   * 计算与第一个周一相差的天数
   **/
  const differDay = (today.getTime() - currentYearFirst.getTime()) / 86400000 - differFirstMonday;
  /* 向上取整 */
  let week = Math.ceil((differDay / 7));
  /* 如果1月1日不是周一，则周数＋1 */
  if (differFirstMonday !== 0) week += 1;
  return week;
}

/**
 * 日期选择器配置
 */
export const shortcuts = [{
  text: '今天',
  value () {
    const end = new Date();
    const start = new Date(dateFormat(end, 'yyyy/MM/dd'));
    return [start, end];
  }
},
{
  text: '上月',
  value () {
    const end = new Date(getCurrentMonthFirst());
    const start = new Date(getBeforeMonthFirst());
    end.setTime(end.getTime() - 3600 * 1000 * 24);
    return [start, end];
  }
},
{
  text: '本月',
  value () {
    const end = new Date();
    const start = new Date(getCurrentMonthFirst());
    return [start, end];
  }
},
{
  text: '最近一周',
  value () {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    return [start, end];
  }
},
{
  text: '最近一个月',
  value () {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
    return [start, end];
  }
},
{
  text: '最近三个月',
  value () {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
    return [start, end];
  }
}];
