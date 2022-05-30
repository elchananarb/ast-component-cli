#!/usr/bin/env node
const nautilus1 = require("commander");
const path = require("path");
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const prompt = require("prompt-sync")({ sigint: true });
var spawn = require("child_process").execFileSync,
  child;
const os = require("os");

const util = require("util");
const dns = require("dns");
const fs = require("fs");
const AppConfig = require("./models/AppConfig");
const printData = require("./models/printData.js");
const { Console } = require("console");

console.log(
  chalk.red((child = spawn("powershell.exe", ["figlet 'NAUTILUS'"])), {
    horizontalLayout: "full",
  })
);

nautilus1
  .command("Ast-Upgrade")
  .alias("au")
  .description("Ast Upgrade")
  .action(() => {
    const homeDirectory = os.homedir();
    const fileContents = fs.readFileSync(
      `${homeDirectory}/.nautilus-cli/configFile.json`,
      "utf8"
    );
    try {
      ////take from the file config
      const data = JSON.parse(fileContents);
      ////take astPath from the data from the file config
      const astPath = data.astPath;
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

nautilus1
  .command("Build-Cluster")
  .alias("bc")
  .description("Build Cluster in Aws")

  .action(() => {
    const homeDirectory = os.homedir();
    const fileContents = fs.readFileSync(
      `${homeDirectory}/.nautilus-cli/configFile.json`,
      "utf8"
    );
    try {
      ////take from the file config
      const data = JSON.parse(fileContents);
      ////take astPath from the data from the file config
      const astPath = data.astPath;
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
nautilus1
  .command("connect-Cluster")
  .alias("conc")
  .description("connect to Cluster in Aws")
  .action(() => {
    const homeDirectory = os.homedir();
    const fileContents = fs.readFileSync(
      `${homeDirectory}/.nautilus-cli/configFile.json`,
      "utf8"
    );
    try {
      ////take from the file config
      const data = JSON.parse(fileContents);
      ////take astPath from the data from the file config
      const astPath = data.astPath;
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

nautilus1
  .command("create-cluster")
  .alias("crec")
  .description("create a new cluster in Aws")
  .action(() => {
    const homeDirectory = os.homedir();
    //const fileContents = fs.readFileSync("./configFile.json", "utf8");
    const fileContents = fs.readFileSync(
      `${homeDirectory}/.nautilus-cli/configFile.json`,
      "utf8"
    );
    try {
      ////take from the file config
      const data = JSON.parse(fileContents);
      ////take astPath from the data from the file config
      const clusters = data.clusters;
      console.log("Please enter the command \n");
      clusters.forEach(myFunction);
      function myFunction(item, index, arr) {
        console.log(
          chalk.blue(`To create a cluster for ${item} enter ${index}`)
        );
      }
      let num = prompt();
      var spawn = require("child_process").spawn,
        child;
      child = spawn("powershell.exe", [
        `eksctl create cluster --name ${clusters[num]} --region eu-north-1 --node-type t3.large --nodes 2 --nodes-min 1 --nodes-max 3`,
      ]);
    } catch (err) {
      console.error(err);
    }
    printData.printData(child);
  });

nautilus1
  .command("delete-cluster")
  .description("delete a cluster in Aws")
  .alias("dc")
  .action(() => {
    const homeDirectory = os.homedir();
    //const fileContents = fs.readFileSync("./configFile.json", "utf8");
    const fileContents = fs.readFileSync(
      `${homeDirectory}/.nautilus-cli/configFile.json`,
      "utf8"
    );
    try {
      ////take from the file config
      const data = JSON.parse(fileContents);
      ////take astPath from the data from the file config
      const clusters = data.clusters;
      console.log(typeof clusters);
      console.log("Please enter the command \n");
      clusters.forEach(myFunction);
      function myFunction(item, index, arr) {
        console.log(
          chalk.blue(`To delete a cluster for ${item} enter ${index}`)
        );
      }
      let num = prompt();
      var spawn = require("child_process").spawn,
        child;
      child = spawn("powershell.exe", [
        `eksctl delete cluster -n ${clusters[num]} -r eu-north-1`,
      ]);
    } catch (err) {
      console.error(err);
    }
    printData.printData(child);
  });

nautilus1
  .command("Delete-Service")
  .description("Delete Service")
  .alias("dels")
  .action(() => {
    const homeDirectory = os.homedir();
    //const fileContents = fs.readFileSync("./configFile.json", "utf8");
    const fileContents = fs.readFileSync(
      `${homeDirectory}/.nautilus-cli/configFile.json`,
      "utf8"
    );
    try {
      ////take from the file config
      const data = JSON.parse(fileContents);
      ////take astPath from the data from the file config
      const services = data.services;
      const services_arry = Object(services);

      console.log(typeof services_arry);
      console.log(services_arry[0]["name"]);

      //const service = services.firstOrDefault((x) => x.name == item);
      //console.log(services[0]);

      console.log("Please enter the number \n");
      services_arry.forEach(myFunction);
      function myFunction(item, index, arr) {
        console.log(
          chalk.blue(`To delete a service  ${item["name"]} enter ${index}`)
        );
      }
      let num = prompt();
      var spawn = require("child_process").spawn,
        child;
      child = spawn("powershell.exe", [
        `Deleting Service ${services_arry[num]["name"]}; kubectl delete deployment main-${services_arry[num]["name"]}`,
      ]);
    } catch (err) {
      console.error(err);
    }
    printData.printData(child);
  });

nautilus1
  .command("Deploy-Service")
  .description("Deploy Service")
  .alias("deps")
  .action(() => {
    console.log("in construction");
    // const homeDirectory = os.homedir();
    // //const fileContents = fs.readFileSync("./configFile.json", "utf8");
    // const fileContents = fs.readFileSync(
    //   `${homeDirectory}/.nautilus-cli/configFile.json`,
    //   "utf8"
    // );
    // try {
    //   ////take from the file config
    //   const data = JSON.parse(fileContents);
    //   ////take astPath from the data from the file config
    //   const services = data.services;
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
    //   let num = prompt();
    //   var spawn = require("child_process").spawn,
    //     child;
    //   child = spawn("powershell.exe", [
    //     `Deleting Service ${services_arry[num]["name"]}; kubectl delete deployment main-${services_arry[num]["name"]}`,
    //   ]);
    // } catch (err) {
    //   console.error(err);
    // }
    // printData.printData(child);
  });

nautilus1
  .command("init")
  .alias("i")
  .description("create a directory named .nautilus-cli")
  .action(() => {
    clear();
    AppConfig.Config_nautilus_cli();
  });

nautilus1
  .command("delete-cluster-gui")
  .description("delete cluster with window")
  .alias("dcg")
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

nautilus1.parse(process.argv);
if (!nautilus1.args.length) {
  nautilus1.help();
}

// const num = prompt(
//   'Please enter the command \n To create a cluster insert "1"  \n To delete a cluster insert     "2" \n To delete delete service Enter "3":\n '
// );

// var spawn = require("child_process").spawn,
//   child;
// child = spawn("powershell.exe", [
//   " $name_cluster = Read-Host -Prompt 'To make sure you want to delete the cluster name Please enter'",
// ]);

//not woring in exe
//    console.log(chalk.greenBright(figlet.textSync("hello world")));

// nautilus1
//   .command("create-cluster1")
//   .description("create a new cluster in Aws")
//   .action(() => {
//     console.log(
//       chalk.green(
//         "Please enter the command \n To create a cluster for 'igor' Enter   '1' \n To create a cluster for 'orly' Enter   '2' \n To create a cluster for 'ely' Enter    '3' "
//       )
//     );
//     //to get num
//     let num = prompt();
//     if (num == 3) {
//       console.log(chalk.green("create cluster start!"));

//       var spawn = require("child_process").spawn,
//         child;
//       child = spawn("powershell.exe", [
//         "eksctl create cluster --name ely --region eu-north-1 --node-type t3.large --nodes 2 --nodes-min 1 --nodes-max 3",
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

// nautilus1
//   .command("create-cluster3")
//   .description("create a new cluster in Aws")
//   .action(() => {
//     const homeDirectory = os.homedir();
//     //const fileContents = fs.readFileSync("./configFile.json", "utf8");
//     const fileContents = fs.readFileSync(
//       `${homeDirectory}/.nautilus-cli/configFile.json`,
//       "utf8"
//     );
//     try {
//       ////take from the file config
//       const data = JSON.parse(fileContents);
//       ////take astPath from the data from the file config
//       const clusters = data.clusters;
//       console.log("Please enter the command \n");
//       clusters.forEach(myFunction);
//       function myFunction(item, index, arr) {
//         console.log(
//           chalk.blue(`To create a cluster for ${item} enter ${index}`)
//         );
//       }
//       let num = prompt();
//       var spawn = require("child_process").spawn,
//         child;
//       child = spawn("powershell.exe", [
//         `eksctl create cluster --name ${clusters[num]} --region eu-north-1 --node-type t3.large --nodes 2 --nodes-min 1 --nodes-max 3`,
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

// nautilus1
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

// nautilus1
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

//nautilus1;
//   .command("test-ps1")
//   .description("ps1 script ")
//   .action(() => {
//     var startStr = fs
//       .readFileSync(path.join(__dirname, "/powerShellScript/createCluster.ps1"))
//       .toString();
//     ps.addCommand("& {" + startStr + "} \n");
//   });

// nautilus1
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
