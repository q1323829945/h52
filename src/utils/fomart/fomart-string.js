import utils from '@/utils'
/**
 * 判断是否为字符串
 * @param {*} str
 */
export const isString = str => {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}
/**
 * 去除字符串中的空格
 * @param {*} str 字符串
 */
export const strTrimNull = str => {
  return str.replace(/\s/g, '')
}
/**
 * 去除字符串中的指定字符
 * @param {*} str 字符串
 * @param {*} type 指定字符
 */
export const strTrim = (str, type) => {
  var arr = str.split(type)
  return arr.join('')
}
/**
 * 字符串转布尔类型
 * @param {*} val
 */
export const strToBool = val => {
  switch (val) {
    case 'true':
    case 1:
    case 'yes':
      return true
    case 'false':
    case 0:
    case 'no':
    case null:
      return false
    default:
      return Boolean(val)
  }
}
/**
 * 方法名： 判断是否为空
 * @param value
 */
export const isNull = value => {
  let flag = 0
  const gettype = Object.prototype.toString
  const vtype = gettype.call(value)
  if (vtype === '[object String]') {
    flag = value.toString().trim() === '' || value.toString().trim() === 'undefined' || value.toString().trim() === 'null' ? 1 : 0
  } else if (vtype === '[object Undefined]') {
    flag = value === undefined ? 1 : 0
  } else if (vtype === '[object Null]') {
    flag = value === null ? 1 : 0
  } else if (vtype === '[object Object]') {
    flag = JSON.stringify(value) === '{}' ? 1 : 0
  } else if (vtype === '[object Array]') {
    flag = value.length === 0 ? 1 : 0
  }
  return flag
}
// 验证姓名
export function ckName(value) {
  const NameReg = /^([\u4E00 - \u9FFF] + )([·•]?[\u4E00 - \u9FFF] * ) {2, 20}$/
  return NameReg.test(value)
}
/**
 *  方法名：
 *    隐藏姓名
 *   张三 ==> *三
 *   何小明 ==> 何*明
 */
export const nameFilter = value => {
  if (utils.isNull(value)) {
    return value
  }
  const length = value.length
  let ret = ''
  if (length === 2) {
    ret = value
      .split('')
      .fill('*', 0, length - 1)
      .join('')
  } else {
    ret = value
      .split('')
      .fill('*', 1, length - 1)
      .join('')
  }
  return ret
}
/**
 *  方法名：
 *    隐藏手机号
 *  例子：
 *    15616522222 => 156 **** 222
 */
export const phoneFilter = n => {
  if (utils.isNull(n)) {
    return n
  }
  const phone = n.toString()
  const start = phone.substring(0, 3)
  const end = phone.split('').slice(-4).join('')
  return start + ' **** ' + end
}
/**
 *  格式化手机号显示
 *   当 noSpaces 为true时，13866669999  =>  138 6666 9999，否则反之
 */
export const formatPhone = (value, noSpaces) => {
  if (utils.isNull(value)) {
    return ''
  }
  const str = value.toString()
  if (noSpaces) {
    const strArr = str.split(' ')
    if (strArr.length > 1) {
      return strArr.join('')
    }
    return value
  }
  return `${str.substring(0, 3)} ${str.substring(3, 7)} ${str.substring(7)}`
}
// 手机号空格
export const phonenoFilter = value => {
  if (!value) {
    return ''
  }
  const a = value.split('')
  a.splice(7, 0, ' ')
  a.splice(3, 0, ' ')
  const b = a.join('')
  return b
}
/**
 * 验证手机第一位是1 第二位不是012
 * @param {*} value
 */
export function ckPhone(value) {
  return /^1[3456789]\d{9}$/.test(value)
}
/**
 * 验证电话号
 * @param {*} value
 */
export const isMobile = value => {
  value = value.replace(/[^-|\d]/g, '')
  return /^((\+86)|(86))?(1)\d{10}$/.test(value)
}
// 验证验证码
export function ckCode(value) {
  return value.length === 6
}
// 验证图形验证码
export function ckImgCode(value) {
  const CodeReg = /^[a - zA - Z0-9] {4}$/
  return CodeReg.test(value)
}

// 验证邮箱
export function ckEmail(value) {
  // const emailRe = /^[A - Za - z\d] + ([ - _.][A - Za - z\d] + ) * @([A - Za - z\d] + [ - .]) + [A - Za - z\d] {2, 4}$/
  const emailRe = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$')
  return emailRe.test(value)
}
// 验证身份证
export function ckIdCard(value) {
  const idCardRe = /(^\d {15}$) | (^\d {18}$) | (^\d {17}(\d | X | x)$)/
  return idCardRe.test(value)
}
/**
 *  方法名：
 *    隐藏身份证
 *  例子：
 *   430181199311527744 ==> 430************744
 */
export const idtfnoFilter = value => {
  if (utils.isNull(value)) {
    return value
  }
  return value
    .split('')
    .fill('*', 3, value.length - 3)
    .join('')
}

// 名称转换 兼容服务器表情不支持问题
export const userna = (value, name) => {
  const result = decodeURIComponent(value)
  if (utils.isNull(value) && utils.isNull(name)) {
    return '游客'
  } else if (utils.isNull(value)) {
    return name
  } else {
    return result
  }
}

// 名称转换 兼容服务器表情不支持问题
export const meruna = value => {
  try {
    return utils.decryptBase64(value)
  } catch (error) {
    return value
  }
}

// 币种枚举
export const curren = value => {
  if (utils.isNull(value)) {
    return '元'
  } else if (value === 1 || value === '01') {
    return '元'
  }
}
// 验证银行卡
export function ckBankCard(value) {
  const bankReg = /^([1-9] {1})(\d {15, 18})$/
  return bankReg.test(value)
}
/**
 *  方法名：fmtCard
 *    格式化卡号
 *  例子：
 *   6214837210789999  ==> **** **** **** 9999
 */
export const fmtCard = n => {
  if (utils.isNull(n)) {
    return n
  }
  const cardno = n.toString()
  const left = cardno.substr(cardno.length - 4, 4)
  // 每4位空一格
  return '**** **** **** ' + left
}
/**
 *  方法名：
 *    格式化银户卡号（截取卡号后16位，不够16位补0）
 */
export const bankcard = item => {
  if (item.length > 16) {
    return item.substring(item.length - 16, item.length)
  } else if (item.length < 16) {
    const max = 16 - item.length
    for (let key = 0; key < max; key++) {
      item = '0' + item
    }
    return item
  }
  return item
}

/**
* <x-input title='' ref="cashInput" />  * 在change事件里面监听 * 获取dom的currentValue * 如下  let cashVal = ckNumPoint(this.$refs.cashInput.currentValue)
          this.$refs.cashInput.currentValue = cashVal
          this.acceptCash = this.$refs.cashInput.currentValue  */
export function ckNumPoint(val) {
  val = val.match(/^\d * (\.?\d {0, 2})/g)[0]
  return val
}
/**
 *  用自定义键盘之后，x-input max属性不生效的解决办法
 *  第一个参数 是要操作的值，第二个参数 是要控制的长度
 */
export function ckStrLen(val, len) {
  val = val.substring(0, len)
  return val
}
/**
 * 判断是否为社会统一信用代码
 * @param {*} val
 */
export const isEnterCode = val => /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/.test(val)
