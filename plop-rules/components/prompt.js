const utils = require('../utils.js')

module.exports = {
  description: 'generate vue component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: "What's your component name?",
      validate: utils.notEmpty('name')
    },
    {
      type: 'list',
      name: 'type',
      message: 'Which type of component are you want?',
      choices: ['basic', 'decorator']
    }
  ],

  actions: data => {
    const name = '{{camelCase name}}'

    const templateFileAdapter = {
      basic: 'plop-rules/components/basic.hbs',
      decorator: 'plop-rules/components/decorator.hbs',
      default: 'plop-rules/components/basic.hbs'
    }

    const actions = [
      {
        type: 'add',
        path: `${utils.path.components}${name}/${name}.vue`,
        templateFile: templateFileAdapter[data.type] || templateFileAdapter.default
      },
      {
        type: 'add',
        path: `${utils.path.components}${name}/index.js`,
        templateFile: 'plop-rules/components/index.hbs'
      }
    ]
    return actions
  }
}
