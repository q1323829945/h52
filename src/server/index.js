/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/server/index.js
 * @Date         : 2022-02-14 10:56:18
 * @LastEditTime: 2022-08-01 09:58:31
 * @LastEditors: lizheng2 lizheng2@sunline.cn
 * @Logs         :
 *
 */
import utils from '@/utils'
import store from '../store/store'
import api from './api'
import axios from 'axios'
import language from '@/utils/language'
import { MessageBox, Message } from 'element-ui'

const cancel = null
const promiseArr = {}
const allUrl = Object.assign(...Object.values(api), {})
const instance = axios.create({
  baseURL: '',
  timeout: 30000
})

instance.interceptors.request.use(
  config => {
    const arrFlag = `${config.url}?${JSON.stringify(config.data)}`
    // 重复请求取消操作
    if (promiseArr[arrFlag]) {
      promiseArr[arrFlag]('_CACHE_')
      promiseArr[arrFlag] = cancel
    } else {
      promiseArr[arrFlag] = cancel
    }
    return config
  },
  err => Promise.reject(err)
)

// 拦截返回的信息，做统一异常处理
instance.interceptors.response.use(response => {
  let { data /*, config*/ } = response
  // console.log('返回的信息==', response)
  if (response.status === 200) {
    if (utils.isObj(response.data.data)) {
      data = response.data
      // 下载文件需要response整体
      if (utils.objKey(response.data.data, 'outputStream')) {
        data = response
      }
    } else {
      if (utils.objKey(response.headers, 'content-disposition')) {
        // headers包含content-disposition则为下载文件，需要回调整个response
        data = response
      } else {
        data = { data: response.data }
      }
    }
  }
  return data
})

/**
 * 设置请求头headers
 *
 * @param {*} opt 当前传入的请求方式
 * @returns {Object} 头部headers
 */
const setHeader = opt => {
  const { headers = {} /*, tokenId = ''*/ } = opt
  let userInfo = utils.getStore('USER-INFO', sessionStorage)
  let userToken = utils.getStore('USER-TOKEN', sessionStorage)
  let tenantDomain = utils.getStore('USER-DOMAIN', sessionStorage)
  let contentType = 'application/json; charset=UTF-8'
  if (opt.encrypt == 'upload') {
    contentType = 'multipart/form-data;; boundary=<calculated when request is sent>;charset=UTF-8'
  }
  if (opt.encrypt == 'download') {
    contentType = 'application/octet-stream'
  }
  return {
    'content-type': contentType,
    'X-Authorization-Username': !utils.isNull(JSON.stringify(userInfo)) ? userInfo.username : '',
    'X-Authorization': userToken || '',
    'X-Authorization-Tenant': tenantDomain,
    ...headers,
    chanle: opt.comm.chanle
  }
}
/**
 *  加工请求参数，默认post
 *
 * @param {*} url 接口地址
 * @param {*} [params={}] 接口参数
 * @param {*} [opt={
 *  method : 'get' //以get方式请求，默认为post
 *  cache : '缓存名' //接口数据需要缓存时配置，默认不缓存
 *  token : 是否传入token，默认取本地存储
 * }]
 * @returns axios params
 */

const setParams = (url, params = {}, opt = {}) => {
  // params.comm_req = setComConfig(opt)
  // promiseArr[opt.headers.transCode] = {}
  // 请求个性化配置
  instance.defaults.customConfig = {
    ...opt
  }
  // 设置headers
  const headers = setHeader(opt)
  // params = JSON.stringify(params)
  let curParams = {}
  if (['upload'].includes(opt.encrypt)) {
    curParams = {
      url,
      headers,
      method: opt.method || 'post',
      data: params
    }
    if (opt.method == 'get') {
      delete curParams.data
      curParams.params = params
    }
  } else {
    // params = JSON.stringify(params)
    curParams = {
      url,
      headers,
      method: opt.method || 'post',
      data: params,
      responseType: opt.responseType || 'text' // 下载文件时传入 opt.responseType为 arraybuffer
    }
    if (opt.method == 'get') {
      delete curParams.data
      curParams.params = params
    }
  }
  return curParams
}

/**
 * 同时支持get、post、put请求
 *
 * @param {*} url 接口地址
 * @param {*} [params={}] 接口参数
 * @param {*} [opt={
 *  type : true, //将params参数以key/value形式拼接,method为get时生效
 *  method : 'get' //以get方式请求，默认为post
 *  cache : '缓存名' //接口数据需要缓存时配置，默认不缓存
 * }]
 * @returns prmoise对象
 */
const setFetch = (url, params = {}, opt = {}) => {
  const options = setParams(url, params, opt)
  return new Promise((resolve, reject) => {
    // 上传下载添加请求时长6分钟
    if (['upload', 'download', 'video'].includes(opt.encrypt)) {
      options.timeout = 6 * 60 * 1000
    }
    instance(options)
      .then(res => {
        // console.log('response success==>', res)
        resolve(res)
      })
      .catch(error => {
        // console.log('response error==>', error)
        let response = error.response
        let errorMsg = error
        console.log('response error', response)

        if (utils.objKey(response, 'data')) {
          switch (response.data.statusCode) {
            case 2000:
              errorMsg = 'AUTHORIZATION_LOGIN_FAILED！'
              reject(errorMsg)
              break
            case 2001:
              errorMsg = response.data.exceptionMessage
              if (!store.getters.getOnceNetworkAlert) {
                // store记录， setOnceNetworkAlert  多个请求只弹出一个error弹窗
                store.dispatch('setOnceNetworkAlert', true)
                MessageBox.alert(`${errorMsg}, ${language.t('commonDialog.logAgain')}`, `${language.t('commonDialog.tips')}`, {
                  confirmButtonText: `${language.t('button.confirm')}`,
                  cancelButtonText: `${language.t('button.cancel')}`,
                  type: 'warning',
                  center: true,
                  showClose: false,
                  showCancelButton: true
                })
                  .then(() => {
                    store.dispatch('setOnceNetworkAlert', false)
                    window.sessionStorage.clear()
                    window.location.href = '/'
                  })
                  .catch(() => {
                    store.dispatch('setOnceNetworkAlert', false)
                  })
              }
              break
            default:
              errorMsg = utils.isObj(response.data) ? response.data.exceptionMessage : response.statusText
              if (utils.objKey(opt.comm, 'showMessage')) {
                Message.error(errorMsg)
                reject(errorMsg)
              } else {
                reject(errorMsg)
              }
              break
          }
        }
      })
  })
}
/**
 * 通用接口请求方法
 * @param {*} param
 * encrypt：加密方式(encrypt:'login',encrypt:'nologin',encrypt:'yeslogin')
 * comm: putURL 使用put请求 url拼接参数
 * errType:错误提示点击确定-home回到首页、close关闭页面
 */
export const fetch = (url, param = {}, opt = {}) => {
  const { encrypt = 'yeslogin', errType = '', comm = {}, ...other } = opt
  // let context = process.env.VUE_APP_SERVERPATH
  let context = ''
  if (['login'].includes(encrypt)) {
    context = process.env.VUE_APP_SERVERPATHLOGIN
  }

  if (process.env.VUE_APP_ENV == 'production') {
    context = process.env.VUE_APP_SERVER_API + context
  }

  const options = {
    errType,
    encrypt,
    comm,
    ...other,
    apiContext: context
  }
  let requestUrl = allUrl[url]

  // post请求
  if (opt.method == 'post') {
    if (utils.objKey(comm, 'paramUrl')) {
      if (comm.paramUrl) {
        // url带参数
        requestUrl = url
      } else {
        // url不带参数
        requestUrl = allUrl[url]
      }
    }
  }
  // put请求用拼接后的url
  if (opt.method == 'put') {
    requestUrl = url
  }
  // get请求拼接页码和条数
  if (opt.method == 'get') {
    // 链接带参数
    if (utils.objKey(comm, 'paramUrl')) {
      requestUrl = `${url}`
    }
  }
  // delete请求 请求用拼接后的url
  if (opt.method == 'delete') {
    requestUrl = url
  }
  let params = {}
  params = param
  // params = { input: param, sys: { prcscd: allUrl[url].replace('/', '') } }
  // }
  return setFetch(context + requestUrl, params, options)
}

/**
 * @description: 文件接口
 * @param {*} url
 * @param {*} param
 * @param {*} opt
 * @return {*}
 */
export const fetchDocument = (url, param = {}, opt = {}) => {
  const { encrypt = 'yeslogin', errType = '', comm = {}, ...other } = opt
  let context = ''
  if (process.env.VUE_APP_ENV == 'production') {
    context = process.env.VUE_APP_SERVER_API
  }
  const options = {
    errType,
    encrypt,
    comm,
    ...other
  }
  let requestUrl = allUrl[url]
  // 除post以外的请求都用拼接后的url
  if (opt.method == 'put' || opt.method == 'get' || opt.method == 'delete') {
    requestUrl = url
  }

  // isRevise 修改用拼接后的url
  if (utils.objKey(opt, 'isRevise')) {
    requestUrl = url
  }
  return setFetch(context + requestUrl, param, options)
}
