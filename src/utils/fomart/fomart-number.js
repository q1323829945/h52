import utils from '@/utils'
// 验证数字
export function ckNumber(value) {
  const numReg = /^[1-9][0-9] * $/
  return numReg.test(value)
}
// 两位小数金额
export function ckMoney(value) {
  const MoneyReg = /^\d+(\.\d{1,2})?$/
  return MoneyReg.test(value)
}
// 格式化金额-去掉.00
export const formatFilter = value => {
  if (!value) {
    return 0
  }
  if (String(value).indexOf('.') > -1) {
    return value.split('.')[0]
  } else {
    return value
  }
}
/**
 *  方法名：
 *  格式化金额（整数或保留小数点后两位）
 */
export const amountmoney = item => {
  if (utils.isNull(item)) {
    return item
  }
  var reg = /^[-\\+]?\d+(\.\d+)?$/
  item = item + ''
  if (!reg.test(item)) {
    return item
  }
  if (Number(item) === 0) {
    return '0.00'
  } else {
    let point = ''
    let num = item
    if (item.indexOf('.') !== -1) {
      num = item.split('.')[0]
      const temp = item.split('.')[1]
      point = '.' + (temp.length === 1 ? temp + '0' : temp)
      return Number(num + point).toFixed(2)
    } else {
      return Number(item) + '.00'
    }
  }
}
/**
 *  方法名：
 *    formatMoney 将数字转千分符显示 格式化金额
 *    如：1000.23 => 1,000.23
 *  参数：
 *    m  小数
 */
export const amountFilter = (s, n = 2) => {
  if (utils.isNull(s)) return '0.00'
  n = n >= 0 && n <= 20 ? n : 2 // n大于0或等于小于等于20时，值为n，否则默认为2
  // 将要格式化的数字转换成字符串，并去掉其中匹配的其他字符后返回一个浮点数。
  // 把 Number 四舍五入为指定位数的数字后，最终在转换成字符串。
  s = parseFloat((s + '').replace(/[^\d\\.-]/g, '')).toFixed(n) + ''
  var numArry = s.split('.') // 分隔字符串 0 -> 小数点前面数值 1 -> 小数点后面的尾数
  var l = numArry[0].split('').reverse() // 将前面数值再分隔，并反转顺序
  var t = ''
  for (var i = 0; i < l.length; i++) {
    // 每隔三位小数分始开隔
    t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? ',' : '')
  }
  if (n === 0) {
    return t.split('').reverse().join('')
  } else {
    // 将顺序反转回来，并返回一个字符串
    return t.split('').reverse().join('') + '.' + numArry[1]
  }
}
/**
 *
 * {*利率} val
 * {*展示类型} _flag
 *{*true=='--'} _flag
 * {*为数字时保留对应的小数} _flag
 * {*为空时至少保留两位小数} _flag
 */
export const rateFilterMy = (val, _flag = 2) => {
  if (utils.isNull(val)) {
    return '0.00'
  } else if (_flag === true) {
    return '--'
  } else {
    let str = val + ''
    if (str.indexOf('.') > -1) {
      let floatArr = str.split('.')
      let floatNum = floatArr[1].length
      if (floatNum < _flag) {
        return Number(str).toFixed(_flag)
      } else {
        let num = str.substring(0, _flag + 1 + floatArr[0].length)
        return num
      }
    } else {
      return Number(val).toFixed(_flag)
    }
  }
}
/**
 *  方法名：
 *    formatNumber 将数字转为汉字万单位，千分位有小数点
 *    如： 10000 => 1万
 *         11000.23 => 1.1万
 *         10900.23 => 1万
 *  参数：
 *    v  转换值
 *    l  小数点后位数
 */
export const wanFilter = (v, l = 1) => {
  let n = Number(v)
  if (utils.isNull(v)) {
    return '0'
  } else if (n >= 10000) {
    n = parseFloat(n / 10000)
    return parseInt(n) === n ? n + '万' : parseInt(n) - n.toFixed(l) === 0 ? parseInt(n) + '万' : n.toFixed(l) + '万'
  }
  return n
}
/**
 * @description: 输入数字格式化
 * @param {*} value 输入数字
 * @return {*} 格式化
 */
export const formatInputNumber = value => {
  let temp = value.toString()

  // temp = temp.replace(/^0{1,}/g, '') // 第一位不能为0
  if (temp.indexOf('.') == 0) {
    //第一位就是 .
    temp = '0' + temp
  }
  temp = temp.replace(/。/g, '.')
  temp = temp.replace(/[^\d.]/g, '') //清除"数字"和"."以外的字符
  temp = temp.replace(/\.{2,}/g, '.') //只保留第一个. 清除多余的
  temp = temp.replace(/^\./g, '') //验证第一个字符是数字
  temp = temp.replace(/\.{2,}/g, '') //只保留第一个, 清除多余的
  temp = temp.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  temp = temp.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3') //只能输入两个小数
  //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
  if (temp.indexOf('.') < 0 && temp != '') {
    temp = parseFloat(temp)
  }
  return temp.toString()
}
