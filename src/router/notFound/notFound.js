/*
 * @Author       : Nimo
 * @FilePath     : /jsd-management/src/router/notFound/notFound.js
 * @Date         : 2022-06-08 16:51:43
 * @LastEditTime : 2022-06-08 17:01:41
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */

export default {
  path: '*',
  name: '404',
  component: resolve => require(['@/views/notFound/index.vue'], resolve)
}
