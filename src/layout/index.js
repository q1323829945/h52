/*
 * @Author       : Nimo
 * @FilePath     : /jsd-management/src/layout/index.js
 * @Date         : 2022-02-10 16:15:58
 * @LastEditTime : 2022-06-10 13:38:53
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import Appmain from './app-main'

const install = function (Vue) {
  Vue.component(Appmain.name, Appmain)
}

export default {
  install
}
