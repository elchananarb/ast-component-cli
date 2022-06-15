#!/usr/bin/env node
const nautilus = require("commander");
const chalk = require("chalk");
const clear = require("clear");
const prompt = require("prompt-sync")({ sigint: true });
var spawn = require("child_process").execFileSync,
  child;
const os = require("os");

const fs = require("fs");
const AppConfig = require("./models/AppConfig");
const eksctl_commands = require("./commands/eksctl_commands");
const edit_yaml_file = require("./edit-files/edit_yaml_file");
const printData = require("./models/printData.js");
const commands_init = require("./commands/commands_init");

const homeDirectory = os.homedir();
const nautilus_cli_dir_path = `${homeDirectory}/.nautilus-cli`;
const config_file_path = `${nautilus_cli_dir_path}/configFile.json`;

console.log(
  chalk.red((child = spawn("powershell.exe", ["figlet 'NAUTILUS'"])))
);

nautilus
  .command("Ast-Upgrade")
  .alias("au")
  .description("Ast Upgrade")
  .action(() => {
    const fileContents = fs.readFileSync(config_file_path, "utf8");
    try {
      ////take from the file config
      const data_configFile = JSON.parse(fileContents);

      ////take astPath from the data_configFile from the file config
      const astPath = data_configFile.astPath;
      ////Change the directory
      process.chdir(astPath);
      // //after Change the directory can be input command in new directory
      var spawn = require("child_process").spawn,
        child;
      child = spawn("powershell.exe", [
        "helm dep up ast; helm upgrade main ast -f ./ast/values-customer.yaml -f ./ast/values-release-tags.yaml",
      ]);
    } catch (err) {
      console.error(err);
    }
    printData.printData(child);
  });

nautilus
  .command("Build-Cluster")
  .alias("bc")
  .description("Build Cluster in Aws")
  .action(() => {
    const fileContents = fs.readFileSync(config_file_path, "utf8");
    try {
      ////take from the file config
      const data_configFile = JSON.parse(fileContents);
      ////take astPath from the data_configFile from the file config
      const astPath = data_configFile.astPath;
      console.log(astPath);
      ////Change the directory
      //process.chdir("C:/Users/elchanana/IdeaProjects/ast/helm");
      process.chdir(astPath);
      //console.log("Starting directory: " + process.cwd());
      // //after Change the directory can be input command in new directory
      var spawn = require("child_process").spawn,
        child;
      child = spawn("powershell.exe", [
        "make ecr; helm dep up ast; helm upgrade main ast -f ./ast/values-customer.yaml -f ./ast/values-release-tags.yaml --install",
      ]);
    } catch (err) {
      console.error(err);
    }
    printData.printData(child);
  });

nautilus
  .command("connect-Cluster")
  .alias("conc")
  .description("connect to Cluster in Aws")
  .action(() => {
    //const fileContents = fs.readFileSync("./configFile.json", "utf8");
    const fileContents = fs.readFileSync(config_file_path, "utf8");
    try {
      ////take from the file config
      const data_configFile = JSON.parse(fileContents);
      ////take cluster name from the file config
      const clusters = data_configFile.clusters;
      console.log(chalk.green("Please choose the cluster to Connect \n"));
      clusters.forEach(myFunction);
      function myFunction(item, index, arr) {
        console.log(chalk.blue(`Connect to a cluster ${item} enter ${index}`));
      }
      let cluster = prompt();

      const regions = data_configFile.regions;
      console.log(chalk.green("Please choose  region \n"));
      regions.forEach(myFunction);
      function myFunction(item, index, arr) {
        console.log(
          chalk.blue(`To Connect a cluster in ${item} enter ${index}`)
        );
      }
      let region = prompt();

      var spawn = require("child_process").spawn,
        child;
      child = spawn("powershell.exe", [
        `eksctl utils write-kubeconfig --cluster=${clusters[cluster]} --region ${regions[region]} --profile default`,
      ]);
    } catch (err) {
      console.error(err);
    }
    printData.printData(child);
  });

nautilus
  .command("create-cluster")
  .alias("crec")
  .description("create a new cluster in Aws")
  .action(() => {
    clear();
    eksctl_commands.create_cluster();

    // //const fileContents = fs.readFileSync("./configFile.json", "utf8");
    // const fileContents = fs.readFileSync(config_file_path, "utf8");
    // try {
    //   ////take from the file config
    //   const data_configFile = JSON.parse(fileContents);

    //   ////take cluster name from the file config
    //   const clusters = data_configFile.clusters;
    //   console.log(chalk.green("Please choose the cluster to create \n"));
    //   clusters.forEach(myFunction);
    //   function myFunction(item, index, arr) {
    //     console.log(
    //       chalk.blue(`To create a cluster for ${item} enter ${index}`)
    //     );
    //   }
    //   let cluster = prompt();
    //   const regions = data_configFile.regions;
    //   console.log(chalk.green("Please choose  region \n"));
    //   regions.forEach(myFunction);
    //   function myFunction(item, index, arr) {
    //     console.log(
    //       chalk.blue(`To create a cluster name ${item} enter ${index}`)
    //     );
    //   }
    //   let region = prompt();

    //   var spawn = require("child_process").spawn,
    //     child;
    //   child = spawn("powershell.exe", [
    //     `eksctl create cluster --name ${clusters[cluster]} --region ${regions[region]} --node-type t3.large --nodes 2 --nodes-min 1 --nodes-max 3 --profile default `,
    //   ]);
    // } catch (err) {
    //   console.error(err);
    // }
    // printData.printData(child);
  });

nautilus
  .command("delete-cluster")
  .description("delete a cluster in Aws")
  .alias("dc")
  .action(() => {
    //const fileContents = fs.readFileSync("./configFile.json", "utf8");
    const fileContents = fs.readFileSync(config_file_path, "utf8");
    try {
      ////take from the file config
      const data_configFile = JSON.parse(fileContents);
      ////take cluster name from the file config
      const clusters = data_configFile.clusters;
      console.log(chalk.green("Please choose the cluster to delete \n"));
      clusters.forEach(myFunction);
      function myFunction(item, index, arr) {
        console.log(
          chalk.blue(`To delete a cluster for ${item} enter ${index}`)
        );
      }
      let cluster = prompt();

      const regions = data_configFile.regions;
      console.log(chalk.green("Please choose  region \n"));
      regions.forEach(myFunction);
      function myFunction(item, index, arr) {
        console.log(
          chalk.blue(`To delete a cluster in ${item} enter ${index}`)
        );
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
  });

nautilus
  .command("Delete-Service")
  .description("Delete Service")
  .alias("dels")
  .action(() => {
    //const fileContents = fs.readFileSync("./configFile.json", "utf8");
    const fileContents = fs.readFileSync(config_file_path, "utf8");
    try {
      ////take from the file config
      const data_configFile = JSON.parse(fileContents);
      ////take Service name from the file config
      const services = data_configFile.services;
      const services_arry = Object(services);

      //console.log(typeof services_arry);
      console.log(services_arry[0]["name"]);

      //const service = services.firstOrDefault((x) => x.name == item);
      //console.log(services[0]);

      console.log(chalk.green("Please enter the number \n"));
      services_arry.forEach(myFunction);
      function myFunction(item, index, arr) {
        console.log(
          chalk.blue(`To delete a service  ${item["name"]} enter ${index}`)
        );
      }
      let service = prompt();
      var spawn = require("child_process").spawn,
        child;
      child = spawn("powershell.exe", [
        `Deleting Service ${services_arry[service]["name"]}; kubectl delete deployment main-${services_arry[service]["name"]}`,
      ]);
    } catch (err) {
      console.error(err);
    }
    printData.printData(child);
  });

nautilus
  .command("Deploy-Service")
  .description("Deploy Service")
  .alias("deps")
  .action(() => {
    console.log("in construction");
    //
    // //const fileContents = fs.readFileSync("./configFile.json", "utf8");
    // const fileContents = fs.readFileSync(
    //   config_file_path,
    //   "utf8"
    // );
    // try {
    //   ////take from the file config
    //   const data_configFile = JSON.parse(fileContents);
    //   ////take astPath from the data_configFile from the file config
    //   const services = data_configFile.services;
    //   const services_arry = Object(services);

    //   console.log(typeof services_arry);
    //   console.log(services_arry[0]["name"]);

    //   //const service = services.firstOrDefault((x) => x.name == item);
    //   //console.log(services[0]);

    //   console.log("Please enter the number \n");
    //   services_arry.forEach(myFunction);
    //   function myFunction(item, index, arr) {
    //     console.log(
    //       chalk.blue(`To delete a service  ${item["name"]} enter ${index}`)
    //     );
    //   }
    //   let service = prompt();
    //   var spawn = require("child_process").spawn,
    //     child;
    //   child = spawn("powershell.exe", [
    //     `Deleting Service ${services_arry[service]["name"]}; kubectl delete deployment main-${services_arry[service]["name"]}`,
    //   ]);
    // } catch (err) {
    //   console.error(err);
    // }
    // printData.printData(child);
  });

nautilus
  .command("init")
  .alias("i")
  .description("create a directory named .nautilus-cli")
  .action(() => {
    clear();
    AppConfig.Config_nautilus_cli();
  });

nautilus
  .command("Operator-values-Tag")
  .alias("ovt")
  .description("Change Operator values Tag")
  .action(() => {
    clear();
    edit_yaml_file.Change_Operator_values_Tag();
  });

nautilus
  .command("Install-Operator")
  .alias("io")
  .description("Install Ast Operator")
  .action(() => {
    clear();
    commands_init.Install_Operator();
  });
nautilus
  .command("Install-Ast-Components")
  .alias("iac")
  .description("Install Ast Components")
  .action(() => {
    clear();
    commands_init.Install_Ast_Components();
  });

nautilus
  .command("Install-Metrics-Components")
  .alias("imc")
  .description("Install Metrics Components")
  .action(() => {
    clear();
    commands_init.Install_Metrics_Components();
  });
nautilus
  .command("Install_the_Policy_Management_Component")
  .alias("ipm")
  .description("nstall the Policy Management Component")
  .action(() => {
    clear();
    commands_init.Install_the_Policy_Management_Component();
  });

nautilus
  .command("Get_Traefik_url")
  .alias("gtu")
  .description("Get_Traefik_url")
  .action(() => {
    clear();
    commands_init.Get_Traefik_url();
  });

nautilus
  .command("Update_Url_in_all_components_tags")
  .alias("uuc")
  .description("Update Url in all components tags")
  .action(() => {
    clear();
    commands_init.Update_Url_in_all_components_tags();
  });

nautilus
  .command("Login-to-Docker")
  .alias("ltd")
  .description("Login to Docker")
  .action(() => {
    clear();
    AppConfig.Login_to_Docker();
  });
// nautilus
//   .command("switched-context")
//   .alias("sc")
//   .description("Switched to another context kubectl")
//   .action(() => {
//     clear();
//     eksctl_commands............();
//   });

nautilus
  .command("delete-cluster-gui")
  .description("delete cluster with window")
  .alias("dcg")
  .action(() => {
    const os = require("os");
    temp = `${process.cwd()}/powerShellScript/deleteCluster.ps1`;
    console.log(temp);

    var spawn = require("child_process").spawn,
      child;

    child = spawn("powershell.exe", [`${temp}`]);
    printData.printData(child);
  });

nautilus
  .command("-help")
  .description("display help for command")
  .alias("-h")
  .action(() => {
    console.log("pppp");
    const os = require("os");
    temp = `${process.cwd()}/powerShellScript/deleteCluster.ps1`;
    console.log(temp);

    var spawn = require("child_process").spawn,
      child;

    child = spawn("powershell.exe", [`${temp}`]);
    printData.printData(child);
  });

nautilus.parse(process.argv);
if (!nautilus.args.length) {
  nautilus.help();
}

// const cluster = prompt(
//   'Please enter the command \n To create a cluster insert "1"  \n To delete a cluster insert     "2" \n To delete delete service Enter "3":\n '
// );

// var spawn = require("child_process").spawn,
//   child;
// child = spawn("powershell.exe", [
//   " $name_cluster = Read-Host -Prompt 'To make sure you want to delete the cluster name Please enter'",
// ]);

//not woring in exe
//    console.log(chalk.greenBright(figlet.textSync("hello world")));

// nautilus
//   .command("create-cluster1")
//   .description("create a new cluster in Aws")
//   .action(() => {
//     console.log(
//       chalk.green(
//         "Please enter the command \n To create a cluster for 'igor' Enter   '1' \n To create a cluster for 'orly' Enter   '2' \n To create a cluster for 'ely' Enter    '3' "
//       )
//     );
//     //to get cluster
//     let cluster = prompt();
//     if (cluster == 3) {
//       console.log(chalk.green("create cluster start!"));
////--region
//       var spawn = require("child_process").spawn,
//         child;
//       child = spawn("powershell.exe", [
//         "eksctl create cluster --name ely --region eu-west-1 --node-type t3.large --nodes 2 --nodes-min 1 --nodes-max 3",
//       ]);

//       var scriptOutput = "";
//       child.stdout.setEncoding("utf8");
//       child.stdout.on("data", function (data) {
//         //Here is where the output goes
//         console.log(chalk.blue("stdout: " + data));

//         data = data.toString();
//         scriptOutput += data;
//       });

//       child.stderr.setEncoding("utf8");
//       child.stderr.on("data", function (data) {
//         //Here is where the error output goes

//         console.log("stderr: " + data);

//         data = data.toString();
//         scriptOutput += data;
//       });

//       child.stdout.on("exit", function () {
//         console.log("Powershell Script finished");
//       });
//       child.stdin.end(); //end input
//     }
//   });

// nautilus
//   .command("create-cluster3")
//   .description("create a new cluster in Aws")
//   .action(() => {
//
//     //const fileContents = fs.readFileSync("./configFile.json", "utf8");
//     const fileContents = fs.readFileSync(
//       config_file_path,
//       "utf8"
//     );
//     try {
//       ////take from the file config
//       const data_configFile = JSON.parse(fileContents);
////take cluster name from the file config
//       const clusters = data_configFile.clusters;
//       console.log("Please enter the command \n");
//       clusters.forEach(myFunction);
//       function myFunction(item, index, arr) {
//         console.log(
//           chalk.blue(`To create a cluster for ${item} enter ${index}`)
//         );
//       }
//       let cluster = prompt();
//       var spawn = require("child_process").spawn,
//         child;
////--region
//       child = spawn("powershell.exe", [
//         `eksctl create cluster --name ${clusters[cluster]} --region eu-west-1 --node-type t3.large --nodes 2 --nodes-min 1 --nodes-max 3`,
//       ]);
//     } catch (err) {
//       console.error(err);
//     }
//     var scriptOutput = "";
//     child.stdout.setEncoding("utf8");
//     child.stdout.on("data", function (data) {
//       //Here is where the output goes
//       console.log(chalk.blue(data));

//       data = data.toString();
//       scriptOutput += data;
//     });

//     child.stderr.setEncoding("utf8");
//     child.stderr.on("data", function (data) {
//       //Here is where the error output goes

//       console.log("stderr: " + data);

//       data = data.toString();
//       scriptOutput += data;
//     });

//     child.stdout.on("exit", function () {
//       console.log("Powershell Script finished");
//     });
//     child.stdin.end(); //end input
//   });

// nautilus
//   .command("test-ls")

//   .description("ls command")

//   .action(() => {
//     //clear();
//     // var spawn = require("child_process").execFileSync,
//     //   child;
//     // console.log((child = spawn("powershell.exe", ["figlet 'hello world'"])));

//     var spawn = require("child_process").spawn,
//       child;
//     child = spawn("powershell.exe", ["cd /"]);

//     var scriptOutput = "";
//     child.stdout.setEncoding("utf8");
//     child.stdout.on("data", function (data) {
//       //Here is where the output goes
//       console.log(chalk.blue("stdout: " + data));

//       data = data.toString();
//       scriptOutput += data;
//     });

//     child.stderr.setEncoding("utf8");
//     child.stderr.on("data", function (data) {
//       //Here is where the error output goes

//       console.log("stderr: " + data);

//       data = data.toString();
//       scriptOutput += data;
//     });

//     child.stdout.on("exit", function () {
//       console.log("Powershell Script finished");
//     });
//     child.stdin.end(); //end input

//     var spawn = require("child_process").spawn,
//       child;
//     child = spawn("powershell.exe", ["ls"]);

//     var scriptOutput = "";
//     child.stdout.setEncoding("utf8");
//     child.stdout.on("data", function (data) {
//       //Here is where the output goes
//       console.log(chalk.blue("stdout: " + data));

//       data = data.toString();
//       scriptOutput += data;
//     });

//     child.stderr.setEncoding("utf8");
//     child.stderr.on("data", function (data) {
//       //Here is where the error output goes

//       console.log("stderr: " + data);

//       data = data.toString();
//       scriptOutput += data;
//     });

//     child.stdout.on("exit", function () {
//       console.log("Powershell Script finished");
//     });
//     child.stdin.end(); //end input
//   });

// nautilus
//   .command("create-cluster0")
//   .description("beny mastuer")
//   .action(() => {
//     const os = require("os");
//     temp = `${process.cwd()}/powerShellScript/createCluster.ps1`;
//     console.log(temp);

//     var spawn = require("child_process").spawn,
//       child;

//     child = spawn("powershell.exe", [`${temp}`]);

//     child.stdout.on("data", function (data) {
//       console.log("Powershell Data: " + data);
//     });
//     child.stderr.on("data", function (data) {
//       console.log("Powershell Errors: " + data);
//     });
//     child.on("exit", function () {
//       console.log("Powershell Script finished");
//     });
//     child.stdin.end(); //end input

//     //child = spawn("powershell.exe", ["c:\\temp\\helloworld.ps1"]);
//     // child = spawn("powershell.exe", [
//     //   "C:\\Projects\\Js\\lern-js\\my-js-1\\powerShellScript\\listBoxControl.ps1",
//     // ]);

//     //fs.mkdir(`${homeDirectory}/.nautilus-cli`);

//     //console.log(process.cwd() + `/node_modules`);
//   });

//nautilus;
//   .command("test-ps1")
//   .description("ps1 script ")
//   .action(() => {
//     var startStr = fs
//       .readFileSync(path.join(__dirname, "/powerShellScript/createCluster.ps1"))
//       .toString();
//     ps.addCommand("& {" + startStr + "} \n");
//   });

// nautilus
//   .command("delete-cluster0")
//   .description("beny mastuer")
//   .action(() => {
//     console.log("pppp");
//     const os = require("os");
//     temp = `${process.cwd()}/powerShellScript/deleteCluster.ps1`;
//     console.log(temp);

//     var spawn = require("child_process").spawn,
//       child;

//     child = spawn("powershell.exe", [`${temp}`]);

//     child.stdout.on("data", function (data) {
//       console.log("Powershell Data: " + data);
//     });
//     child.stderr.on("data", function (data) {
//       console.log("Powershell Errors: " + data);
//     });
//     child.on("exit", function () {
//       console.log("Powershell Script finished");
//     });
//     child.stdin.end(); //end input

//     //child = spawn("powershell.exe", ["c:\\temp\\helloworld.ps1"]);
//     // child = spawn("powershell.exe", [
//     //   "C:\\Projects\\Js\\lern-js\\my-js-1\\powerShellScript\\listBoxControl.ps1",
//     // ]);

//     //fs.mkdir(`${homeDirectory}/.nautilus-cli`);

//     //console.log(process.cwd() + `/node_modules`);
//   });
