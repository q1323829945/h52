/*
 * @Author       : Nimo
 * @FilePath     : /jsd-management/src/components/menuTree/index.js
 * @Date         : 2022-02-14 16:42:49
 * @LastEditTime : 2022-04-13 16:54:37
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import MenuTree from './index.vue'

MenuTree.install = function (Vue) {
  Vue.component(MenuTree.name, MenuTree)
}

export default MenuTree
