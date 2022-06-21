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
const fileContents = fs.readFileSync(config_file_path, "utf8");
////take from the file config
const data_configFile = JSON.parse(fileContents);
const clusters = data_configFile.clusters;
const regions = data_configFile.regions;
let cluster;
let region;

function switch_to_remote(option) {
  try {
    console.log("remote:", option.remote);
  } catch (err) {
    console.error(err);
  }
}

function switch_to_local(option) {
  try {
    console.log("remote:", option.remote);
  } catch (err) {
    console.error(err);
  }
}

module.exports.switch_to_remote = switch_to_remote;
module.exports.switch_to_local = switch_to_local;
