const yaml = require("js-yaml");
const fs = require("fs");
const ast = require("commander");
const chalk = require("chalk");
const clear = require("clear");
const prompt = require("prompt-sync")({ sigint: true });
var spawn = require("child_process").execFileSync,
  child;
const os = require("os");

// const AppConfig = require("../models/AppConfig");
const printData = require("../models/printData");
const edit_yaml_file = require("../edit-files/edit_yaml_file");

////const path_yaml = "C:\\Projects\\Js\\lern-js\\my-js-1\\files\\values.yaml";
const homeDirectory = os.homedir();
const ast_cli_dir_path = `${homeDirectory}/.ast-cli`;
const config_file_path = `${ast_cli_dir_path}/configFile.json`;

////take from the file config


function Login_to_Docker_in_init_file() {
  //problem if not exisit
  try {
    //const fileContents = fs.readFileSync("./configFile.json", "utf8");
    const fileContents = fs.readFileSync(
      `${homeDirectory}/.ast-cli/configFile.json`,
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
      helm repo remove ast;
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
function Install_Operator() {
  try {
    const fileContents = fs.readFileSync(config_file_path, "utf8");
    const data_configFile = JSON.parse(fileContents);

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
    const fileContents = fs.readFileSync(config_file_path, "utf8");
    const data_configFile = JSON.parse(fileContents);

    ////take path_astComponents from the data_configFile from the file config
    const path_astComponents = data_configFile.astComponents;
    ////Change the directory
    process.chdir(path_astComponents);
    // //after Change the directory can be input command in new directory
    var spawn = require("child_process").spawn,
      child;
      
    child = spawn("powershell.exe", [
      "git checkout add-local-deplyment; cd .\\deployment\\dev\\;helm dep up; helm upgrade ast . -i",
    ]);

      // child = spawn("powershell.exe", [
    //   "git checkout  pu-deployment; cd .\\deployment\\pu\\;helm dep up; helm upgrade ast . -i",
      
    // ]);
  } catch (err) {
    console.error(err);
  }
  printData.printData(child);
}
function unInstall_Operator() {
  try {
    const fileContents = fs.readFileSync(config_file_path, "utf8");
    const data_configFile = JSON.parse(fileContents);

    ////take path_astOperator from the data_configFile from the file config
    const path_astOperator = data_configFile.astOperator;
    ////Change the directory
    process.chdir(path_astOperator);
    // //after Change the directory can be input command in new directory
    var spawn = require("child_process").spawn,
      child;
    child = spawn("powershell.exe", ["helm uninstall operator"]);
  } catch (err) {
    console.error(err);
  }
  printData.printData(child);
}

function Install_Metrics_Components() {
  try {
    const fileContents = fs.readFileSync(config_file_path, "utf8");
    const data_configFile = JSON.parse(fileContents);

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
    const fileContents = fs.readFileSync(config_file_path, "utf8");
    const data_configFile = JSON.parse(fileContents);

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

function Get_Traefik_url2() {
  
}

function Get_Traefik_url2B() {

  let myPromise = new Promise((resolve, reject) => {
    //try {
    const fileContents = fs.readFileSync(config_file_path, "utf8");
    const data_configFile = JSON.parse(fileContents);

    var spawn = require("child_process").spawn,
      child;
    child = spawn("powershell.exe", ["kubectl get svc | findstr traefik"]);
    // } catch (err) {
    //   console.error(err);
    // }

    //printData.printData(child);
    var trafik = extract_all_trafik_A(child);
   // if (typeof trafik == "undefined") {
     
      resolve(trafik);
   // }
  });
  return myPromise;
  
}


function Get_Traefik_url() {
  let myPromise = new Promise((resolve, reject) => {
    //try {
    const fileContents = fs.readFileSync(config_file_path, "utf8");
    const data_configFile = JSON.parse(fileContents);

    var spawn = require("child_process").spawn,
      child;
    child = spawn("powershell.exe", ["kubectl get svc | findstr traefik"]);
    // } catch (err) {
    //   console.error(err);
    // }

    //printData.printData(child);
    var trafik = extract_all_trafik_A(child);
   // if (typeof trafik == "undefined") {
     
      resolve(trafik);
   // }
  });
  return myPromise;
}
var traefik = "";
var traefik2 = "";
function Update_Url_in_all_components_tags(trafik_for_up) {
  edit_yaml_file.Update_Url_in_all_components_tags(trafik_for_up);
}
function Update_Url_in_all_components_tags_not_work_check() {
  Get_Traefik_url().then((trafik_for_up) => {
    console.log("ocell");
    console.log(trafik_for_up);
    edit_yaml_file.Update_Url_in_all_components_tags(trafik_for_up);
  });
}
function Update_Url_in_all_components_tags_orly() {
  Get_Traefik_url().then((trafik_for_up) => {
    edit_yaml_file.Update_Url_in_all_components_tags_orly(trafik_for_up);
  });
}

function extract_all_trafik_A(child) {

  let myPromise = new Promise((resolve, reject) => {

  // console.log("extract_all_trafik_A");
  var scriptOutput = "";
  child.stdout.setEncoding("utf8");
  child.stdout.on("data", function (data) {
    //Here is where the output goes
    traefik = data;
    traefik2 = data.toString();

    val = traefik.replace(/\s\s+/g, " ");
    //console.log(val);
    arry_traefik = val.split(" ");
    //console.log(arry_traefik);
  });

  child.stderr.setEncoding("utf8");
  child.stderr.on("data", function (data) {
    //Here is where the error output goes
    console.log("stderr: " + data);
    data = data.toString();
    scriptOutput += data;
  });
  child.on("exit", function () {
    let url= extract_trafik(arry_traefik);
    resolve(url);
  });
  child.stdin.end();
 });
 return myPromise;
}

function extract_trafik(arry_traefik) {
  url_trafik = arry_traefik[3];
  console.log(chalk.green(url_trafik));
  return url_trafik;
  //edit_yaml_file.Update_Url_in_all_components_tags(url_trafik);
}
function to_delete_check_test_cli(arry_traefik) {
  return arry_traefik;
}
module.exports.Install_Operator = Install_Operator;
module.exports.unInstall_Operator = unInstall_Operator;
module.exports.Install_Ast_Components = Install_Ast_Components;
module.exports.Install_Metrics_Components = Install_Metrics_Components;
module.exports.Install_the_Policy_Management_Component =
  Install_the_Policy_Management_Component;
module.exports.Get_Traefik_url = Get_Traefik_url;
module.exports.Update_Url_in_all_components_tags =
  Update_Url_in_all_components_tags;
module.exports.Update_Url_in_all_components_tags_orly =
  Update_Url_in_all_components_tags_orly;
module.exports.to_delete_check_test_cli = to_delete_check_test_cli;
module.exports.Login_to_Docker_in_init_file = Login_to_Docker_in_init_file;
module.exports.extract_all_trafik_A = extract_all_trafik_A;
