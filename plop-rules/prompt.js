const utils = require('./utils.js')

module.exports = {
  description: 'generate a view page',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: "What's your modules(api、route、view) name?",
      validate: utils.notEmpty('name')
    },
    {
      type: 'input',
      name: 'context',
      message: "What's your context path of this service?",
      default: 'COMMON'
    }
  ],
  actions: data => {
    const name = '{{name}}'

    const actions = [
      {
        type: 'add',
        path: `${utils.path.routes}${name}.js`,
        templateFile: 'plop-rules/routes/basic.hbs'
      },
      {
        type: 'add',
        path: `${utils.path.views}${name}/index.vue`,
        templateFile: 'plop-rules/views/basic.hbs'
      }
    ]

    return actions
  }
}
