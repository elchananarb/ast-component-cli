var spawn = require("child_process").execFileSync,
  child;
const chalk = require("chalk");
const figlet = require("figlet");

// var figlet = require('figlet');

// figlet('Hello World!!', function(err, data) {
//     if (err) {
//         console.log('Something went wrong...');
//         console.dir(err);
//         return;
//     }
//     console.log(data)
// });

//    console.log(chalk.greenBright(figlet.textSync("hello world")));

//     console.log(
//       chalk.red((child = spawn("powershell.exe", ["figlet 'NAUTILUS'"])))
//     );