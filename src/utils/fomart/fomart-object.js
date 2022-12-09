import utils from '@/utils'
/**
 * 判断是否为对象
 * @param {*} x
 */
export const isObj = x => {
  const type = typeof x
  return x !== null && (type === 'object' || type === 'function')
}
/**
 * 检查对象是否有指定key
 */
export const objKey = (obj, key) => {
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (utils.isNull(obj[key])) {
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  } else {
    return false
  }
}
