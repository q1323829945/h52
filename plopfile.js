const viewsGenerator = require('./plop-rules/views/prompt')
const routesGenerator = require('./plop-rules/routes/prompt')
const componentsGenerator = require('./plop-rules/components/prompt')
const modulesGenerator = require('./plop-rules/prompt')

module.exports = function (plop) {
  plop.setGenerator('module', modulesGenerator)
  plop.setGenerator('route', routesGenerator)
  plop.setGenerator('view', viewsGenerator)
  plop.setGenerator('component', componentsGenerator)
}
