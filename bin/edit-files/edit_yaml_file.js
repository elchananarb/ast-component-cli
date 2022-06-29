const yaml = require("js-yaml");
const fs = require("fs");
const nautilus = require("commander");
const chalk = require("chalk");
const clear = require("clear");
const prompt = require("prompt-sync")({ sigint: true });
var spawn = require("child_process").execFileSync,
  child;
const os = require("os");

// const AppConfig = require("./models/AppConfig");
// const printData = require("./models/printData.js");

////const path_yaml = "C:\\Projects\\Js\\lern-js\\my-js-1\\files\\values.yaml";

const homeDirectory = os.homedir();
const nautilus_cli_dir_path = `${homeDirectory}/.nautilus-cli`;
const config_file_path = `${nautilus_cli_dir_path}/configFile.json`;

////take cluster name from the file config
function Change_Operator_values_Tag() {
  const fileContents = fs.readFileSync(config_file_path, "utf8");
  ////take from the file config
  const data_configFile = JSON.parse(fileContents);
  const path_astOperator = data_configFile.astOperator;
  const tag = "operator-namespaced-stable-v35";
  const port = "8080";
  const username = data_configFile.username;
  const jfrogToken = data_configFile.jfrogToken;

  //console.log(path_astOperator);

  const path_yaml_astOperator = `${path_astOperator}/operator-helm-chart/values.yaml`;

  // Get document, or throw exception on error
  try {
    const doc = yaml.load(fs.readFileSync(path_yaml_astOperator, "utf8"));
    let data = doc;

    var index = "ast-operator";
    data[index].image.tag = tag;

    var index2 = "image";
    data[index2].tag = tag;

    var index3 = "config";
    data[index3].port = port;

    var index4 = "imagePullSecretJfrog";
    data[index4].email = username;
    data[index4].username = username;
    data[index4].password = jfrogToken;

    let yamlStr = yaml.dump(data);
    fs.writeFileSync(path_yaml_astOperator, yamlStr, "utf8");
    console.log(chalk.blue(`The file "${path_yaml_astOperator}"`));
    console.log(chalk.green("was successfully updated"));
  } catch (e) {
    console.log(e);
  }
}
module.exports.Change_Operator_values_Tag = Change_Operator_values_Tag;
