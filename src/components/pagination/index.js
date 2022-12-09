/*
 * @Author       : Nimo
 * @FilePath     : /saas-project-admin/src/components/pagination/index.js
 * @Date         : 2022-02-16 09:23:00
 * @LastEditTime : 2022-02-16 09:23:00
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import Pagination from './index.vue'

Pagination.install = function (Vue) {
  Vue.component(Pagination.name, Pagination)
}

export default Pagination
