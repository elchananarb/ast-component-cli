const nautilus1 = require("commander");
const path = require("path");
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const prompt = require("prompt-sync")({ sigint: true });
var spawn = require("child_process").execFileSync,
  child;
const ProgressBar = require("progress");

const os = require("os");
const util = require("util");
const dns = require("dns");
const fs = require("fs");

const ind = require("../index");

function printData(child) {
  const bar = new ProgressBar(":bar", { total: 20 });
  const timer = setInterval(() => {
    bar.tick();
  }, 800);

  var scriptOutput = "";
  child.stdout.setEncoding("utf8");
  child.stdout.on("data", function (data) {
    //Here is where the output goes
    console.log(chalk.green(data));
    data = data.toString();
    scriptOutput += data;
  });

  child.stderr.setEncoding("utf8");
  child.stderr.on("data", function (data) {
    //Here is where the error output goes
    console.log(chalk.red("stderr: " + data));
    data = data.toString();
    scriptOutput += data;
  });

  child.on("exit", function () {
    console.log(chalk.magenta("Powershell Script finished"));
    clearInterval(timer);
  });
  child.stdin.end();
}

function printData_try_promise(child) {
  let myPromise = new Promise((resolve, reject) => {
    var scriptOutput = "";
    child.stdout.setEncoding("utf8");
    child.stdout.on("data", function (data) {
      //Here is where the output goes
      console.log(chalk.green(data));
      data = data.toString();
      scriptOutput += data;
    });

    child.stderr.setEncoding("utf8");
    child.stderr.on("data", function (data) {
      //Here is where the error output goes
      console.log(chalk.red("stderr: " + data));
      data = data.toString();
      scriptOutput += data;
    });

    child.on("exit", function () {
      console.log(chalk.magenta("Powershell Script finished"));
      resolve(scriptOutput);
    });
    child.stdin.end();
  });
  return myPromise;
}

module.exports.printData = printData;
module.exports.printData_try_promise = printData_try_promise;

// Adding the code below to allow importing
// the functions in other files

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
