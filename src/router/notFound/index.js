/*
 * @Author       : Nimo
 * @FilePath     : /jsd-management/src/router/404/index.js
 * @Date         : 2022-06-08 16:51:29
 * @LastEditTime : 2022-06-08 16:51:29
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import libs from '@/utils/libs'

const moduleFiles = require.context('./', false, /\.js$/)

export default libs.transModules(moduleFiles)
