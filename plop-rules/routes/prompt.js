const utils = require('../utils.js')

module.exports = {
  description: 'generate router',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: "What's your component name?",
      validate: utils.notEmpty('name')
    }
  ],

  actions: data => {
    const name = '{{camelCase name}}'

    const actions = [
      {
        type: 'add',
        path: `${utils.path.routes}${name}.js`,
        templateFile: 'plop-rules/routes/basic.hbs'
      }
    ]

    return actions
  }
}
