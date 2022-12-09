/*
 * @Author       : Nimo
 * @FilePath     : /saas-project-admin/src/components/dashboardHeader/index.js
 * @Date         : 2022-02-21 15:28:57
 * @LastEditTime : 2022-02-21 15:30:26
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import DashboardHeader from './index.vue'

DashboardHeader.install = function (Vue) {
  Vue.component(DashboardHeader.name, DashboardHeader)
}

export default DashboardHeader
