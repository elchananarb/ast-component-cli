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
const { Console } = require("console");

var spawn = require("child_process").spawn,
  child;
child = spawn("powershell.exe", [
  "eksctl delete cluster -n N-Ely -r eu-north-1",
]);

var scriptOutput = "";
child.stdout.setEncoding("utf8");
child.stdout.on("data", function (data) {
  //Here is where the output goes
  console.log(chalk.green(data));

  data = data.toString();
  scriptOutput += data;
  //find_cluster=scriptOutput;
  console.log(typeof scriptOutput);
});

child.stderr.setEncoding("utf8");
child.stderr.on("data", function (data) {
  //Here is where the error output goes

  console.log("stderr: " + data);

  data = data.toString();
  scriptOutput += data;
});

child.stdout.on("exit", function () {
  console.log("Powershell Script finished");
});
child.stdin.end(function () {
  console.log("Powershell Script ddddddddddddd");
});
