const utils = require('../utils.js')

module.exports = {
  description: 'generate a view',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'view name please',
      validate: utils.notEmpty('name')
    }
  ],
  actions: data => {
    const name = '{{camelCase name}}'

    const actions = [
      {
        type: 'add',
        path: `${utils.path.views}${name}/index.vue`,
        templateFile: 'plop-rules/views/basic.hbs'
      }
    ]

    return actions
  }
}
