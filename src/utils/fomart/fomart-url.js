/**
 *  将object参数，转换成以kv形式拼接，主要用于Content-Type === 'application/x-www-form-urlencoded'时
 *  params:{
 *    id: 12313,
 *    name: xxx
 *  }
 * @returns id=12313&name=xxx
 * 当以'/'分割时，/12313/xxx
 */
export const serializeParam = (params = {}, split = '&') => {
  let paramsStr = '' // 数据拼接字符串
  Object.keys(params).forEach(key => {
    if (split === '&') {
      paramsStr += `${key}=${params[key]}${split}`
    } else if (split === '/') {
      paramsStr += `${params[key]}${split}`
    }
  })

  if (paramsStr !== '') {
    return paramsStr.substr(0, paramsStr.lastIndexOf(`${split}`))
  }
  return paramsStr
}
/**
 * 截取url指定参数值
 *
 * @param {*} name 要获取参数名称
 * @example
 *  url：http://wwww.jb51.net/?q=js
 *
 * @returns getUrlParam(q) => js
 */
export const getUrlParam = name => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
  const curStr = window.location.href.split('?')
  let r = ''
  if (curStr[1]) {
    r = curStr[1].match(reg) // search,查询？后面的参数，并匹配正则
    if (r !== null) return unescape(r[2])
  }
  return r
}

/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id: 12345, a: b}
 */
export const urlParse = url => {
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  const arr = url.match(reg)
  // ['id=12345', 'a=b']
  if (arr) {
    arr.forEach(item => {
      const tempArr = item.split('=')
      // decodeURIComponent() 函数可对 encodeURIComponent() 函数编码的 URI 进行解码。
      const key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      if (val === 'true') {
        val = true
      } else if (val === 'false') {
        val = false
      }
      obj[key] = val
    })
  }
  return obj
}

export function transformUrlParam(obj) {
  if (JSON.stringify(obj) === '{}') {
    return {}
  }
  var _str = ''
  for (var o in obj) {
    if (obj[o] != -1) {
      _str += o + '=' + obj[o] + '&'
    }
  }
  // eslint-disable-next-line no-redeclare
  var _str = _str.substring(0, _str.length - 1)
  return _str
  //  if (JSON.stringify(obj) === '{}') {
  //    return {}
  //  }

  // let urlParam = ''
  // for (const key in obj) {
  //   urlParam = `${key}=${obj[key]}`
  //   // if (Object.hasOwnProperty.call(object, key)) {
  //   //   const element = object[key]
  //   // }
  // }
}
