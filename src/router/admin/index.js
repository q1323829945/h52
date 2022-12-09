/*
 * @Author       : Nimo
 * @FilePath     : /saas-project-admin/src/router/admin/index.js
 * @Date         : 2022-02-10 15:03:00
 * @LastEditTime : 2022-02-14 13:34:42
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import libs from '@/utils/libs'

const moduleFiles = require.context('./', false, /\.js$/)

export default libs.transModules(moduleFiles)
