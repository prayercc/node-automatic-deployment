const inquirer = require('inquirer')

async function helper(config){
    let choices = [];
    for(let i=0;i<config.length;i++) {
        choices.push({
            name: config[i].name,
            value: config[i]
        })
    }
    const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'type',
          message: '部署项目',
          choices: choices      
        }
    ]);
    return answers
}
module.exports = helper