/*
 * @Author       : Nimo
 * @FilePath     : /saas-project/src/router/client/index.js
 * @Date         : 2022-02-10 15:03:29
 * @LastEditTime : 2022-02-11 13:04:10
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import libs from '@/utils/libs'

const moduleFiles = require.context('./', false, /\.js$/)

export default libs.transModules(moduleFiles)
