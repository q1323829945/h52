/*
 * @Author       : Nimo
 * @FilePath     : /saas-project-admin/src/components/publicTable/index.js
 * @Date         : 2022-02-15 16:48:48
 * @LastEditTime : 2022-02-15 16:50:01
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import PublicTable from './index.vue'

PublicTable.install = function (Vue) {
  Vue.component(PublicTable.name, PublicTable)
}

export default PublicTable
