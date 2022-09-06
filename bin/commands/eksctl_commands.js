const yaml = require("js-yaml");
const fs = require("fs");
const ast = require("commander");
const chalk = require("chalk");
const clear = require("clear");
const prompt = require("prompt-sync")({ sigint: true });
var spawn = require("child_process").execFileSync,
  child;
const os = require("os");
const printData = require("../models/printData");
const commands_init = require("./commands_init");
const edit_yaml_file = require("../edit-files/edit_yaml_file");
const { exit } = require("process");

const homeDirectory = os.homedir();
const ast_cli_dir_path = `${homeDirectory}/.ast-cli`;
const config_file_path = `${ast_cli_dir_path}/configFile.json`;
let itemsProcessed_name_cluster = 0;

function Ast_Components_Installation_AWS_Nimrod() {

   Ast_Components_Installation_AWS_Nimrod2().then((nating) => {
   console.log("befor");
     Get_Traefik_url_local().then((child ) => {
      console.log("after");
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
    let url= arry_traefik[3];
   //console.log(arry_traefik[3]);
   re_nstallation_Nimrod3_ast_oprator(url);
  });
  child.stdin.end();
 });
});

 }
 
 function  re_nstallation_Nimrod3_ast_oprator(cluster_url){
  console.log(cluster_url);
  if (!fs.existsSync(ast_cli_dir_path)) {
    create_dir_ast_cli();
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
    const path_astComponents = data_configFile.astComponents;
    process.chdir(path_astComponents);

    var spawn = require("child_process").spawn,
      child;

      //child = spawn("powershell.exe",["ls"]);

   child = spawn("powershell.exe", [ `helm upgrade --install ast-operator ast/operator-helm-chart --set config.domain="${cluster_url}" --set config.enableTLS="false"  --set-string config.port=8080 --set config.protocol="http" --set config.disableResourcesAndRequestLimit="true" --set imagePullSecretJfrog.registry="https://checkmarx.jfrog.io" --set imagePullSecrets="regcred" --set imagePullSecretJfrog.username=${username} --set imagePullSecretJfrog.password=${password} --set imagePullSecretJfrog.email=${username};$x=-1; while ($x -le 0) {sleep 5 ;$x=kubectl get pods | findstr ast-operator | findstr 2/2 | Measure-Object | %{$_.Count}; if ($x -le 0) {echo "Waiting Pods ast-operator to be created"}};`,]);
   //  זה בדיקה של אנינסטל לראות שזה באמת הוסר הורדתי את זה  helm uninstall ast-operator;$x=250; while ($x -ge 9 ) {sleep 50 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting until the Pod ast-operator deleted"}};
//      זה בדיקה של ינסטל אופרטור בהתחלה אני מוריד את הבדיקה כי הוא מתקין לי את אופרטוק ישירות  ת helm upgrade --install ast-operator ast/operator-helm-chart --set config.domain="127.0.0.1" --set config.enableTLS="false"  --set-string config.port=8080 --set config.protocol="http" --set config.disableResourcesAndRequestLimit="true" --set imagePullSecretJfrog.registry="https://checkmarx.jfrog.io" --set imagePullSecrets="regcred" --set imagePullSecretJfrog.username=${username} --set imagePullSecretJfrog.password=${password} --set imagePullSecretJfrog.email=${username};$x=0; while ($x -le 1  ) {sleep 30 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting Pods ast-operator to be created"}};

    //עשיתיח תנאי למעלה אפשר למחור  להוסיף תנאי שאם אין מספיק פודים שלר ימשיך הלאה ואם כם יחזיר את הריסולב


    child.stdout.setEncoding("utf8");
    child.stdout.on("data", function (data) {
      data_for_create_dev += data;
      arry_context_for_create_dev += data;
    });

    child.stderr.setEncoding("utf8");
    child.stderr.on("data", function (data) {
      console.log("stderr: " + data);
      data = data.toString();
      data_for_create_dev += data;
    });

    child.on("exit", function () {
      Update_Url_in_ast_components(cluster_url)

    });
    child.stdin.end();
  }
  printData.printData(child);

 }

 function Ast_Components_Installation_AWS_Nimrod2() {
 
   let myPromise = new Promise((resolve, reject) => {
     //try {
     if (!fs.existsSync(ast_cli_dir_path)) {
       create_dir_ast_cli();
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
       const path_astComponents = data_configFile.astComponents;
       process.chdir(path_astComponents);
 
       var spawn = require("child_process").spawn,
         child;
 
       child = spawn("powershell.exe", [
         `docker login --username ${username} --password ${password} https://checkmarx.jfrog.io/artifactory/docker ; 
         helm repo remove ast;
         sleep 30;
          helm repo add ast https://checkmarx.jfrog.io/artifactory/ast-helm/ --username ${username} --password ${password} ;
          helm repo update;
 
          helm upgrade --install ast-operator ast/operator-helm-chart --set config.domain="127.0.0.1" --set config.enableTLS="false"  --set-string config.port=8080 --set config.protocol="http" --set config.disableResourcesAndRequestLimit="true" --set imagePullSecretJfrog.registry="https://checkmarx.jfrog.io" --set imagePullSecrets="regcred" --set imagePullSecretJfrog.username=${username} --set imagePullSecretJfrog.password=${password} --set imagePullSecretJfrog.email=${username};$x=-1; while ($x -le 0) {sleep 5 ;$x=kubectl get pods | findstr ast-operator | findstr 2/2 | Measure-Object | %{$_.Count}; if ($x -le 0) {echo "Waiting Pods ast-operator to be created"}};
          echo "after install one ast-operator ";
 
          helm upgrade --install platform ast/platform-local;$x=1; while ($x -le 6) {sleep 5 ;$x=kubectl get pods | findstr platform | findstr 1/1 | Measure-Object | %{$_.Count}; if ($x -le 6) {echo "Waiting Pods ast/platform-local to be created creted $x from 7 "}};
          helm uninstall ast-operator;$x=1; while ($x -ge 1) {sleep 5 ;$x=kubectl get pods | findstr ast-operator | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting Pods ast-operator uninstall"}};
         
         `,
       ]);
      //  זה בדיקה של אנינסטל לראות שזה באמת הוסר הורדתי את זה  helm uninstall ast-operator;$x=250; while ($x -ge 9 ) {sleep 50 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting until the Pod ast-operator deleted"}};
 //      זה בדיקה של ינסטל אופרטור בהתחלה אני מוריד את הבדיקה כי הוא מתקין לי את אופרטוק ישירות  ת helm upgrade --install ast-operator ast/operator-helm-chart --set config.domain="127.0.0.1" --set config.enableTLS="false"  --set-string config.port=8080 --set config.protocol="http" --set config.disableResourcesAndRequestLimit="true" --set imagePullSecretJfrog.registry="https://checkmarx.jfrog.io" --set imagePullSecrets="regcred" --set imagePullSecretJfrog.username=${username} --set imagePullSecretJfrog.password=${password} --set imagePullSecretJfrog.email=${username};$x=0; while ($x -le 1  ) {sleep 30 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting Pods ast-operator to be created"}};
 
       //עשיתיח תנאי למעלה אפשר למחור  להוסיף תנאי שאם אין מספיק פודים שלר ימשיך הלאה ואם כם יחזיר את הריסולב
 
 
       child.stdout.setEncoding("utf8");
       child.stdout.on("data", function (data) {
         data_for_create_dev += data;
         arry_context_for_create_dev += data;
       });
 
       child.stderr.setEncoding("utf8");
       child.stderr.on("data", function (data) {
         console.log("stderr: " + data);
         data = data.toString();
         data_for_create_dev += data;
       });
 
       child.on("exit", function () {
         resolve("ddd");
       });
       child.stdin.end();
     }
     printData.printData(child);
   });
   return myPromise;
 }
 
 function Update_Url_in_ast_components(url)
{
  edit_yaml_file.Update_Url_in_ast_components_tags_nimrod(url)
}


function Get_Traefik_url_local() {
  console.log("Get_Traefik_url_local");
  let myPromise = new Promise((resolve, reject) => {
    //try {
    const fileContents = fs.readFileSync(config_file_path, "utf8");
    const data_configFile = JSON.parse(fileContents);

    var spawn = require("child_process").spawn,
      child;
    child = spawn("powershell.exe", ["kubectl get svc | findstr traefik"]);
   
    

    // child.on("exit", function () {
    //   console.log("inside exit 1");
    //  // console.log(arry_context_for_create_dev)

     resolve(child);

     // resolve(arry_context_for_create_dev);
    });

//  printData.printData(child);
  
  // });
  return myPromise;
}

function Uninstallation_Ast_Components_AWS_Nimrod() {

  if (fs.existsSync(config_file_path)) {
    fileContents = fs.readFileSync(config_file_path, "utf8");
    ////take from the file config
    data_configFile = JSON.parse(fileContents);

    const path_astComponents = data_configFile.astComponents;
    const path_yaml_astComponents = `${path_astComponents}/platforms/helm/values.yaml`;
    const path_to_up_astComponents = `${path_astComponents}/platforms/helm`;

   
    process.chdir(path_to_up_astComponents);

   var spawn = require("child_process").spawn,
   child;
 child = spawn("powershell.exe", ["helm uninstall ast ."]);

  }

  printData.printData(child);

 
}


function Uninstallation_operator_platform() {

   var spawn = require("child_process").spawn,
   child;
 child = spawn("powershell.exe", ["helm  uninstall ast-operator; helm uninstall  platform-platform-local;helm uninstall  ast-swagger; helm uninstall  ast-auth"]);
    printData.printData(child);

  }



function test(trafik_url) {
  
  var spawn = require("child_process").spawn,
  child;
//  child = spawn("powershell.exe", ["git pull; helm dep up;helm install ast ."]);
child = spawn("powershell.exe", [`Start-Process -FilePath "C://Program Files (x86)//Google//Chrome//Application//chrome.exe" -ArgumentList '--start-fullscreen "${trafik_url}"'`]);
printData.printData(child);

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
    //let url= extract_trafik(arry_traefik);
    resolve(arry_traefik);
  });
  child.stdin.end();
 });
 return myPromise;
}

function extract_trafik(arry_traefik) {
  url_trafik = arry_traefik[3];
  //console.log(chalk.green(url_trafik));
  return url_trafik;
  //edit_yaml_file.Update_Url_in_all_components_tags(url_trafik);
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
        chalk.blue(`To create a cluster for ${item} enter ${index}`)
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
    let name_cluster="";
    if (index_cluster == clusters.length) {
      console.log(chalk.blue(`Please enter the name of cluster`));
      name_cluster = prompt();
    }
    else{
      name_cluster = clusters[index_cluster];

    }
    // console.log("llllllllllllll");
    // console.log(name_cluster);

    const regions = data_configFile.
    regions;
    console.log(chalk.green("Please choose  region \n"));
    regions.forEach(myFunction_choose_region);
    function myFunction_choose_region(item, index, arr) {
      console.log(chalk.blue(`To create a cluster in ${item} enter ${index}`));
    }
    let region = prompt();

    var spawn = require("child_process").spawn,
    child;
    
    child = spawn("powershell.exe", [
      `eksctl create cluster --name ${name_cluster} --region ${regions[region]} --node-type t3.xlarge --nodes 2 --nodes-min 1 --nodes-max 3 --tags CxSaverTeamName=Chameleon,CxSaverClusterName=${name_cluster} --version 1.21`,
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
   
    console.log(chalk.green("Please enter the name of cluster \n"));
    let name = prompt();
    var spawn = require("child_process").spawn,
      child;
    child = spawn("powershell.exe", [
      `kubectl config use-context ${name}`,
    ]);
  } catch (err) {
    console.error(err);
  }
  printData.printData(child);
}

function connect_New_Cluster() {
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

function delete_Connect_cluster() {
  try {
    itemsProcessed_name_cluster = 0;
    console.log(chalk.green("Please choose the cluster to delete Connect \n"));
    let name_cluster_to_delete_connect = prompt();
    var spawn = require("child_process").spawn,
      child;
    child = spawn("powershell.exe", [
      `kubectl config delete-context ${name_cluster_to_delete_connect}`,
    ]);
  } catch (err) {
    console.error(err);
  }
  printData.printData(child);
}


function Login_to_Docker_ineks_file() {
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
let cluster;
let region;
function Create_local_components_clusterA() {
//  Create_local_components_clusterB().then((resultB) => {
    console.log("BBBBB");
    Create_local_components_clusterC().then((resultC) => {
      console.log(resultC);
      console.log("CCCC");
    });
 // });
}

function get_aws_sso_temporary_credentials(sso_file_cache) {
  let myPromise = new Promise((resolve, reject) => {
    console.log("START shlab 5");

    //set to sso config token from the cache
    sso_format_login.sso_access_token = sso_file_cache.accessToken;
    console.log("mmmmm");
    console.log(sso_format_login.sso_access_token);

    var spawn = require("child_process").spawn,
      child;
    child = spawn("powershell.exe", [
      //`eksctl create cluster --name ${clusters[cluster]} --region ${regions[region]} --node-type t3.large --nodes 2 --nodes-min 1 --nodes-max 3`,
      `aws sso get-role-credentials --account-id ${sso_format_login.sso_account_id} --role-name ${sso_format_login.sso_role_name} --access-token ${sso_format_login.sso_access_token} --region ${sso_format_login.sso_region}`,
    ]);

    // printData.printData(child);
    console.log("end shlab 5");
    resolve(child);
  });
  return myPromise;
}

function Create_aws_components_clusterA_shifra() {
  //  Create_local_components_clusterB().then((resultB) => {
      console.log("BBBBB");
      Create_aws_components_clusterC().then((resultC) => {
        console.log(resultC);
        console.log("CCCC");
      });
   // });
  }
function Create_local_components_clusterAaigor() {
 Create_local_components_clusterB().then((resultB) => {
    console.log("BBBBB");
    Create_local_components_clusterCigor().then((resultC) => {
      console.log(resultC);
      console.log("CCCC");
    });
 });
}
function Create_in_aws_cluster_shifra() {
 
  let myPromise = new Promise((resolve, reject) => {
    //try {
    if (!fs.existsSync(ast_cli_dir_path)) {
      create_dir_ast_cli();
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
      const path_astComponents = data_configFile.astComponents;

      process.chdir(path_astComponents);

      

      var spawn = require("child_process").spawn,
        child;

      child = spawn("powershell.exe", [
        `docker login --username ${username} --password ${password} https://checkmarx.jfrog.io/artifactory/docker ; 
        helm repo remove ast;
         helm repo add ast https://checkmarx.jfrog.io/artifactory/ast-helm/ --username ${username} --password ${password} ;
         helm repo update;
         helm upgrade operator --install --create-namespace --namespace default ast/operator-helm-chart --set config.domain=127.0.0.1 --set-string config.port="8080" --set imagePullSecretJfrog.username=${username} --set imagePullSecretJfrog.password=${password} --set imagePullSecretJfrog.email=${username};
      	git checkout add-local-deplyment; cd .\\deployment\\dev\\;helm dep up; helm upgrade ast . -i






        
         helm upgrade --install platform ast/platform;$x=1; while ($x -le 11 ) {sleep 10 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting Pods to be created"}};
        helm upgrade --install core ast/core;$x=1; while ($x -le 20 ) {sleep 10 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting Pods to be created"}};
        helm upgrade --install sast ast/sast;$x=1; while ($x -le 21 ) {sleep 10 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting Pods to be created"}};
        helm upgrade --install kics ast/kics;
        helm upgrade --install sca ast/sca;
        $x=1; while ($x -le 48 ) {sleep 60 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting Pods to be created"}}`,
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


function Create_local_components_clusterC() {
  let myPromise = new Promise((resolve, reject) => {
    //try {
    if (!fs.existsSync(ast_cli_dir_path)) {
      create_dir_ast_cli();
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
         kubectl patch sa default -n default -p '"imagePullSecrets": [{"name": "regcred" }]';
         helm upgrade operator --install --create-namespace --namespace default ast/operator-helm-chart --set config.domain=127.0.0.1 --set-string config.port="8080" --set imagePullSecretJfrog.username=${username} --set imagePullSecretJfrog.password=${password} --set imagePullSecretJfrog.email=${username};
      	
         helm upgrade --install platform ast/platform-local;$x=1; while ($x -le 11 ) {sleep 30 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting Pods to be created"}};
        helm upgrade --install core ast/core;$x=1; while ($x -le 30 ) {sleep 30 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting Pods to be created"}};
        helm upgrade --install sast ast/sast;$x=1; while ($x -le 41 ) {sleep 30 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting Pods to be created"}};
        helm upgrade --install kics ast/kics;
        helm upgrade --install sca ast/sca;
        helm upgrade --install ast-metrics ast/ast-metrics-management;
        helm upgrade --install ast-integrations ast/integrations;
        $x=1; while ($x -le 48 ) {sleep 60 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting Pods to be created"}}`,
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
function  Create_local_components_clusterCigor() {
  let myPromise = new Promise((resolve, reject) => {
    //try {
    if (!fs.existsSync(ast_cli_dir_path)) {
      create_dir_ast_cli();
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
         kubectl patch sa default -n default -p '"imagePullSecrets": [{"name": "regcred" }]';
         helm upgrade operator --install --create-namespace --namespace default ast/operator-helm-chart --set config.domain=127.0.0.1 --set-string config.port="8080" --set imagePullSecretJfrog.username=${username} --set imagePullSecretJfrog.password=${password} --set imagePullSecretJfrog.email=${username};
      	
         helm upgrade --install platform ast/platform-local;$x=1; while ($x -le 11 ) {sleep 10 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting Pods to be created"}} `,
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
  if (!fs.existsSync(ast_cli_dir_path)) {
    create_dir_ast_cli();
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
         kubectl patch sa default -n default -p '"imagePullSecrets": [{"name": "regcred" }]';
         helm upgrade operator --install --create-namespace --namespace default ast/operator-helm-chart --set config.domain=127.0.0.1 --set-string config.port="8080" --set imagePullSecretJfrog.username=${username} --set imagePullSecretJfrog.password=${password} --set imagePullSecretJfrog.email=${username};
         helm upgrade --install platform ast/platform-local;$x=1; while ($x -le 11 ) {sleep 2 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting Pods to be created"}};

         helm upgrade --install core ast/core;$x=1; while ($x -le 10 ) {sleep 2 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting Pods to be created"}};
        helm upgrade --install sast ast/sast;$x=1; while ($x -le 20 ) {sleep 2 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting Pods to be created"}};
        $x=1; while ($x -ge 15 ) {sleep 2 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "We'm almost done! wait for all the pods to run"}};
        helm upgrade --install kics ast/kics;
        $x=1; while ($x -le 25 ) {sleep 2 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting Pods to be created"}}`,
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
    `helm del sast; helm del kiks; helm del core; helm del platform; helm del operator ;helm del ast-integrations ;helm del  ast-metrics;
    helm  uninstall platform-platform-local;helm uninstall kics-kics-worker;helm  uninstall sca-sca-webapp;	helm  uninstall sca-sca-worker;
    helm  uninstall kics-kics-results-processor;helm  uninstall kics-kics-management-writer;helm  uninstall sca-sca-container-results-processor;
    helm  uninstall sca-sca-results-processor;
 $x=100; while ($x -ge 10 ) {sleep 40 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting Pods to be deleted"}}`,
  ]);
  printData.printData(child);
}

var data_for_create_dev = "";
var arry_context_for_create_dev = [];

function Create_local_components_clusterB() {
  let myPromise = new Promise((resolve, reject) => {
    // try {
    if (!fs.existsSync(ast_cli_dir_path)) {
      create_dir_ast_cli();
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
        'k3d.exe cluster delete dev; k3d cluster create dev --k3s-arg "--disable=traefik@server:0" --port 8080:80@server:0',
      ]);
      child.stdout.setEncoding("utf8");
      child.stdout.on("data", function (data) {
        data_for_create_dev += data;
        arry_context_for_create_dev += data;
      });

      child.stderr.setEncoding("utf8");
      child.stderr.on("data", function (data) {
        console.log("stderr: " + data);
        data = data.toString();
        data_for_create_dev += data;
      });

      child.on("exit", function () {
        resolve("ddd");
      });
      child.stdin.end();
    }
    printData.printData(child);
  });
  return myPromise;
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
module.exports.Login_to_Docker_ineks_file = Login_to_Docker_ineks_file;
module.exports.create_cluster_sso = create_cluster_sso;
module.exports.delete_cluster_sso = delete_cluster_sso;
module.exports.Ast_Components_Installation_AWS_Nimrod = Ast_Components_Installation_AWS_Nimrod;
module.exports.Uninstallation_Ast_Components_AWS_Nimrod = Uninstallation_Ast_Components_AWS_Nimrod;
module.exports.test = test;
module.exports.delete_Connect_cluster = delete_Connect_cluster;
module.exports.Ast_Components_Installation_AWS_Nimrod2 = Ast_Components_Installation_AWS_Nimrod2;
module.exports.create_cluster = create_cluster;
module.exports.uninstall_all = uninstall_all;
module.exports.delete_cluster = delete_cluster;
module.exports.Get_current_context = Get_current_context;
module.exports.get_contexts = get_contexts;
module.exports.Create_local_components_clusterA =
  Create_local_components_clusterA;
module.exports.Create_local_components_clusterB =
  Create_local_components_clusterB;
  module.exports.Create_local_components_clusterAaigor =
  Create_local_components_clusterAaigor;
  module.exports.Create_aws_components_clusterA_shifra =
  Create_aws_components_clusterA_shifra;


module.exports.Connect_cluster = Connect_cluster;
module.exports.connect_New_Cluster = connect_New_Cluster;
module.exports.Uninstallation_operator_platform = Uninstallation_operator_platform;
module.exports.Create_in_aws_cluster_shifra = Create_in_aws_cluster_shifra;

module.exports.Create_local_components_cluster_orly_without_metrics_And_integretions =
  Create_local_components_cluster_orly_without_metrics_And_integretions;


module.exports.Update_Url_in_ast_components = Update_Url_in_ast_components;



  // function Get_Traefik_url_local0ld() {
  //   let myPromise = new Promise((resolve, reject) => {
  //     //try {
  //     const fileContents = fs.readFileSync(config_file_path, "utf8");
  //     const data_configFile = JSON.parse(fileContents);
  
  //     var spawn = require("child_process").spawn,
  //       child;
  //     child = spawn("powershell.exe", ["kubectl get svc | findstr traefik"]);
     
  //      child.stdout.setEncoding("utf8");
  //     child.stdout.on("data", function (data) {
  //       data_for_create_dev += data;
  //       arry_context_for_create_dev += data;
  //     });
  
  //     child.stderr.setEncoding("utf8");
  //     child.stderr.on("data", function (data) {
  //       console.log("stderr: " +data);
  //       data = data.toString();
  //       data_for_create_dev += data;
  //     });
  
  //     child.on("exit", function () {
  //     // console.log("inside exit");
  //       console.log(arry_context_for_create_dev)
  
  //       //commands_init.extract_all_trafik_A(child)
  
  //       //setTimeout(commands_init.extract_all_trafik_A(child), 300000);
  
  //      //var url_local=  commands_init.extract_all_trafik_A(child);
       
     
  
  //     // console.log(chalk.blue(url_local));
  //       resolve("ddd");
  //     });
  //     child.stdin.end();
  
  // //  printData.printData(child);
    
  //   });
  //   return myPromise;
  // }

  
// function Update_Url_in_ast_componentsold()
// {
//     Get_Traefik_url_local().then((child ) => {
//       //console.log("after");
//       var scriptOutput = "";
//   child.stdout.setEncoding("utf8");
//   child.stdout.on("data", function (data) {
//     //Here is where the output goes
//     traefik = data;
//     traefik2 = data.toString();

//     val = traefik.replace(/\s\s+/g, " ");
//     //console.log(val);
//     arry_traefik = val.split(" ");
//     //console.log(arry_traefik);
//   });
//   child.stderr.setEncoding("utf8");
//   child.stderr.on("data", function (data) {
//     //Here is where the error output goes
//     console.log("stderr: " + data);
//     data = data.toString();
//     scriptOutput += data;
//   });
//   child.on("exit", function () {
//     let url= arry_traefik[3];
//    //console.log(arry_traefik[3]);
//    edit_yaml_file.Update_Url_in_ast_components_tags_nimrod(url)
   
//   });
//   child.stdin.end();
//  });

// }



// if (regions[region]=="eu-north-1")
// {
 
//   child = spawn("powershell.exe", [
//     `eksctl create cluster --name ${name_cluster} --region ${regions[region]} --node-type t3.xlarge --nodes 2 --nodes-min 2 --nodes-max 3 --tags CxSaverTeamName=Chameleon,CxSaverClusterName=${name_cluster} --version 1.21`,
//   ]);
// }
// else
// {
//   child = spawn("powershell.exe", [
//     `eksctl create cluster --name ${name_cluster} --region ${regions[region]} --node-type t3.xlarge --nodes 2 --nodes-min 2 --nodes-max 3 --tags CxSaverTeamName=Chameleon,CxSaverClusterName=${name_cluster} --version 1.21`,

//   ]);