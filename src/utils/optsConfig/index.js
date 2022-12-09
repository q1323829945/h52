/*
 * @Author       : Nimo
 * @FilePath     : /saas-jsd-management/src/utils/config/index.js
 * @Date         : 2022-03-18 11:14:08
 * @LastEditTime : 2022-03-18 11:17:24
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import libs from '@/utils/libs'

const moduleFiles = require.context('./', false, /\.js$/)

export default libs.transModules(moduleFiles)
