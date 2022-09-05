#!/usr/bin/env node
const ast = require("commander");
const chalk = require("chalk");
const clear = require("clear");
const prompt = require("prompt-sync")({ sigint: true });
var spawn = require("child_process").execFileSync,
  child;
const os = require("os");
//const figlet = require("figlet");



const fs = require("fs");
const AppConfig = require("./models/AppConfig");
const Switch = require("./commands/switch");

const eksctl_commands = require("./commands/eksctl_commands");
const edit_yaml_file = require("./edit-files/edit_yaml_file");
const printData = require("./models/printData.js");
const commands_init = require("./commands/commands_init");
const { option } = require("commander");

const homeDirectory = os.homedir();
const ast_cli_dir_path = `${homeDirectory}/.ast-cli`;
const config_file_path = `${ast_cli_dir_path}/configFile.json`;


////npm run ast
////node .\bin\index.js
////pkg .\bin\index.js  


ast
  .command("init")
  .alias("i")
  .description("create a directory named .ast-cli")
  .action(() => {
    clear();
    AppConfig.Config_ast_cli();
  });
ast
  .command("morning")
  .alias("m")
  .description("set aws credentials every day")
  .action(() => {
    // clear();
    AppConfig.write_to_file_credentials_for_sso_login();
  });
ast
  .command("create-cluster")
  .alias("crec")
  .description("create a new cluster in Aws")
  .action(() => {
    clear();
    eksctl_commands.create_cluster();
  });

ast
  .command("delete-cluster")
  .description("delete a cluster in Aws")
  .alias("dc")
  .action(() => {
    eksctl_commands.delete_cluster();
  });

  ast
  .command("Ast_Components_Installation_AWS_Nimrod")
  .alias("aci")
  .description("Ast Components Installation in AWS from Nimrod")
  .action(() => {
    clear();
    eksctl_commands.Ast_Components_Installation_AWS_Nimrod();
  });

ast
  .command("get-contexts")
  .description("kubectl config get-contexts")
  .alias("gcg")
  .action(() => {
    eksctl_commands.get_contexts();
  });
ast
  .command("Get-current-context")
  .description("Get current context")
  .alias("gcc")
  .action(() => {
    eksctl_commands.Get_current_context();
  });

  ast
  .command("Uninstallation_operator_platform")
  .alias("unop")
  .description("Uninstallation operator platform in aws Nimrod")
  .action(() => {
    clear();
    eksctl_commands.Uninstallation_operator_platform();
  });
  ast
  .command("Uninstallation_Ast_Components_AWS_Nimrod")
  .alias("uaci")
  .description("Uninstallation Ast Components in AWS from Nimrod")
  .action(() => {
    clear();
    eksctl_commands.Uninstallation_Ast_Components_AWS_Nimrod();
  });


  ast
  .command("connect-Cluster")
  .alias("conc")
  .description("connect to Cluster in Aws")
  .action(() => {
    eksctl_commands.Connect_cluster();
  });

ast
  .command("to-delete-context")
  .alias("tdc")
  .description("to delete context config")
  .action(() => {
    eksctl_commands.delete_Connect_cluster();
  });

ast
  .command("set_Env")
  .usage("<command> -n <name> -v <value>")
  .alias("senv")
  .option("-n, --name_env <name env>", "name env")
  .option("-v, --value <value env>", "value env")
  .description("set env for switch from local to remote")
  .action((option) => {
    //pr(option);
    if (option.name_env) {
      //console.log("name:", option.name_env);
    } else {
      console.log("option '-n, --name_env <name env>' argument missing");
      process.exit(1);
    }
    if (option.value) {
      //console.log("value:", option.value);
    } else {
      console.log("option '-v, --value <value env>' argument missing");
      process.exit(1);
    }
    Switch.set_Env(option);
  });

ast
  .command("remove_Env")
  .alias("renv")
  .option("-n, --name_env <name env to remove>", "name env")
  .description("remov env")
  .action((option) => {
    //pr(option);
    if (option.name_env) {
    } else {
      console.log("option '-n, --name_env <name env>' argument missing");
      process.exit(1);
    }

    Switch.remove_Env(option);
  });


  // ast
  // .command("Only_Installation_Ast_ComponentAWS_Nimrod")
  // .alias("oast")
  // .description("omly Installation in Ast Components AWS from Nimrod")
  // .action(() => {
  //   clear();
  //   eksctl_commands.Ast_Components_Installation_AWS_Nimrod();
  // });
  





// //from here less use
ast
.command("Install-Ast-Components")
.alias("iac")
.description("Install Ast Components")
.action(() => {
  clear();
  commands_init.Install_Ast_Components();
});

ast
  .command("Get_Traefik_url")
  .alias("gtu")
  .description("Get_Traefik_url")
  .action(() => {
    clear();
    commands_init.Get_Traefik_url();
  });

ast
  .command("del_all_pods in cluster")
  .alias("dela")
  .description("del all pods in cluster")
  .action(() => {
    clear();
    eksctl_commands.uninstall_all();
  });


  // ast
  // .command("Login-to-Docker")
  // .alias("ltd")
  // .description("Login to Docker")
  // .action(() => {
  //   clear();
  //   commands_init.Login_to_Docker_in_init_file();
  // });
  // ast
// .command("Update_Url_in_all_components_tags")
// .alias("uuc")
// .description("Update Url in all components tags")
// .action(() => {
//   clear();
//   var trafik_for_up="a8121b65c99144fe894d492a8ca94ccf-1882965643.eu-north-1.elb.amazonaws.com";
//   commands_init.Update_Url_in_all_components_tags(trafik_for_up);
// });

// ast
// .command("Update_Url_in_ast_components")
// .alias("uuast")
// .description("Update Url in ast components tags")
// .action(() => {
//   clear();
//   eksctl_commands.Update_Url_in_ast_components();
// });

// ast
//   .command("Install-Metrics-Components")
//   .alias("imc")
//   .description("Install Metrics Components")
//   .action(() => {
//     clear();
//     commands_init.Install_Metrics_Components();
//   });



  // ast
  // .command("uninstall-Operator")
  // .alias("uno")
  // .description("uninstall Ast Operator")
  // .action(() => {
  //   clear();
  //   commands_init.unInstall_Operator();
  // });





  // ast
  // .command("Operator-values-Tag")
  // .alias("ovt")
  // .description("Change Operator values Tag")
  // .action(() => {
  //   clear();
  //   edit_yaml_file.Change_Operator_values_Tag();
  // });

  
// ast
// .command("Install-Operator")
// .alias("io")
// .description("Install Ast Operator")
// .action(() => {
//   clear();
//   commands_init.Install_Operator();
// });



//   ast
//   .command("fortest")
//   .alias("te")
//   .description("fortest")
//   .action(() => {
//     clear();
//     eksctl_commands.test("ac6576fd92efd4b55aba9e805cfe2f43-1599807202.eu-north-1.elb.amazonaws.com");
//   });
// ast
//   .command("Create_local_cluster_orly")
//   .alias("clc")
//   .description("Create local cluster from orly")
//   .action(() => {
//     clear();
//     eksctl_commands.Create_local_components_clusterA();
//   });
//   ast
//   .command("Create_local_cluster_shifra")
//   .alias("clc")
//   .description("Create local cluster from shifra")
//   .action(() => {
//     clear();
//     eksctl_commands.Create_aws_components_clusterA_shifra();
//   });
//   ast
//   .command("Create_local_cluster_igor")
//   .alias("clci")
//   .description("Create local cluster from igor")
//   .action(() => {
//     clear();
//     eksctl_commands.Create_local_components_clusterAaigor();
//   });
//   ast
//   .command("Create_in_aws_cluster_shifra")
//   .alias("cac")
//   .description("Create in aws cluster shifra")
//   .action(() => {
//     clear();
//     eksctl_commands.Create_in_aws_cluster_shifra();
//   });



  // ast
//   .command("Login-to-Docker")
//   .alias("ltd")
//   .description("Login to Docker")
//   .action(() => {
//     clear();
//     AppConfig.Login_to_Docker();
//   });

// ast
//   .command("Install_the_Policy_Management_Component")
//   .alias("ipm")
//   .description("nstall the Policy Management Component")
//   .action(() => {
//     clear();
//     commands_init.Install_the_Policy_Management_Component();
//   });

// ast
//   .command("from_orly_Update_Url_in_all_components_tags")
//   .alias("fuuc")
//   //צ במקרה שזה כמו של אורלי
//   .description("from orly Update Url in all components tags")
//   .action(() => {
//     clear();
//     commands_init.Update_Url_in_all_components_tags_orly();
//   });
// ast
//   .command("test_cli_after_change")
//   .alias("tcac")
//   .description("To Test a Command-Line Tool after change")
//   .action(() => {
//     // clear();
//     test_cli.test_cli_after_changeA();
//   });
// ast
//   .version("0.1.0")
//   .command("switch")
//   .usage("<command> <option> <name>")
//   .alias("s")
//   .option("-r, --remote <name>", "command to switch to remote")
//   .option("-l, --local <name>", "command to switch to local")
//   .action((option) => {
//     if (option.remote) {
//       console.log("remote:", option.remote);
//       Switch.switch_to_remote(option);
//     }
//     if (option.local) {
//       console.log("local:", option.local);
//       Switch.switch_to_local(option);
//     }
//     //console.log(program);
//   });

// ast
//   .command("test_delete_re_af_up_cli_config")
//   .alias("dupcon")
//   .action(() => {
//     AppConfig.delete_from_config_file("", "astPath");
//   });
// ast
//   .command("test_add_re_af_up_cli_config")
//   .alias("aupcon")
//   .action(() => {
//     const where = "astOperator2";
//     const value = "efdscdxz22";
//     AppConfig.add_to_config_file(where, value);
//   });
// ast
//   .command("test_up_and_change_re_af_up_cli_config")
//   .alias("uupcon")
//   .action(() => {
//     const where = "astPath";
//     const value = "efdscdx111";
//     AppConfig.up_and_change_re_af_up_cli_config(where, value);
//   });

// ast
//   .command("up_cli_config")
//   .usage("<command> -n <name> -v <value>")
//   .alias("upcli")
//   .option("-w, --where <name>", "name")
//   .option("-v, --value <value>", "value")
//   .option("-r, --remove [remove]", "remove")
//   .option("-a, --add [add]", "add")
//   //צריך לסיים כאם את האופציה של up
//   //.option("-u, --up [up]", "up")
//   .description("set env for switch from local to remote & -1")
//   .action((option) => {
//     //pr(option);
//     if (!option.where) {
//       console.log("option '-w, --where <where>' argument missing");
//       process.exit(1);
//     }
//     if (!option.value) {
//       console.log("option '-v, --value <value>' argument missing");
//       process.exit(1);
//     }
//     if (!option.remove && !option.add) {
//       console.log("option '-r or -a  argument missing");
//       process.exit(1);
//     }
//     AppConfig.up_cli_config(option);
//   });

// ast
//   .command("delete_from_config")
//   .alias("dfc")
//   .description("delete_from_config if is arry lebntim.....")
//   .action(() => {
//     clear();
//     AppConfig.delete_from_config_file("clusters", "N-Ely");
//   });

// ast
//   .command("init_B")
//   .alias("ib")
//   .description("version B create a directory named .ast-cli")
//   .action(() => {
//     clear();
//     AppConfig.init_B();
//   });

//   ///from noe less importent
//   ast
//     .command("aaaa")
//     .description("display help for command")
//     .alias("a")
//     .action(() => {
//       console.log("pppp");
//       const os = require("os");
//       temp = `${process.cwd()}/powerShellScript/deleteCluster.ps1`;
//       console.log(temp);

//       var spawn = require("child_process").spawn,
//         child;

//       child = spawn("powershell.exe", ["ls"]);
//       printData.printData(child);
//     });

// ast
//   .command("init")
//   .alias("i")
//   .description("create a directory named .ast-cli")
//   .action(() => {
//     clear();
//     AppConfig.Config_ast_cli();
//   });
//   ast
//     .command("Ast-Upgrade")
//     .alias("au")
//     .description("Ast Upgrade")
//     .action(() => {
//       const fileContents = fs.readFileSync(config_file_path, "utf8");
//       try {
//         ////take from the file config
//         const data_configFile = JSON.parse(fileContents);

//         ////take astPath from the data_configFile from the file config
//         const astPath = data_configFile.astPath;
//         ////Change the directory
//         process.chdir(astPath);
//         // //after Change the directory can be input command in new directory
//         var spawn = require("child_process").spawn,
//           child;
//         child = spawn("powershell.exe", [
//           "helm dep up ast; helm upgrade main ast -f ./ast/values-customer.yaml -f ./ast/values-release-tags.yaml",
//         ]);
//       } catch (err) {
//         console.error(err);
//       }
//       printData.printData(child);
//     });

//   ast
//     .command("Build-Cluster")
//     .alias("bc")
//     .description("Build Cluster in Aws")
//     .action(() => {
//       const fileContents = fs.readFileSync(config_file_path, "utf8");
//       try {
//         ////take from the file config
//         const data_configFile = JSON.parse(fileContents);
//         ////take astPath from the data_configFile from the file config
//         const astPath = data_configFile.astPath;
//         console.log(astPath);
//         ////Change the directory
//         //process.chdir("C:/Users/elchanana/IdeaProjects/ast/helm");
//         process.chdir(astPath);
//         //console.log("Starting directory: " + process.cwd());
//         // //after Change the directory can be input command in new directory
//         var spawn = require("child_process").spawn,
//           child;
//         child = spawn("powershell.exe", [
//           "make ecr; helm dep up ast; helm upgrade main ast -f ./ast/values-customer.yaml -f ./ast/values-release-tags.yaml --install",
//         ]);
//       } catch (err) {
//         console.error(err);
//       }
//       printData.printData(child);
//     });
// ast
//   .command("Delete-Service")
//   .description("Delete Service")
//   .alias("dels")
//   .action(() => {
//     //const fileContents = fs.readFileSync("./configFile.json", "utf8");
//     const fileContents = fs.readFileSync(config_file_path, "utf8");
//     try {
//       ////take from the file config
//       const data_configFile = JSON.parse(fileContents);
//       ////take Service name from the file config
//       const services = data_configFile.services;
//       const services_arry = Object(services);

//       //console.log(typeof services_arry);
//       console.log(services_arry[0]["name"]);

//       //const service = services.firstOrDefault((x) => x.name == item);
//       //console.log(services[0]);

//       console.log(chalk.green("Please enter the number \n"));
//       services_arry.forEach(myFunction);
//       function myFunction(item, index, arr) {
//         console.log(
//           chalk.blue(`To delete a service  ${item["name"]} enter ${index}`)
//         );
//       }
//       let service = prompt();
//       var spawn = require("child_process").spawn,
//         child;
//       child = spawn("powershell.exe", [
//         `Deleting Service ${services_arry[service]["name"]}; kubectl delete deployment main-${services_arry[service]["name"]}`,
//       ]);
//     } catch (err) {
//       console.error(err);
//     }
//     printData.printData(child);
//   });

// ast
//   .command("Deploy-Service")
//   .description("Deploy Service")
//   .alias("deps")
//   .action(() => {
//     console.log("in construction");
//     //
//     // //const fileContents = fs.readFileSync("./configFile.json", "utf8");
//     // const fileContents = fs.readFileSync(
//     //   config_file_path,
//     //   "utf8"
//     // );
//     // try {
//     //   ////take from the file config
//     //   const data_configFile = JSON.parse(fileContents);
//     //   ////take astPath from the data_configFile from the file config
//     //   const services = data_configFile.services;
//     //   const services_arry = Object(services);

//     //   console.log(typeof services_arry);
//     //   console.log(services_arry[0]["name"]);

//     //   //const service = services.firstOrDefault((x) => x.name == item);
//     //   //console.log(services[0]);

//     //   console.log("Please enter the number \n");
//     //   services_arry.forEach(myFunction);
//     //   function myFunction(item, index, arr) {
//     //     console.log(
//     //       chalk.blue(`To delete a service  ${item["name"]} enter ${index}`)
//     //     );
//     //   }
//     //   let service = prompt();
//     //   var spawn = require("child_process").spawn,
//     //     child;
//     //   child = spawn("powershell.exe", [
//     //     `Deleting Service ${services_arry[service]["name"]}; kubectl delete deployment main-${services_arry[service]["name"]}`,
//     //   ]);
//     // } catch (err) {
//     //   console.error(err);
//     // }
//     // printData.printData(child);
//   });

// ast
//   .command("delete-cluster-gui")
//   .description("delete cluster with window")
//   .alias("dcg")
//   .action(() => {
//     const os = require("os");
//     temp = `${process.cwd()}/powerShellScript/deleteCluster.ps1`;
//     console.log(temp);

//     var spawn = require("child_process").spawn,
//       child;

//     child = spawn("powershell.exe", [`${temp}`]);
//     printData.printData(child);
//   });

ast
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

ast.parse(process.argv);
if (!ast.args.length) {
  ast.help();
}

// ast
//   .command("rmdir")
//   .argument("<username>", "user to login")
//   .argument("[password]", "password for user, if required", "no password given")
//   .action((username, password) => {
//     console.log("username:", username);
//     console.log("password:", password);
//   });

// ast
//   .command("switched-context")
//   .alias("sc")
//   .description("Switched to another context kubectl")
//   .action(() => {
//     clear();
//     eksctl_commands............();
//   });

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

// ast
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

// ast
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

// ast
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

// ast
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

//     //fs.mkdir(`${homeDirectory}/.ast-cli`);

//     //console.log(process.cwd() + `/node_modules`);
//   });

//ast;
//   .command("test-ps1")
//   .description("ps1 script ")
//   .action(() => {
//     var startStr = fs
//       .readFileSync(path.join(__dirname, "/powerShellScript/createCluster.ps1"))
//       .toString();
//     ps.addCommand("& {" + startStr + "} \n");
//   });

// ast
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

//     //fs.mkdir(`${homeDirectory}/.ast-cli`);

//     //console.log(process.cwd() + `/node_modules`);
//   });

// ast
//   .command("connect-Cluster_work_old")
//   .alias("conc")
//   .description("connect to Cluster in Aws")
//   .action(() => {
//     //const fileContents = fs.readFileSync("./configFile.json", "utf8");
//     const fileContents = fs.readFileSync(config_file_path, "utf8");
//     try {
//       ////take from the file config
//       const data_configFile = JSON.parse(fileContents);
//       ////take cluster name from the file config
//       const clusters = data_configFile.clusters;
//       console.log(chalk.green("Please choose the cluster to Connect \n"));
//       clusters.forEach(myFunction);
//       function myFunction(item, index, arr) {
//         console.log(chalk.blue(`Connect to a cluster ${item} enter ${index}`));
//       }
//       let cluster = prompt();

//       const regions = data_configFile.regions;
//       console.log(chalk.green("Please choose  region \n"));
//       regions.forEach(myFunction);
//       function myFunction(item, index, arr) {
//         console.log(
//           chalk.blue(`To Connect a cluster in ${item} enter ${index}`)
//         );
//       }
//       let region = prompt();

//       var spawn = require("child_process").spawn,
//         child;
//       child = spawn("powershell.exe", [
//         `eksctl utils write-kubeconfig --cluster=${clusters[cluster]} --region ${regions[region]}`,
//       ]);
//     } catch (err) {
//       console.error(err);
//     }
//     printData.printData(child);
//   });

// ast
//   .command("up_cli_config")
//   .usage("<command> -n <name> -v <value>")
//   .alias("upcli")
//   .option("-n, --name_env <name env>", "name env")

//   // .option("-v, --value <value>", "value")
//   // .option("-r, --remove")
//   // .option("-a, --add")
//   .description("update config file cli e.g add region or name cluster")
//   .action(() => {
//     // if (option.where_to_up) {
//     //   //console.log("name:", option.name_env);
//     // } else {
//     //   console.log(
//     //     "option '-w, --where_to_up <clusters || region>' argument missing"
//     //   );
//     //   process.exit(1);
//     // }
//     if (option.name_env) {
//       //console.log("value:", option.value);
//     } else {
//       console.log("option '-v, --value <value>' argument missing");
//       process.exit(1);
//     }
//     AppConfig.up_cli_config(option);
//   });
