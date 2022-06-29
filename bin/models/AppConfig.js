const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const prompt = require("prompt-sync")({ sigint: true });
var spawn = require("child_process").execFileSync,
  child;
const printData = require("./printData.js");
const os = require("os");
const fs = require("fs");

const homeDirectory = os.homedir();
const nautilus_cli_dir_path = `${homeDirectory}/.nautilus-cli`;
const aws_file_credentials = `${homeDirectory}/.aws`;
const config_file_path = `${nautilus_cli_dir_path}/configFile.json`;

function up_cli_config(params) {}

let sso_format_login = {
  sso_account_id: "822112283600",
  sso_role_name: "AdministratorAccess",
  sso_region: "eu-west-1",
  sso_access_token: "",
};
let credentials_file_format_login = {
  accessKeyId: "",
  secretAccessKey: "",
  sessionToken: "",
};

let configeureNau = {
  astPath: "C:/Users/elchanana/IdeaProjects/ast/helm",
  username: "elchanan.arbiv@checkmarx.com",
  jfrogToken: "",

  astOperator: "",
  astComponents: "",
  componenIntegration: "",
  componentMetrics: "",
  componentPolicyManagement: "",

  region: "eu-west-3",
  devName: "",
  teamName: "",
  clusters: [
    "Nautilus-Igor",
    "Nautilus-Orly",
    "Nautilus-Jorge",
    "Nautilus-Shifra",
    "Nautilus-Chaya",
    "Nautilus-Ely",
    "N-Ely",
  ],
  regions: ["eu-west-2", "eu-west-3", "eu-north-1"],
  services: [
    {
      name: "ast-flow-publisher",
      path: "",
      chartPath: "/helm/charts/ast-flow-publisher",
    },
    {
      name: "ast-flow-listener",
      path: "",
      chartPath: "",
    },
    {
      name: "integrations-repos-manager",
      path: "",
      chartPath: "",
    },
    {
      name: "integrations-datastore",
      path: "",
      chartPath: "",
    },
    {
      name: "feedback-app",
      path: "",
      chartPath: "",
    },
  ],
};

let aws_credentials_ = {
  astPath: "C:/Users/elchanana/IdeaProjects/ast/helm",
  username: "elchanan.arbiv@checkmarx.com",
  jfrogToken: "",
};

//##########number 1
function write_to_file_credentials_for_sso_login() {
  const aws_file_credentials = `${homeDirectory}/.aws/credentials`;
  var sso_log_credentials =
    "[default]\nsso_start_url=https://d-93670137ee.awsapps.com/start#/\nsso_region=eu-west-1\nsso_account_id=822112283600\nsso_role_name=AdministratorAccess";

  fs.writeFile(aws_file_credentials, `${sso_log_credentials}`, (err) => {
    if (err) throw err;
    fs.readdir(aws_file_credentials, (err, result) => {
      //console.log(result);
      console.log("Created directory sso!");
      crete_token_sso_in_cache();
    });
  });
}
////######number 2
function crete_token_sso_in_cache() {
  try {
    var spawn = require("child_process").spawn,
      child;
    child = spawn("powershell.exe", ["aws sso login --profile default"]);
  } catch (err) {
    console.error(err);
  }
  printData.printData(child);
  get_aws_accessToken_from_cache();
}

////######number 3
function get_aws_accessToken_from_cache() {
  const aws_file_credentials = `${homeDirectory}/.aws/sso/cache/5206c3e1f5b52c87e9557fbff4d6953b0b424bcb.json`;
  //dataa = "";
  const fileContents = fs.readFileSync(aws_file_credentials, "utf8");
  ////take from the config sso
  const data_configFile_sso = JSON.parse(fileContents);

  printdata(data_configFile_sso);
}
//##folowo to number3
function printdata(sso_file_cache) {
  // console.log(dataa);
  // console.log(sso_file_cache.startUrl);
  // console.log(sso_file_cache.region);
  // console.log(sso_file_cache.accessToken);
  write_to_file_config_for_sso_login(sso_file_cache);
}

//#####number 4### set in .aws config file adminstrtor
function write_to_file_config_for_sso_login(sso_file_cache) {
  const aws_file_credentials = `${homeDirectory}/.aws/config`;
  var sso_log_config =
    "[profile 822112283600_AdministratorAccess]\nregion = eu-west-1\noutput = json";
  fs.writeFile(aws_file_credentials, `${sso_log_config}`, (err) => {
    if (err) throw err;
    fs.readdir(aws_file_credentials, (err, result) => {
      //console.log(result);
      console.log("Created directory sso_config!");
      //??????crete_token_sso_in_cache();
      get_aws_sso_temporary_credentials(sso_file_cache);
    });
  });
}

//#####number 5### #aws sso get-role..
function get_aws_sso_temporary_credentials(sso_file_cache) {
  //set to sso config token from the cache
  sso_format_login.sso_access_token = sso_file_cache.accessToken;

  try {
    var spawn = require("child_process").spawn,
      child;
    child = spawn("powershell.exe", [
      //`eksctl create cluster --name ${clusters[cluster]} --region ${regions[region]} --node-type t3.large --nodes 2 --nodes-min 1 --nodes-max 3`,
      `aws sso get-role-credentials --account-id ${sso_format_login.sso_account_id} --role-name ${sso_format_login.sso_role_name} --access-token ${sso_format_login.sso_access_token} --region ${sso_format_login.sso_region}`,
    ]);
  } catch (err) {
    console.error(err);
  }
  //printData.printData(child);
  Data_for_sso_credenials(child);
}

//#####number 6 set in .aws credentials ################
//###number 6A ## rade the data from
const credentials_arry = ["", "", ""];
var credentials = "";
var arry_context = [];
var credentials_end = "";
function Data_for_sso_credenials(child) {
  child.stdout.setEncoding("utf8");
  child.stdout.on("data", function (data) {
    credentials += data;
    arry_context += data;
  });

  child.stderr.setEncoding("utf8");
  child.stderr.on("data", function (data) {
    console.log("stderr: " + data);
    data = data.toString();
    credentials += data;
  });

  child.on("exit", function () {
    credentials_end = credentials;
    get_crede_s_k_t(credentials_end);
  });
  child.stdin.end();
}
//###number 6b ## Extract the data certificates
function get_crede_s_k_t(credentials_end) {
  let pattern1 = /"[^"]*(?=",)/g;
  let result1 = credentials_end.match(pattern1);
  console.log(result1);

  let itemsProcessed = 0;

  result1.forEach(deletegrshim);

  function deletegrshim(item, index, arr) {
    a = item;
    var aa = a.replace(/"/g, "");
    credentials_arry[index] = aa;
    itemsProcessed += 1;
    console.log(itemsProcessed);

    if (itemsProcessed === arr.length) {
      write_to_aws_credentials_file_login_format(credentials_arry);
      //credentials_arry.forEach(simplePrint);
      // console.log(arr.length);
    }
  }

  function simplePrint(item, index, arr) {
    console.log(index + "for" + item);
  }
}

/// 6C#### write to aws credentials Mfile login format
function write_to_aws_credentials_file_login_format(credentials_arry) {
  console.log(credentials_arry);
  const aws_file_credentials = `${homeDirectory}/.aws/credentials`;
  var sso_log_config = `[822112283600_AdministratorAccess]\naws_access_key_id=${credentials_arry[0]}\naws_secret_access_key= ${credentials_arry[1]}\naws_session_token= ${credentials_arry[2]}`;
  fs.writeFile(aws_file_credentials, `${sso_log_config}`, (err) => {
    if (err) throw err;
    fs.readdir(aws_file_credentials, (err, result) => {
      console.log(result);
      console.log("Created directory sso_config!");
      //??????crete_token_sso_in_cache();
      //get_aws_sso_temporary_credentials(sso_file_cache);
    });
  });
}

// function write_to_aws_credentials_file_sso_login_format(sso_format_login) {
//   fs.writeFile(aws_file_credentials, `${JSON.stringify(sso_format_login)}`, (err) => {
//     if (err) throw err;
//     fs.readdir(aws_file_credentials, (err, result) => {
//       //console.log(result);
//       console.log("change aws file credentials to sso login");
//     });
//   });
// }

// function read_aws_credentials_file() {

//   fs.readdir(aws_file_credentials, (err, result) => {
//     //console.log(result);
//     console.log("change aws file credentials to sso login");
//   });
// };

function Login_to_Docker() {
  //problem if not exisit
  try {
    //const fileContents = fs.readFileSync("./configFile.json", "utf8");
    const fileContents = fs.readFileSync(
      `${homeDirectory}/.nautilus-cli/configFile.json`,
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
//######### from here done

function create_file_config(configeureNau) {
  fs.writeFile(config_file_path, `${JSON.stringify(configeureNau)}`, (err) => {
    if (err) throw err;
    fs.readdir(config_file_path, (err, result) => {
      //console.log(result);
      console.log("Created directory!");
    });
  });
}

function create_dir_nautilus_cli() {
  fs.mkdir(nautilus_cli_dir_path, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(chalk.green("We create a directory named .nautilus-cli"));
    }
  });
}

function Config_nautilus_cli() {
  //check if a dir exists
  if (!fs.existsSync(nautilus_cli_dir_path)) {
    create_dir_nautilus_cli();
  }

  console.log(chalk.blue("Please enter the 'yourname@checkmarx.com' \n"));
  let yourname = prompt();
  yourname = remove_spaces(yourname);
  configeureNau.username = yourname;

  console.log(chalk.blue("Please enter the 'password <you-jfrog-token>' \n"));
  let jfrog_token = prompt();
  jfrog_token = remove_spaces(jfrog_token);
  configeureNau.jfrogToken = jfrog_token;

  let flag_path_exist = false;

  let astOperator = "";
  let astComponents = "";
  let componenIntegration = "";
  let componentMetrics = "";
  let componentPolicyManagement = "";

  while (!flag_path_exist) {
    flag_path_exist = true;

    console.log(
      chalk.blue(
        "Please enter the Base of AST components For example 'C:Users//elchanana//IdeaProjects' \n"
      )
    );
    let baseComponent = prompt();
    baseComponent = remove_spaces(baseComponent);

    astOperator = `${baseComponent}\\ast-operator`;
    astComponents = `${baseComponent}\\ast-Components`;
    componenIntegration = `${baseComponent}\\component-integration`;
    //componentMetrics = `${baseComponent}\\component-ast-metrics`;
    componentMetrics = `${baseComponent}\\component-metrics`;
    componentPolicyManagement = `${baseComponent}\\component-policy-management`;

    const paths = new Array(
      astOperator,
      astComponents,
      componenIntegration,
      componentMetrics,
      componentPolicyManagement
    );
    paths.forEach(myFunction);
    function myFunction(value, index, array) {
      if (!fs.existsSync(value)) {
        flag_path_exist = false;
        console.log(chalk.blue(`the path "${value}"`));
        console.log(chalk.red(`not exist try again\n`));
      }
    }
  }

  configeureNau.astOperator = astOperator;
  configeureNau.astComponents = astComponents;
  configeureNau.componenIntegration = componenIntegration;
  configeureNau.componentMetrics = componentMetrics;
  configeureNau.componentPolicyManagement = componentPolicyManagement;
  configeureNau.username = yourname;
  configeureNau.jfrogToken = jfrog_token;

  create_file_config(configeureNau);
  console.log();
}

function remove_spaces(el) {
  var val = el.replace(/\s/g, "");
  return val;
}

module.exports.Config_nautilus_cli = Config_nautilus_cli;
module.exports.Login_to_Docker = Login_to_Docker;
module.exports.get_aws_sso_temporary_credentials =
  get_aws_sso_temporary_credentials;
module.exports.get_aws_accessToken_from_cache = get_aws_accessToken_from_cache;
module.exports.write_to_file_credentials_for_sso_login =
  write_to_file_credentials_for_sso_login;

module.exports.up_cli_config = up_cli_config;

// module.exports = { Config_nautilus_cli };
// module.exports = { Login_to_Docker };

//path to ast-operator /ast-components /component-integration /component-metrics /component-policy-managementast-operator

//ast
// console.log(chalk.blue("Please enter the 'ast' path \n"));
// let path = prompt();
// while (!fs.existsSync(path)) {
//   console.log(chalk.red("path not exists"));
//   console.log(chalk.blue("Please  a valid 'ast' path \n"));
//   path = prompt();
// }
// configeureNau.astPath = path;

// //ast-operator
// console.log(chalk.blue("Please enter the 'ast-operator' path \n"));
// let astOperator = prompt();
// while (!fs.existsSync(path)) {
//   console.log(chalk.red("path not exists"));
//   console.log(chalk.blue("Please  a valid 'ast-operator' path \n"));
//   path = prompt();
// }
// configeureNau.astOperator = astOperator;

// //ast-components
// console.log(chalk.blue("Please enter the 'ast-components' path \n"));
// let astComponents = prompt();
// while (!fs.existsSync(path)) {
//   console.log(chalk.red("path not exists"));
//   console.log(chalk.blue("Please  a valid 'ast' path \n"));
//   path = prompt();
// }
// configeureNau.astComponents = astComponents;

// //component-integration
// console.log(chalk.blue("Please enter the 'component-integration' path \n"));
// let componenIntegration = prompt();
// while (!fs.existsSync(path)) {
//   console.log(chalk.red("path not exists"));
//   console.log(chalk.blue("Please  a valid 'ast' path \n"));
//   path = prompt();
// }
// configeureNau.componenIntegration = componenIntegration;

// //component-metrics
// console.log(chalk.blue("Please enter the 'component-metrics' path \n"));
// let componentMetrics = prompt();
// while (!fs.existsSync(path)) {
//   console.log(chalk.red("path not exists"));
//   console.log(chalk.blue("Please  a valid 'ast' path \n"));
//   path = prompt();
// }
// configeureNau.componentMetrics = componentMetrics;

// //component-policy-management
// console.log(
//   chalk.blue("Please enter the 'component-policy-management' path \n")
// );
// let componentPolicyManagement = prompt();
// while (!fs.existsSync(path)) {
//   console.log(chalk.red("path not exists"));
//   console.log(
//     chalk.blue("Please  a valid 'component-policy-managementst' path \n")
//   );
//   path = prompt();
// }
// configeureNau.componentPolicyManagement = componentPolicyManagement;

//path to ast-operator /ast-components /component-integration /component-metrics /component-policy-managementast-operator
//######################################################

// function printData(child) {
//   var scriptOutput = "";
//   child.stdout.setEncoding("utf8");
//   child.stdout.on("data", function (data) {
//     //Here is where the output goes
//     console.log(chalk.green(data));

//     data = data.toString();
//     scriptOutput += data;
//   });

//   child.stderr.setEncoding("utf8");
//   child.stderr.on("data", function (data) {
//     //Here is where the error output goes

//     console.log("stderr: " + data);

//     data = data.toString();
//     scriptOutput += data;
//   });

//   child.stdout.on("exit", function () {
//     console.log("Powershell Script finished");
//   });
//   child.stdin.end();
// }

// Adding the code below to allow importing
// the functions in other files
//module.exports = { printData };`

// class AppConfig {

//   	  getConfig() {
//   		const home = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
//   		const path=`${home}/.nautilus/configFile.json`;
//   		if( fs.existsSync(path)) {
//   			return parseJson<AppConfig>(fs.readFileSync(path).toString());
//   		}
//   		return new AppConfig();
//   	}
//   requestHandler(request, response) {
//     response.end("Hello World");
//   }
// }
// module.exports = MyServer;

// // import { Service } from "./Service";
// // import * as fs from "fs";
// // import { parseJson } from "../common/parseJson";

// // /* eslint-disable @typescript-eslint/no-empty-function */
// // export class AppConfig{

// // 	astPath: string;
// // 	region: string;
// // 	devName: string;
// // 	teamName: string;
// // 	services: Service[];
// // 	clusters: string[];
// // 	regions: string[];
// // 	isWindows:boolean;
// // 	private static instance: AppConfig

// // 	constructor(){
// // 		this.isWindows= !(process.env.COMMAND_MODE || "").includes('unix');
// // 	}

// // 	private static getConfig(): AppConfig{
// // 		const home = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
// // 		const path=`${home}/.nautilus/configFile.json`;
// // 		if( fs.existsSync(path)) {
// // 			return parseJson<AppConfig>(fs.readFileSync(path).toString());
// // 		}
// // 		return new AppConfig();
// // 	}

// // }
