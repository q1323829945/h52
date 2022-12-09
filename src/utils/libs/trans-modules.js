/*
 * @Author       : Nimo
 * @FilePath     : /saas-project/src/utils/libs/trans-modules.js
 * @Date         : 2022-02-10 15:01:57
 * @LastEditTime : 2022-02-11 13:04:32
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
/**
 * 处理路由、数据store，例如 demo.js => {demo: {}}
 *
 * @param {*} moduleFiles 文件对象
 * @returns
 */
export default moduleFiles =>
  moduleFiles
    .keys()
    .filter(v => v !== './index.js')
    .reduce((mutations, key) => {
      mutations[key.replace(/(^\.\/)|(\.js$)/g, '')] = moduleFiles(key).default || moduleFiles(key)
      return mutations
    }, {})
