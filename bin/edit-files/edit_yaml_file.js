const yaml = require("js-yaml");
const fs = require("fs");
const ast = require("commander");
const chalk = require("chalk");
const clear = require("clear");
const prompt = require("prompt-sync")({ sigint: true });
var spawn = require("child_process").execFileSync,
  child;
const os = require("os");

// const AppConfig = require("./models/AppConfig");
const printData = require("../models/printData");

////const path_yaml = "C:\\Projects\\Js\\lern-js\\my-js-1\\files\\values.yaml";

const homeDirectory = os.homedir();
const ast_cli_dir_path = `${homeDirectory}/.ast-cli`;
const config_file_path = `${ast_cli_dir_path}/configFile.json`;

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

    ////check if we need the change the "tag" to "operator-namespaced-stable-v35";
    // var index = "ast-operator";
    // data[index].image.tag = tag;

    // var index2 = "image";
    // data[index2].tag = tag;
    ////end check "tag"

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

function Update_Url_in_all_components_tags(trafik_url) {
  const fileContents = fs.readFileSync(config_file_path, "utf8");
  ////take path ast-components  from the file config and go to "ast-components\deployment\pu\values.yaml"
  const data_configFile = JSON.parse(fileContents);

  //console.log(path_astComponents);

  //astComponents
  const path_astComponents = data_configFile.astComponents;
 // const path_yaml_astComponents = `${path_astComponents}/deployment/pu/values.yaml`;
  const path_yaml_astComponents = `${path_astComponents}/deployment/dev/values.yaml`;
  //const path_to_up_astComponents = `${path_astComponents}/deployment/pu`;
  const path_to_up_astComponents = `${path_astComponents}/deployment/dev`;
  //astOperator
  const path_astOperator = data_configFile.astOperator;
  const path_yaml_astOperator = `${path_astOperator}/operator-helm-chart/values.yaml`;
  //componenIntegration
  const path_componenIntegration = data_configFile.componenIntegration;
  const path_yaml_componenIntegration = `${path_componenIntegration}/helm/values.yaml`;
  const path_to_up_componenIntegration = `${path_componenIntegration}/helm`;

  // Get document, or throw exception on error
  try {
    // up for astComponents
    const doc = yaml.load(fs.readFileSync(path_yaml_astComponents, "utf8"));
    let data = doc;
    console.log(data);


    var index = "integrations";
    data[index].frontEndUrl = trafik_url;
    data[index].webHookUrl = trafik_url;

    let yamlStr = yaml.dump(data);
    fs.writeFileSync(path_yaml_astComponents, yamlStr, "utf8");
    console.log(chalk.blue(`The file "${path_yaml_astComponents}"`));
    console.log(chalk.green("was successfully updated"));

    ////Change the directory to up astComponents
    process.chdir(path_to_up_astComponents);
    // //after Change the directory can be input command in new directory
    var spawn = require("child_process").spawn,
      child;
    child = spawn("powershell.exe", ["helm upgrade ast ."]);
    printData.printData(child);
/////////////end ast///////////////////////////////////////
//     //up for ast-operator
//     const doc_astOperator = yaml.load(
//       fs.readFileSync(path_yaml_astOperator, "utf8")
//     );
//     let data_astOperator = doc_astOperator;

//     var index = "config";
//     data_astOperator[index].domain = trafik_url;

//     let yamlStr_astOperator = yaml.dump(data_astOperator);
//     fs.writeFileSync(path_yaml_astOperator, yamlStr_astOperator, "utf8");
//     console.log(chalk.blue(`The file "${path_yaml_astOperator}"`));
//     console.log(chalk.green("was successfully updated"));

//     //Change the directory to uo ast operator
//     process.chdir(path_astOperator);
//     // //after Change the directory can be input command in new directory
//     var spawn = require("child_process").spawn,
//       child;
//     child = spawn("powershell.exe", [
//       "helm upgrade operator ./operator-helm-chart",
//     ]);
//     printData.printData(child);
// ////////////////////////end operator///////////////////
//     // up for component-integration
//     const doc_Integration = yaml.load(
//       fs.readFileSync(path_yaml_componenIntegration, "utf8")
//     );
//     let data_Integration = doc_Integration;

//     var index = "integrations";
//     data_Integration.frontEndUrl = trafik_url;
//     data_Integration.webHookUrl = trafik_url;
//     data_Integration.astBaseUri = trafik_url;

//     let yamlStr_Integration = yaml.dump(data_Integration);
//     fs.writeFileSync(
//       path_yaml_componenIntegration,
//       yamlStr_Integration,
//       "utf8"
//     );
//     console.log(chalk.blue(`The file "${path_yaml_componenIntegration}"`));
//     console.log(chalk.green("was successfully updated"));

//     ////Change the directory to component-integration
//     process.chdir(path_to_up_componenIntegration);
//     // //after Change the directory can be input command in new directory
//     var spawn = require("child_process").spawn,
//       child;
//     child = spawn("powershell.exe", ["helm upgrade ast-integration . -i"]);
//     printData.printData(child);
  } catch (e) {
    console.log(e);
  }
}

function Update_Url_in_ast_components_tags_nimrod(trafik_url) {
  const fileContents = fs.readFileSync(config_file_path, "utf8");
  ////take path ast-components  from the file config and go to "ast-components\deployment\pu\values.yaml"
  const data_configFile = JSON.parse(fileContents);

  //console.log(path_astComponents);

  //astComponents
  const path_astComponents = data_configFile.astComponents;
  const path_yaml_astComponents = `${path_astComponents}/platforms/helm/values.yaml`;
  const path_to_up_astComponents = `${path_astComponents}/platforms/helm`;

  // Get document, or throw exception on error
  try {
    // up for astComponents
    const doc = yaml.load(fs.readFileSync(path_yaml_astComponents, "utf8"));
    let data = doc;

    var index = "integrations";
    data[index].frontEndUrl = `"http://${trafik_url}"`;
    data[index].webHookUrl = `"http://${trafik_url}/ast-flow-listener/"`;
    data[index].astBaseUri = `"http://${trafik_url}"`;

    let yamlStr = yaml.dump(data);
    fs.writeFileSync(path_yaml_astComponents, yamlStr, "utf8");
    console.log(chalk.blue(`The file "${path_yaml_astComponents}"`));
    console.log(chalk.green("was successfully updated"));



    fs.writeFile(path_yaml_astComponents, yamlStr,"utf8", (err) => {
      if (err) throw err;
      fs.readdir(path_yaml_astComponents, (err, result) => {
        //console.log(result);
       

         //Change the directory
    process.chdir(path_to_up_astComponents);
    // //after Change the directory can be input command in new directory
    var spawn = require("child_process").spawn,
      child;
  //  child = spawn("powershell.exe", ["git pull; helm dep up;helm install ast ."]);
   child = spawn("powershell.exe", [`helm dep up;helm install ast .;$x=-1; while ($x -le 11) {sleep 5 ;$x=kubectl get pods | findstr ast-core | findstr 1/1 | Measure-Object | %{$_.Count}; if ($x -le 11) {echo "Waiting Pods ast to be created"}}   ;Start-Process -FilePath "C://Program Files (x86)//Google//Chrome//Application//chrome.exe" -ArgumentList '--start-fullscreen "${trafik_url}"'`]);
    printData.printData(child);
  
      });
    });


    ////Change the directory
    // process.chdir(path_to_up_astComponents);
    // // //after Change the directory can be input command in new directory
    // var spawn = require("child_process").spawn,
    //   child;
    // child = spawn("powershell.exe", ["helm dep up"]);
    // printData.printData(child);

   
  } catch (e) {
    console.log(e);
  }
}


function Update_Url_in_all_components_tags_orly(trafik_url) {
  const fileContents = fs.readFileSync(config_file_path, "utf8");
  ////take path ast-components  from the file config and go to "ast-components\deployment\pu\values.yaml"
  const data_configFile = JSON.parse(fileContents);

  //console.log(path_astComponents);

  //astComponents
  const path_astComponents = data_configFile.astComponents;
  const path_yaml_astComponents = `${path_astComponents}/platforms/helm/values.yaml`;
  const path_to_up_astComponents = `${path_astComponents}/platforms/helm`;
  //astOperator
  const path_astOperator = data_configFile.astOperator;
  const path_yaml_astOperator = `${path_astOperator}/operator-helm-chart/values.yaml`;
  //componenIntegration
  const path_componenIntegration = data_configFile.componenIntegration;
  const path_yaml_componenIntegration = `${path_componenIntegration}/helm/values.yaml`;
  const path_to_up_componenIntegration = `${path_componenIntegration}/helm`;

  // Get document, or throw exception on error
  try {
    // up for astComponents
    const doc = yaml.load(fs.readFileSync(path_yaml_astComponents, "utf8"));
    let data = doc;

    var index = "integrations";
    data[index].frontEndUrl = trafik_url;
    data[index].webHookUrl = trafik_url;

    let yamlStr = yaml.dump(data);
    fs.writeFileSync(path_yaml_astComponents, yamlStr, "utf8");
    console.log(chalk.blue(`The file "${path_yaml_astComponents}"`));
    console.log(chalk.green("was successfully updated"));

    // ////Change the directory
    // process.chdir(path_to_up_astComponents);
    // // //after Change the directory can be input command in new directory
    // var spawn = require("child_process").spawn,
    //   child;
    // child = spawn("powershell.exe", ["helm upgrade ast ."]);
    // printData.printData(child);

    ////up for ast-operator

    const doc_astOperator = yaml.load(
      fs.readFileSync(path_yaml_astOperator, "utf8")
    );
    let data_astOperator = doc_astOperator;

    var index = "config";
    data_astOperator[index].domain = trafik_url;

    let yamlStr_astOperator = yaml.dump(data_astOperator);
    fs.writeFileSync(path_yaml_astOperator, yamlStr_astOperator, "utf8");
    console.log(chalk.blue(`The file "${path_yaml_astOperator}"`));
    console.log(chalk.green("was successfully updated"));

    ///
    //Change the directory
    //process.chdir(path_to_up_astComponents);
    // //after Change the directory can be input command in new directory
    // var spawn = require("child_process").spawn,
    //   child;
    // child = spawn("powershell.exe", ["helm upgrade ast ."]);
    // printData.printData(child);

    //// up for component-integration

    const doc_Integration = yaml.load(
      fs.readFileSync(path_yaml_componenIntegration, "utf8")
    );
    let data_Integration = doc_Integration;

    var index = "integrations";
    data_Integration.frontEndUrl = trafik_url;
    data_Integration.webHookUrl = trafik_url;
    data_Integration.astBaseUri = trafik_url;

    let yamlStr_Integration = yaml.dump(data_Integration);
    fs.writeFileSync(
      path_yaml_componenIntegration,
      yamlStr_Integration,
      "utf8"
    );
    console.log(chalk.blue(`The file "${path_yaml_componenIntegration}"`));
    console.log(chalk.green("was successfully updated"));

    // ////Change the directory
    // process.chdir(path_to_up_componenIntegration);
    // // //after Change the directory can be input command in new directory
    // var spawn = require("child_process").spawn,
    //   child;
    // child = spawn("powershell.exe", ["helm upgrade ast-integration . -i"]);
    // printData.printData(child);
  } catch (e) {
    console.log(e);
  }
}
module.exports.Change_Operator_values_Tag = Change_Operator_values_Tag;
module.exports.Update_Url_in_all_components_tags =
  Update_Url_in_all_components_tags;
module.exports.Update_Url_in_all_components_tags_orly =
  Update_Url_in_all_components_tags_orly;

  module.exports.Update_Url_in_ast_components_tags_nimrod =
  Update_Url_in_ast_components_tags_nimrod;
