/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/utils/base.js
 * @Date         : 2022-02-22 16:03:49
 * @LastEditTime : 2022-09-05 09:11:01
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
// import store from './storage'

const getSystemLanguage = () => {
  let lan = navigator.systemLanguage || navigator.language
  if (lan.toLowerCase().indexOf('zh') !== -1) {
    console.log('当前浏览器默认语言为中文')
  } else {
    console.log('当前浏览器默认语言为英文')
  }
  let status = lan.toLowerCase().indexOf('zh') !== -1 ? 'zh' : 'en'
  // store.setStore('Language', status, localStorage)
  // 使用英文
  return process.env.VUE_APP_ENV == 'production' ? 'en' : status
}

const getPageTitleLanguage = (i18n, key) => {
  const hasKey = i18n.te(`routerMeta.${key}`)
  const title = i18n.t(`routerMeta.${key}`)
  if (hasKey) {
    return `${title}`
  }
  return 'saas'
}

/**
 * @description: 下载文件
 * @param {*} response 后台接口响应
 */
const convertRes2Blob = response => {
  // 提取文件名
  let fileName = response.headers['content-disposition'].match(/filename=(.*)/)[1]
  // 将二进制流转为blob
  const blob = new Blob([response.data], { type: 'application/octet-stream' })
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
    window.navigator.msSaveBlob(blob, decodeURI(fileName))
  } else {
    // 创建新的URL并指向File对象或者Blob对象的地址
    const blobURL = window.URL.createObjectURL(blob)
    // 创建a标签，用于跳转至下载链接
    const tempLink = document.createElement('a')
    tempLink.style.display = 'none'
    tempLink.href = blobURL
    tempLink.setAttribute('download', decodeURI(fileName))
    // 兼容：某些浏览器不支持HTML5的download属性
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank')
    }
    // 挂载a标签
    document.body.appendChild(tempLink)
    tempLink.click()
    document.body.removeChild(tempLink)
    // 释放blob URL地址
    window.URL.revokeObjectURL(blobURL)
  }
}

export default {
  getPageTitleLanguage,
  getSystemLanguage,
  convertRes2Blob
}
