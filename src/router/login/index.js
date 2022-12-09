/*
 * @Author       : Nimo
 * @FilePath     : /saas-project/src/router/login/index.js
 * @Date         : 2022-02-11 11:10:06
 * @LastEditTime : 2022-02-11 13:04:14
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import libs from '@/utils/libs'

const moduleFiles = require.context('./', false, /\.js$/)

export default libs.transModules(moduleFiles)
