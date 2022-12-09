/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/utils/index.js
 * @Date         : 2022-02-11 13:30:43
 * @LastEditTime : 2022-11-09 15:34:58
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import fomart from './fomart'
import libs from './libs'
import menuTree from './menuTree'
import storage from './storage'
import language from './language'
import base from './base'
import config from './config'
import optsConfig from './optsConfig'
import guide from './guide'

export default {
  ...config,
  ...base,
  ...language,
  ...fomart,
  ...libs,
  ...storage,
  ...menuTree,
  ...optsConfig,
  ...guide
}
