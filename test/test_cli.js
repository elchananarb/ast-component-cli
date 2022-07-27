const printData = require("../bin/models/printData");
const fs = require("fs");
const { exit } = require("process");

function test_cli_after_changeA() {
  test_cli_after_changeB().then((result_test) => {
    // pppp(result_test);
    console.log("ocell");

    // console.log(result_test);
  });
}

function test_cli_after_changeB() {
  let myPromise = new Promise((resolve, reject) => {
    process.chdir("C:/Projects/Js/nautilus1");

    // //after Change the directory can be input command in new directory
    var spawn = require("child_process").spawn,
      child;

    child = spawn("powershell.exe", ["node .\\bin\\index.js m"]);
    //printData.printData(child);
    //C:\Users\elchanana\.aws\sso\cache
    fs.watch(
      "C:/Users/elchanana/.aws/sso/cache/5206c3e1f5b52c87e9557fbff4d6953b0b424bcb.json",
      (eventType, filename) => {
        console.log("The file ", filename, " was modified!");

        // We can look for different types of changes on a file
        // using the event type like: rename, change, etc.
        console.log("It was a ", eventType, " event type.");
        console.log("ygfj");
        printData.printData(child);
        exit();
      }
    );
    console.log("ocelSXFSFl");

    resolve(child);
  });

  return myPromise;
}

function pppp(result_test) {
  console.log(result_test);
  //   console.log(" pppp");
}
module.exports.test_cli_after_changeA = test_cli_after_changeA;
module.exports.test_cli_after_changeB = test_cli_after_changeB;
