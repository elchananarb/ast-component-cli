const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const prompt = require("prompt-sync")({ sigint: true });
var spawn = require("child_process").execFileSync,
  child;
const printData = require("./printData.js");

const os = require("os");

const fs = require("fs");

const homeDirectory = os.homedir();
const nautilus_cli_dir_path = `${homeDirectory}/.nautilus-cli`;
const config_file_path = `${nautilus_cli_dir_path}/configFile.json`;

let configeureNau = {
  astPath: "C:/Users/elchanana/IdeaProjects/ast/helm",
  username: "elchanan.arbiv@checkmarx.com",
  jfrogToken: "",

  astOperator: "",
  astComponents: "",
  componenIntegration: "",
  componentMetrics: "",
  componentPolicyManagement: "",

  region: "eu-west-3",
  devName: "",
  teamName: "",
  clusters: [
    "Nautilus-Igor",
    "Nautilus-Orly",
    "Nautilus-Jorge",
    "Nautilus-Shifra",
    "Nautilus-Chaya",
    "Nautilus-Ely",
    "N-Ely",
  ],
  regions: ["eu-west-2", "eu-west-3", "eu-north-1"],
  services: [
    {
      name: "ast-flow-publisher",
      path: "",
      chartPath: "/helm/charts/ast-flow-publisher",
    },
    {
      name: "ast-flow-listener",
      path: "",
      chartPath: "",
    },
    {
      name: "integrations-repos-manager",
      path: "",
      chartPath: "",
    },
    {
      name: "integrations-datastore",
      path: "",
      chartPath: "",
    },
    {
      name: "feedback-app",
      path: "",
      chartPath: "",
    },
  ],
};

function Login_to_Docker() {
  try {
    //const fileContents = fs.readFileSync("./configFile.json", "utf8");
    const fileContents = fs.readFileSync(
      `${homeDirectory}/.nautilus-cli/configFile.json`,
      "utf8"
    );
    ////take from the file config
    const data = JSON.parse(fileContents);

    ////take cluster name from the file config
    const username = data.username;
    const jfrogToken = data.jfrogToken;

    var spawn = require("child_process").spawn,
      child;
    child = spawn("powershell.exe", [
      `docker login --username ${username} --password ${jfrogToken} https://checkmarx.jfrog.io/artifactory/docker ;
       helm repo add ast https://checkmarx.jfrog.io/artifactory/ast-helm/ --username ${username} --password ${jfrogToken} ;
      helm repo update`,
    ]);
  } catch (err) {
    console.error(err);
  }
  printData.printData(child);
  console.log(
    chalk.magenta(
      "check!!! the other command" +
        "helm repo add ast https://checkmarx.jfrog.io/artifactory/ast-helm/ --username <yourname@checkmarx.com> --password <you-jfrog-token> "
    )
  );
}
function create_dir_nautilus_cli() {
  fs.mkdir(nautilus_cli_dir_path, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(chalk.green("We create a directory named .na66666666"));
    }
  });
}
function create_file_config(configeureNau) {
  fs.writeFile(config_file_path, `${JSON.stringify(configeureNau)}`, (err) => {
    if (err) throw err;
    fs.readdir(config_file_path, (err, result) => {
      //console.log(result);
      console.log("Created directory!");
    });
  });
}

function Config_nautilus_cli() {
  //check if a dir exists
  if (!fs.existsSync(nautilus_cli_dir_path)) {
    create_dir_nautilus_cli();
  }

  console.log(chalk.blue("Please enter the 'yourname@checkmarx.com' \n"));
  let yourname = prompt();
  yourname = remove_spaces(yourname);
  configeureNau.username = yourname;

  console.log(chalk.blue("Please enter the 'password <you-jfrog-token>' \n"));
  let jfrog_token = prompt();
  jfrog_token = remove_spaces(jfrog_token);
  configeureNau.jfrogToken = jfrog_token;

  let flag_path_exist = false;

  let astOperator = "";
  let astComponents = "";
  let componenIntegration = "";
  let componentMetrics = "";
  let componentPolicyManagement = "";

  while (!flag_path_exist) {
    flag_path_exist = true;

    console.log(
      chalk.blue(
        "Please enter the Base of AST components For example 'C:Users//elchanana//IdeaProjects' \n"
      )
    );
    let baseComponent = prompt();
    baseComponent = remove_spaces(baseComponent);

    astOperator = `${baseComponent}\\ast-operator`;
    astComponents = `${baseComponent}\\ast-Components`;
    componenIntegration = `${baseComponent}\\component-integration`;
    //componentMetrics = `${baseComponent}\\component-ast-metrics`;
    componentMetrics = `${baseComponent}\\component-metrics`;
    componentPolicyManagement = `${baseComponent}\\component-policy-management`;

    const paths = new Array(
      astOperator,
      astComponents,
      componenIntegration,
      componentMetrics,
      componentPolicyManagement
    );
    paths.forEach(myFunction);
    function myFunction(value, index, array) {
      if (!fs.existsSync(value)) {
        flag_path_exist = false;
        console.log(chalk.blue(`the path "${value}"`));
        console.log(chalk.red(`not exist try again\n`));
      }
    }
  }

  configeureNau.astOperator = astOperator;
  configeureNau.astComponents = astComponents;
  configeureNau.componenIntegration = componenIntegration;
  configeureNau.componentMetrics = componentMetrics;
  configeureNau.componentPolicyManagement = componentPolicyManagement;
  configeureNau.username = yourname;
  configeureNau.jfrogToken = jfrog_token;

  create_file_config(configeureNau);
  console.log();
}

function remove_spaces(el) {
  var val = el.replace(/\s/g, "");
  return val;
}

module.exports.Config_nautilus_cli = Config_nautilus_cli;
module.exports.Login_to_Docker = Login_to_Docker;

// module.exports = { Config_nautilus_cli };
// module.exports = { Login_to_Docker };

//path to ast-operator /ast-components /component-integration /component-metrics /component-policy-managementast-operator

//ast
// console.log(chalk.blue("Please enter the 'ast' path \n"));
// let path = prompt();
// while (!fs.existsSync(path)) {
//   console.log(chalk.red("path not exists"));
//   console.log(chalk.blue("Please  a valid 'ast' path \n"));
//   path = prompt();
// }
// configeureNau.astPath = path;

// //ast-operator
// console.log(chalk.blue("Please enter the 'ast-operator' path \n"));
// let astOperator = prompt();
// while (!fs.existsSync(path)) {
//   console.log(chalk.red("path not exists"));
//   console.log(chalk.blue("Please  a valid 'ast-operator' path \n"));
//   path = prompt();
// }
// configeureNau.astOperator = astOperator;

// //ast-components
// console.log(chalk.blue("Please enter the 'ast-components' path \n"));
// let astComponents = prompt();
// while (!fs.existsSync(path)) {
//   console.log(chalk.red("path not exists"));
//   console.log(chalk.blue("Please  a valid 'ast' path \n"));
//   path = prompt();
// }
// configeureNau.astComponents = astComponents;

// //component-integration
// console.log(chalk.blue("Please enter the 'component-integration' path \n"));
// let componenIntegration = prompt();
// while (!fs.existsSync(path)) {
//   console.log(chalk.red("path not exists"));
//   console.log(chalk.blue("Please  a valid 'ast' path \n"));
//   path = prompt();
// }
// configeureNau.componenIntegration = componenIntegration;

// //component-metrics
// console.log(chalk.blue("Please enter the 'component-metrics' path \n"));
// let componentMetrics = prompt();
// while (!fs.existsSync(path)) {
//   console.log(chalk.red("path not exists"));
//   console.log(chalk.blue("Please  a valid 'ast' path \n"));
//   path = prompt();
// }
// configeureNau.componentMetrics = componentMetrics;

// //component-policy-management
// console.log(
//   chalk.blue("Please enter the 'component-policy-management' path \n")
// );
// let componentPolicyManagement = prompt();
// while (!fs.existsSync(path)) {
//   console.log(chalk.red("path not exists"));
//   console.log(
//     chalk.blue("Please  a valid 'component-policy-managementst' path \n")
//   );
//   path = prompt();
// }
// configeureNau.componentPolicyManagement = componentPolicyManagement;

//path to ast-operator /ast-components /component-integration /component-metrics /component-policy-managementast-operator
//######################################################

// function printData(child) {
//   var scriptOutput = "";
//   child.stdout.setEncoding("utf8");
//   child.stdout.on("data", function (data) {
//     //Here is where the output goes
//     console.log(chalk.green(data));

//     data = data.toString();
//     scriptOutput += data;
//   });

//   child.stderr.setEncoding("utf8");
//   child.stderr.on("data", function (data) {
//     //Here is where the error output goes

//     console.log("stderr: " + data);

//     data = data.toString();
//     scriptOutput += data;
//   });

//   child.stdout.on("exit", function () {
//     console.log("Powershell Script finished");
//   });
//   child.stdin.end();
// }

// Adding the code below to allow importing
// the functions in other files
//module.exports = { printData };`

// class AppConfig {

//   	  getConfig() {
//   		const home = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
//   		const path=`${home}/.nautilus/configFile.json`;
//   		if( fs.existsSync(path)) {
//   			return parseJson<AppConfig>(fs.readFileSync(path).toString());
//   		}
//   		return new AppConfig();
//   	}
//   requestHandler(request, response) {
//     response.end("Hello World");
//   }
// }
// module.exports = MyServer;

// // import { Service } from "./Service";
// // import * as fs from "fs";
// // import { parseJson } from "../common/parseJson";

// // /* eslint-disable @typescript-eslint/no-empty-function */
// // export class AppConfig{

// // 	astPath: string;
// // 	region: string;
// // 	devName: string;
// // 	teamName: string;
// // 	services: Service[];
// // 	clusters: string[];
// // 	regions: string[];
// // 	isWindows:boolean;
// // 	private static instance: AppConfig

// // 	constructor(){
// // 		this.isWindows= !(process.env.COMMAND_MODE || "").includes('unix');
// // 	}

// // 	private static getConfig(): AppConfig{
// // 		const home = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
// // 		const path=`${home}/.nautilus/configFile.json`;
// // 		if( fs.existsSync(path)) {
// // 			return parseJson<AppConfig>(fs.readFileSync(path).toString());
// // 		}
// // 		return new AppConfig();
// // 	}

// // }
