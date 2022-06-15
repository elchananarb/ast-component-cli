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

function Switched_context() {
  try {
    ////take from the file config
    ////take cluster name from the file config
    console.log(chalk.green("Please choose the cluster to context \n"));
    clusters.forEach(myFunction);
    function myFunction(item, index, arr) {
      console.log(
        chalk.blue(`To context a cluster for ${item} enter ${index}`)
      );
    }
    let cluster = prompt();

    console.log(chalk.green("Please choose  region \n"));
    regions.forEach(myFunction);
    function myFunction(item, index, arr) {
      console.log(chalk.blue(`To context a cluster in ${item} enter ${index}`));
    }
    let region = prompt();

    var spawn = require("child_process").spawn,
      child;
    child = spawn("powershell.exe", [
      `eksctl delete cluster -n ${clusters[cluster]} -r ${regions[region]} --profile default`,
    ]);
  } catch (err) {
    console.error(err);
  }
  printData.printData(child);
}

async function create_cluster() {
  try {
    console.log(chalk.green("Please choose the cluster to create \n"));
    clusters.forEach(myFunction);
    function myFunction(item, index, arr) {
      console.log(chalk.blue(`To create a cluster for ${item} enter ${index}`));
    }
    cluster = prompt();
    console.log(chalk.green("Please choose  region \n"));
    regions.forEach(myFunction);
    function myFunction(item, index, arr) {
      console.log(
        chalk.blue(`To create a cluster name ${item} enter ${index}`)
      );
    }
    region = prompt();

    var spawn = require("child_process").spawn,
      child;
    child = spawn("powershell.exe", [
      `eksctl create cluster --name ${clusters[cluster]} --region ${regions[region]} --node-type t3.large --nodes 2 --nodes-min 1 --nodes-max 3 --profile default `,
    ]);
  } catch (err) {
    console.error(err);
  }

  printData.printData_try_promise(child).then((result) => {
    if (result.includes("AWS STS access")) {
      console.log(
        "Need to take CREDENTIALS for this action 'AWS' Please confirm taking a token"
      );
      var spawn = require("child_process").spawn,
        child;
      child = spawn("powershell.exe", [
        `aws sso login --profile default; eksctl create cluster --name ${clusters[cluster]} --region ${regions[region]} --node-type t3.large --nodes 2 --nodes-min 1 --nodes-max 3 --profile default `,
      ]);
      printData.printData();
    }
  });
  //printData.printData_try_promise(child);
  // console.log(scriptOutput);

  //   if (scriptOutput.includes("checking AWS STS access")) {
  //     console.log("pppppppppppppppppppp");
  //   }
}

// function myFunction(item, index, arr) {
//   if (item.includes("@")) {
//     //console.log(index + "for" + item);
//     arry_context += item;
//   }
// }
module.exports.Switched_context = Switched_context;
module.exports.create_cluster = create_cluster;
