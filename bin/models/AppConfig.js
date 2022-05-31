const nautilus1 = require("commander");
const path = require("path");
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const prompt = require("prompt-sync")({ sigint: true });
var spawn = require("child_process").execFileSync,
  child;
const os = require("os");
const util = require("util");
const dns = require("dns");
const fs = require("fs");

const ind = require("../index");

let configeureNau = {
  astPath: "C:/Users/elchanana/IdeaProjects/ast/helm",
  region: "eu-west-3",
  devName: "",
  teamName: "",
  clusters: [
    "Nautilus-Igor",
    "Nautilus-Orly",
    "Nautilus-Jorge",
    "Nautilus-Shifra",
    "Nautilus-Ely",
    "ely-test",
    "Nautilus-Team",
    "N-Ely",
  ],
  regions: ["eu-west-1", "eu-west-2", "eu-west-3", "eu-north-1"],
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

function Config_nautilus_cli() {
  //check if a file exists

  const homeDirectory = os.homedir();
  const checkPath = `${homeDirectory}/.nautilus-cli/configFile.json`;
  if (fs.existsSync(checkPath)) {
    console.log(
      chalk.green("you heve alredy '.nautilus-cli/configFile.json' file")
    );
    return;
  }
  console.log(chalk.green("We will create a directory named .nautilus-cli"));

  console.log("Please enter the 'ast' path \n");
  let path = prompt();
  while (!fs.existsSync(path)) {
    console.log("path not exists \n");
    console.log("Please  a valid 'ast' path \n");
    path = prompt();
  }
  configeureNau.astPath = path;

  fs.mkdir(`${homeDirectory}/.nautilus-cli`, (err) => {
    if (err) throw err;
    fs.writeFile(
      `${homeDirectory}/.nautilus-cli/configFile.json`,
      `${JSON.stringify(configeureNau)}`,

      (err) => {
        if (err) throw err;
        fs.readdir("${homeDirectory}/.nautilus-cli", (err, result) => {
          console.log(result);
          console.log("Created directory!");
        });
      }
    );
  });

  console.log();
}
module.exports = { Config_nautilus_cli };

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
