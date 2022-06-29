const yaml = require("js-yaml");
const fs = require("fs");
const nautilus = require("commander");
const chalk = require("chalk");
const clear = require("clear");
const prompt = require("prompt-sync")({ sigint: true });
var spawn = require("child_process").execFileSync,
  child;
const os = require("os");
const printData = require("../models/printData");

const homeDirectory = os.homedir();
const nautilus_cli_dir_path = `${homeDirectory}/.nautilus-cli`;
const config_file_path = `${nautilus_cli_dir_path}/configFile.json`;

let cluster;
let region;

function remove_Env(option) {
  try {
    var spawn = require("child_process").spawn,
      child;
    //child = spawn("powershell.exe", ["start-process powershell  -verb runas"]);
    child = spawn("powershell.exe", [
      `start-process powershell  -verb runas "[System.Environment]::SetEnvironmentVariable( '${option.name_env}', '',[System.EnvironmentVariableTarget]::Machine)" `,
    ]);
  } catch (err) {
    console.error(err);
  }
  printData.printData(child);
}

function set_Env(option) {
  try {
    var spawn = require("child_process").spawn,
      child;
    //child = spawn("powershell.exe", ["start-process powershell  -verb runas"]);
    child = spawn("powershell.exe", [
      `start-process powershell  -verb runas "[System.Environment]::SetEnvironmentVariable( '${option.name_env}', '${option.value}',[System.EnvironmentVariableTarget]::Machine)" `,
    ]);
  } catch (err) {
    console.error(err);
  }
  printData.printData(child);
}

function switch_to_remote(option) {
  try {
    const fileContents = fs.readFileSync(config_file_path, "utf8");
    ////take from the file config
    const data_configFile = JSON.parse(fileContents);
    const clusters = data_configFile.clusters;
    const regions = data_configFile.regions;
    console.log("remote:", option.remote);
  } catch (err) {
    console.error(err);
  }
}

function switch_to_local(option) {
  try {
    const fileContents = fs.readFileSync(config_file_path, "utf8");
    ////take from the file config
    const data_configFile = JSON.parse(fileContents);
    const clusters = data_configFile.clusters;
    const regions = data_configFile.regions;
    console.log("remote:", option.remote);
  } catch (err) {
    console.error(err);
  }
}

module.exports.switch_to_remote = switch_to_remote;
module.exports.switch_to_local = switch_to_local;
module.exports.set_Env = set_Env;
module.exports.remove_Env = remove_Env;
