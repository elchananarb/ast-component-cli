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
const { exit } = require("process");

const homeDirectory = os.homedir();
const nautilus_cli_dir_path = `${homeDirectory}/.nautilus-cli`;
const config_file_path = `${nautilus_cli_dir_path}/configFile.json`;
let itemsProcessed_name_cluster = 0;

let cluster;
let region;
function Create_local_components_clusterA() {
  // Create_local_components_clusterB().then((resultB) => {
  //   console.log(resultB);
  //   console.log("BBBBB");

  Create_local_components_clusterC().then((resultC) => {
    console.log(resultC);
    console.log("CCCC");
  });
  // });
}

function Create_local_components_clusterC() {
  let myPromise = new Promise((resolve, reject) => {
    //try {
    if (!fs.existsSync(nautilus_cli_dir_path)) {
      create_dir_nautilus_cli();
    }
    //const fileContents = fs.readFileSync(config_file_path, "utf8");
    ////take from the file config
    //const data_configFile = JSON.parse(fileContents);
    let username = "";
    let password = "";
    if (fs.existsSync(config_file_path)) {
      fileContents = fs.readFileSync(config_file_path, "utf8");
      ////take from the file config
      data_configFile = JSON.parse(fileContents);

      username = data_configFile.username;
      password = data_configFile.jfrogToken;

      var spawn = require("child_process").spawn,
        child;
      child = spawn("powershell.exe", [
        `docker login --username ${username} --password ${password} https://checkmarx.jfrog.io/artifactory/docker ; 
        helm repo remove ast;
         helm repo add ast https://checkmarx.jfrog.io/artifactory/ast-helm/ --username ${username} --password ${password} ;
         helm repo update;
         helm upgrade operator --install --create-namespace --namespace default ast/operator-helm-chart --set config.domain=127.0.0.1 --set-string config.port="8080" --set imagePullSecretJfrog.username=${username} --set imagePullSecretJfrog.password=${password} --set imagePullSecretJfrog.email=${username};
         	kubectl patch sa default -n default -p '"imagePullSecrets": [{"name": "regcred" }]';
      	helm upgrade --install platform ast/platform-local;$x=1; while ($x -le 5 ) {sleep 2 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting Pods to be created"}};
        helm upgrade --install core ast/core;$x=1; while ($x -le 20 ) {sleep 2 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting Pods to be created"}};
        helm upgrade --install sast ast/sast;$x=1; while ($x -le 30 ) {sleep 2 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting Pods to be created"}};
        ;$x=1; while ($x -ge 25 ) {sleep 2 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "We'm almost done! wait for all the pods to run"}};
        helm upgrade --install kics ast/kics;
        helm upgrade --install sca ast/sca;
        helm upgrade --install ast-metrics ast/ast-metrics-management;
        helm upgrade --install ast-integrations ast/integrations;
        $x=1; while ($x -le 65 ) {sleep 2 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting Pods to be created"}}`,
      ]);
      //עשיתיח תנאי למעלה אפשר למחור  להוסיף תנאי שאם אין מספיק פודים שלר ימשיך הלאה ואם כם יחזיר את הריסולב

      resolve("ddd");
    }
    // } catch (err) {
    //   console.error(err);
    //   reject();
    // }
    printData.printData(child);
  });
  return myPromise;
}
function Create_local_components_cluster_orly_without_metrics_And_integretions() {
  // let myPromise = new Promise((resolve, reject) => {
  //try {
  if (!fs.existsSync(nautilus_cli_dir_path)) {
    create_dir_nautilus_cli();
  }
  //const fileContents = fs.readFileSync(config_file_path, "utf8");
  ////take from the file config
  //const data_configFile = JSON.parse(fileContents);
  let username = "";
  let password = "";
  if (fs.existsSync(config_file_path)) {
    fileContents = fs.readFileSync(config_file_path, "utf8");
    ////take from the file config
    data_configFile = JSON.parse(fileContents);

    username = data_configFile.username;
    password = data_configFile.jfrogToken;

    var spawn = require("child_process").spawn,
      child;
    child = spawn("powershell.exe", [
      `docker login --username ${username} --password ${password} https://checkmarx.jfrog.io/artifactory/docker ; 
         helm repo remove ast;
         helm repo add ast https://checkmarx.jfrog.io/artifactory/ast-helm/ --username ${username} --password ${password} ;
         helm repo update;
         helm upgrade operator --install --create-namespace --namespace default ast/operator-helm-chart --set config.domain=127.0.0.1 --set-string config.port="8080" --set imagePullSecretJfrog.username=${username} --set imagePullSecretJfrog.password=${password} --set imagePullSecretJfrog.email=${username};
         	kubectl patch sa default -n default -p '"imagePullSecrets": [{"name": "regcred" }]';
      	helm upgrade --install platform ast/platform-local;$x=1; while ($x -le 5 ) {sleep 2 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting Pods to be created"}};
        helm upgrade --install core ast/core;$x=1; while ($x -le 20 ) {sleep 2 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting Pods to be created"}};
        helm upgrade --install sast ast/sast;$x=1; while ($x -le 30 ) {sleep 2 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting Pods to be created"}};
        ;$x=1; while ($x -ge 25 ) {sleep 2 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "We'm almost done! wait for all the pods to run"}};
        helm upgrade --install kics ast/kics;
        helm upgrade --install sca ast/sca;
        $x=1; while ($x -le 45 ) {sleep 2 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting Pods to be created"}}`,
    ]);
    //עשיתיח תנאי למעלה אפשר למחור  להוסיף תנאי שאם אין מספיק פודים שלר ימשיך הלאה ואם כם יחזיר את הריסולב

    //resolve("ddd");
  }

  // } catch (err) {
  //   console.error(err);
  //   reject();
  // }
  printData.printData(child);
  //});
  //return myPromise;
}

function uninstall_all() {
  var spawn = require("child_process").spawn,
    child;
  child = spawn("powershell.exe", [
    "helm del sast; helm del kiks; helm del core; helm del platform; helm del operator ;helm del ast-integrations ;helm del  ast-metrics",
  ]);
  printData.printData(child);
}

function Create_local_components_clusterB() {
  let myPromise = new Promise((resolve, reject) => {
    // try {
    if (!fs.existsSync(nautilus_cli_dir_path)) {
      create_dir_nautilus_cli();
    }
    //const fileContents = fs.readFileSync(config_file_path, "utf8");
    ////take from the file config
    //const data_configFile = JSON.parse(fileContents);

    if (fs.existsSync(config_file_path)) {
      fileContents = fs.readFileSync(config_file_path, "utf8");
      ////take from the file config
      data_configFile = JSON.parse(fileContents);

      ////take k3d Path from the data_configFile from the file config
      const k3dPath = data_configFile.k3dPath;
      ////Change the directory
      process.chdir(k3dPath);

      var spawn = require("child_process").spawn,
        child;
      child = spawn("powershell.exe", [
        'k3d cluster create dev --image rancher/k3s:v1.20.15-k3s1 --k3s-server-arg "--disable=traefik" -p="8080:80@server[0]"',
      ]);
      resolve("ddd");
    }
    // } catch (err) {
    //   console.error(err);
    //   reject();
    // }
    printData.printData(child);
  });
  return myPromise;
}

function Switched_context_sso() {
  try {
    const fileContents = fs.readFileSync(config_file_path, "utf8");
    ////take from the file config
    const data_configFile = JSON.parse(fileContents);
    const clusters = data_configFile.clusters;
    const regions = data_configFile.regions;
    ////take from the file config
    ////take cluster name from the file config
    console.log(chalk.green("Please choose the cluster to context \n"));
    clusters.forEach(myFunction_choose_cluster);
    function myFunction_choose_cluster(item, index, arr) {
      console.log(
        chalk.blue(`To context a cluster for ${item} enter ${index}`)
      );
    }
    let cluster = prompt();

    console.log(chalk.green("Please choose  region \n"));
    regions.forEach(myFunction_choose_region);
    function myFunction_choose_region(item, index, arr) {
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

function create_cluster() {
  try {
    itemsProcessed_name_cluster = 0;
    const fileContents = fs.readFileSync(config_file_path, "utf8");
    ////take from the file config
    const data_configFile = JSON.parse(fileContents);
    const clusters = data_configFile.clusters;
    console.log(chalk.green("Please choose the cluster to create \n"));
    clusters.forEach(myFunction_choose_cluster);

    function myFunction_choose_cluster(item, index, arr) {
      console.log(
        chalk.blue(`To createggg a cluster for ${item} enter ${index}`)
      );
      itemsProcessed_name_cluster += 1;
      //console.log(itemsProcessed_name_cluster);
      //console.log(arr.length);

      if (itemsProcessed_name_cluster === arr.length) {
        console.log(
          chalk.green(`To add a new "cluster name" enter ${index + 1}`)
        );
      }
    }
    let index_cluster = prompt();
    let name_cluster = clusters[index_cluster];
    if (index_cluster == clusters.length) {
      console.log(chalk.blue(`Please enter the name of cluster`));
      name_cluster = prompt();
    }
    // console.log("llllllllllllll");
    // console.log(name_cluster);

    const regions = data_configFile.regions;
    console.log(chalk.green("Please choose  region \n"));
    regions.forEach(myFunction_choose_region);
    function myFunction_choose_region(item, index, arr) {
      console.log(chalk.blue(`To create a cluster in ${item} enter ${index}`));
    }
    let region = prompt();

    var spawn = require("child_process").spawn,
      child;
    child = spawn("powershell.exe", [
      `eksctl create cluster --name ${name_cluster} --region ${regions[region]} --node-type t3.large --nodes 2 --nodes-min 1 --nodes-max 3`,
    ]);
  } catch (err) {
    console.error(err);
  }
  printData.printData(child);
}

function delete_cluster() {
  //const fileContents = fs.readFileSync("./configFile.json", "utf8");
  try {
    const fileContents = fs.readFileSync(config_file_path, "utf8");
    ////take from the file config
    const data_configFile = JSON.parse(fileContents);
    const clusters = data_configFile.clusters;
    const regions = data_configFile.regions;
    ////take cluster name from the file config
    console.log(chalk.green("Please choose the cluster to delete \n"));
    clusters.forEach(myFunction_choose_cluster);
    function myFunction_choose_cluster(item, index, arr) {
      console.log(chalk.blue(`To delete a cluster for ${item} enter ${index}`));
    }
    let cluster = prompt();

    console.log(chalk.green("Please choose  region \n"));
    regions.forEach(myFunction_choose_region);
    function myFunction_choose_region(item, index, arr) {
      console.log(chalk.blue(`To delete a cluster in ${item} enter ${index}`));
    }
    let region = prompt();

    var spawn = require("child_process").spawn,
      child;
    child = spawn("powershell.exe", [
      `eksctl delete cluster -n ${clusters[cluster]} -r ${regions[region]}`,
    ]);
  } catch (err) {
    console.error(err);
  }
  printData.printData(child);
}

function Get_current_context() {
  try {
    const fileContents = fs.readFileSync(config_file_path, "utf8");
    ////take from the file config
    const data_configFile = JSON.parse(fileContents);
    const clusters = data_configFile.clusters;
    const regions = data_configFile.regions;
    ////take from the file config

    var spawn = require("child_process").spawn,
      child;
    child = spawn("powershell.exe", [`kubectl config current-context`]);
  } catch (err) {
    console.error(err);
  }
  printData.printData(child);
}

function get_contexts() {
  //const fileContents = fs.readFileSync("./configFile.json", "utf8");
  try {
    const fileContents = fs.readFileSync(config_file_path, "utf8");
    ////take from the file config
    const data_configFile = JSON.parse(fileContents);
    const clusters = data_configFile.clusters;
    const regions = data_configFile.regions;
    ////take from the file config

    var spawn = require("child_process").spawn,
      child;
    child = spawn("powershell.exe", [`kubectl config get-contexts`]);
  } catch (err) {
    console.error(err);
  }
  printData.printData(child);
}
function Connect_cluster() {
  try {
    itemsProcessed_name_cluster = 0;

    const fileContents = fs.readFileSync(config_file_path, "utf8");
    ////take from the file config
    const data_configFile = JSON.parse(fileContents);
    ////take cluster name from the file config
    const clusters = data_configFile.clusters;
    console.log(chalk.green("Please choose the cluster to Connect \n"));
    clusters.forEach(myFunction_choose_cluster);

    function myFunction_choose_cluster(item, index, arr) {
      console.log(
        chalk.blue(`To Connect a cluster for ${item} enter ${index}`)
      );
      itemsProcessed_name_cluster += 1;
      //console.log(itemsProcessed_name_cluster);
      //console.log(arr.length);

      if (itemsProcessed_name_cluster === arr.length) {
        console.log(
          chalk.green(`To Connect a new "cluster name" enter ${index + 1}`)
        );
      }
    }
    let index_cluster = prompt();
    let name_cluster = clusters[index_cluster];
    if (index_cluster == clusters.length) {
      console.log(chalk.blue(`Please enter the name of cluster`));
      name_cluster = prompt();
    }
    // console.log("llllllllllllll");
    // console.log(name_cluster);

    const regions = data_configFile.regions;
    console.log(chalk.green("Please choose  region \n"));
    regions.forEach(myFunction_choose_region);
    function myFunction_choose_region(item, index, arr) {
      console.log(chalk.blue(`To create a cluster in ${item} enter ${index}`));
    }
    let region = prompt();

    var spawn = require("child_process").spawn,
      child;
    child = spawn("powershell.exe", [
      `eksctl utils write-kubeconfig --cluster=${name_cluster} --region ${regions[region]}`,
    ]);
  } catch (err) {
    console.error(err);
  }
  printData.printData(child);
}

async function create_cluster_sso() {
  try {
    const fileContents = fs.readFileSync(config_file_path, "utf8");
    ////take from the file config
    const data_configFile = JSON.parse(fileContents);
    const clusters = data_configFile.clusters;
    const regions = data_configFile.regions;
    console.log(chalk.green("Please choose the cluster to create \n"));
    clusters.forEach(myFunction_choose_cluster);
    function myFunction_choose_cluster(item, index, arr) {
      console.log(chalk.blue(`To create a cluster for ${item} enter ${index}`));
    }
    cluster = prompt();
    console.log(chalk.green("Please choose  region \n"));
    regions.forEach(myFunction_choose_region);
    function myFunction_choose_region(item, index, arr) {
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
    const fileContents = fs.readFileSync(config_file_path, "utf8");
    ////take from the file config
    const data_configFile = JSON.parse(fileContents);
    const clusters = data_configFile.clusters;
    const regions = data_configFile.regions;
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
}

async function delete_cluster_sso() {
  const fileContents = fs.readFileSync(config_file_path, "utf8");
  ////take from the file config
  const data_configFile = JSON.parse(fileContents);
  const clusters = data_configFile.clusters;
  const regions = data_configFile.regions;
  //const fileContents = fs.readFileSync("./configFile.json", "utf8");
  try {
    ////take from the file config

    console.log(chalk.green("Please choose the cluster to delete \n"));
    clusters.forEach(myFunction_choose_cluster);
    function myFunction_choose_cluster(item, index, arr) {
      console.log(chalk.blue(`To delete a cluster for ${item} enter ${index}`));
    }
    let cluster = prompt();

    const regions = data_configFile.regions;
    console.log(chalk.green("Please choose  region \n"));
    regions.forEach(myFunction_choose_region);
    function myFunction_choose_region(item, index, arr) {
      console.log(chalk.blue(`To delete a cluster in ${item} enter ${index}`));
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
  printData.printData_try_promise(child).then((result) => {
    const fileContents = fs.readFileSync(config_file_path, "utf8");
    ////take from the file config
    const data_configFile = JSON.parse(fileContents);
    const clusters = data_configFile.clusters;
    const regions = data_configFile.regions;
    if (result.includes("AWS STS access")) {
      console.log(
        "Need to take CREDENTIALS for this action 'AWS' Please confirm taking a token"
      );
      var spawn = require("child_process").spawn,
        child;
      child = spawn("powershell.exe", [
        `aws sso login --profile default; eksctl delete cluster -n ${clusters[cluster]} -r ${regions[region]} --profile default `,
      ]);
      printData.printData();
    } else {
      console.log(result);
    }
  });
}
module.exports.Switched_context_sso = Switched_context_sso;
module.exports.create_cluster_sso = create_cluster_sso;
module.exports.delete_cluster_sso = delete_cluster_sso;
module.exports.create_cluster = create_cluster;
module.exports.uninstall_all = uninstall_all;
module.exports.delete_cluster = delete_cluster;
module.exports.Get_current_context = Get_current_context;
module.exports.get_contexts = get_contexts;
module.exports.Create_local_components_clusterA =
  Create_local_components_clusterA;
module.exports.Create_local_components_clusterB =
  Create_local_components_clusterB;

module.exports.Connect_cluster = Connect_cluster;
module.exports.Create_local_components_cluster_orly_without_metrics_And_integretions =
  Create_local_components_cluster_orly_without_metrics_And_integretions;
