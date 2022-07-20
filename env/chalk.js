const chalk = require('chalk');

// chalk styling 
const style ={
    error : chalk.bold.redBright.inverse,
    success : chalk.bold.greenBright,
    warning : chalk.keyword('orange').bold
} 

module.exports = style;