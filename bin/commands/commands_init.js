const yaml = require("js-yaml");
const fs = require("fs");
const nautilus = require("commander");
const chalk = require("chalk");
const clear = require("clear");
const prompt = require("prompt-sync")({ sigint: true });
var spawn = require("child_process").execFileSync,
  child;
const os = require("os");

// const AppConfig = require("../models/AppConfig");
const printData = require("../models/printData");

////const path_yaml = "C:\\Projects\\Js\\lern-js\\my-js-1\\files\\values.yaml";
const homeDirectory = os.homedir();
const nautilus_cli_dir_path = `${homeDirectory}/.nautilus-cli`;
const config_file_path = `${nautilus_cli_dir_path}/configFile.json`;

const fileContents = fs.readFileSync(config_file_path, "utf8");
////take from the file config
const data_configFile = JSON.parse(fileContents);

function Install_Operator() {
  try {
    ////take path_astOperator from the data_configFile from the file config
    const path_astOperator = data_configFile.astOperator;
    ////Change the directory
    process.chdir(path_astOperator);
    // //after Change the directory can be input command in new directory
    var spawn = require("child_process").spawn,
      child;
    child = spawn("powershell.exe", [
      "helm upgrade operator ./operator-helm-chart -i",
    ]);
  } catch (err) {
    console.error(err);
  }
  printData.printData(child);
}

function Install_Ast_Components() {
  try {
    ////take path_astComponents from the data_configFile from the file config
    const path_astComponents = data_configFile.astComponents;
    ////Change the directory
    process.chdir(path_astComponents);
    // //after Change the directory can be input command in new directory
    var spawn = require("child_process").spawn,
      child;
    child = spawn("powershell.exe", [
      "git checkout  pu-deployment; cd .\\deployment\\pu\\;helm dep up; helm upgrade ast . -i",
    ]);
  } catch (err) {
    console.error(err);
  }
  printData.printData(child);
}

function Install_Metrics_Components() {
  try {
    ////take path_componentMetrics from the data_configFile from the file config
    const path_componentMetrics = data_configFile.componentMetrics;
    ////Change the directory
    process.chdir(path_componentMetrics);
    // //after Change the directory can be input command in new directory
    var spawn = require("child_process").spawn,
      child;
    child = spawn("powershell.exe", ["cd helm; helm upgrade ast-metrics . -i"]);
  } catch (err) {
    console.error(err);
  }
  printData.printData(child);
}

function Install_the_Policy_Management_Component() {
  try {
    ////take path_componentPolicyManagement from the data_configFile from the file config
    const path_componentPolicyManagement =
      data_configFile.componentPolicyManagement;
    ////Change the directory
    process.chdir(path_componentPolicyManagement);
    // //after Change the directory can be input command in new directory
    var spawn = require("child_process").spawn,
      child;
    child = spawn("powershell.exe", [
      "cd helm; helm upgrade policy-management . -i",
    ]);
  } catch (err) {
    console.error(err);
  }
  printData.printData(child);
}

function Get_Traefik_url() {
  try {
    var spawn = require("child_process").spawn,
      child;
    child = spawn("powershell.exe", ["kubectl get svc | findstr traefik"]);
  } catch (err) {
    console.error(err);
  }
  printData.printData(child);
}

function Update_Url_in_all_components_tags() {
  var scriptOutput = "";
  console.log("jhh");
  try {
    var spawn = require("child_process").spawn,
      child;

    child = spawn("powershell.exe", ["kubectl get svc | findstr traefik"]);
    child.stdout.setEncoding("utf8");

    child.stdout.on("data", function (data) {
      //Here is where the output goes
      //console.log(chalk.green(data));
      data = data.toString();
      console.log(data);
      scriptOutput += data;
    });

    child.stderr.setEncoding("utf8");
    child.stderr.on("data", function (data) {
      //Here is where the error output goes
      console.log("stderr: " + data);
      data = data.toString();
      scriptOutput += data;
    });

    child.on("exit", function () {
      //console.log(scriptOutput);
      after();
      console.log(scriptOutput);
    });
    child.stdin.end();
  } catch (err) {
    console.error(err);
  }
  //printData.printData(child);
}

function after() {
  var spawn = require("child_process").spawn,
    child;
  child = spawn("powershell.exe", ["kubectl get svc | findstr traefik"]);
}

module.exports.Install_Operator = Install_Operator;
module.exports.Install_Ast_Components = Install_Ast_Components;
module.exports.Install_Metrics_Components = Install_Metrics_Components;
module.exports.Install_the_Policy_Management_Component =
  Install_the_Policy_Management_Component;
module.exports.Get_Traefik_url = Get_Traefik_url;
module.exports.Update_Url_in_all_components_tags =
  Update_Url_in_all_components_tags;
