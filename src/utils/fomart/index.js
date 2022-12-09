function initModuleFiles() {
  const moduleFiles = require.context('./', false, /\.js$/)
  let fomartObj = {}
  let allObj = moduleFiles
    .keys()
    .filter(v => v !== './index.js')
    .reduce((mutations, key) => {
      fomartObj.allJS = mutations[key.replace(/(^\.\/)|(\.js$)/g, '')]
      fomartObj = Object.assign(fomartObj, moduleFiles(key).default || moduleFiles(key))
      return fomartObj
    }, {})
  return allObj
}
export default initModuleFiles()
