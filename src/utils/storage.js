/*
 * @Author       : Nimo
 * @FilePath     : /saas-project/src/utils/storage.js
 * @Date         : 2022-02-11 13:30:08
 * @LastEditTime : 2022-02-11 13:34:22
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
/**
 * 设置cookie
 *
 * @param {*} name
 * @param {*} value
 * @param {*} day
 */
export const setCookie = (name, value, day) => {
  const date = new Date()
  date.setDate(date.getDate() + day)
  document.cookie = `${name}=${value};expires=${date}`
}

/**
 * 获取cookie
 *
 * @param {*} name
 * @returns
 */

export const getCookie = name => {
  const reg = RegExp(`${name}=([^;]+)`)
  const arr = document.cookie.match(reg)
  if (arr) {
    return arr[1]
  }
  return ''
}

/**
 * 删除 cookie
 *
 * @param {*} name
 */
export const delCookie = name => {
  setCookie(name, null, -1)
}

/**
 * 存储sessionStorage
 */
export const setStore = (name, content, storeType = sessionStorage) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  storeType.setItem(name, content)
}

/**
 * 获取sessionStorage
 */
export const getStore = (name, storeType = sessionStorage) => {
  if (!name) return
  let value = storeType.getItem(name)
  if (value && value.indexOf('{') >= 0) {
    value = JSON.parse(storeType.getItem(name))
  }
  return value
}

/**
 * 删除sessionStorage
 */
export const removeStore = (name, storeType = sessionStorage) => {
  if (!name) return
  storeType.removeItem(name)
}

/**
 * 删除所有sessionStorage
 */
export const clearStore = (storeType = sessionStorage) => {
  storeType.clear()
}

export default {
  setCookie,
  getCookie,
  delCookie,
  setStore,
  getStore,
  removeStore,
  clearStore
}
