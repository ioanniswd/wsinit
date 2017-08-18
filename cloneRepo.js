"use strict";

const exec = require('child_process').exec;
const home = require('os').homedir();

const isPathValid = require('./isPathValid');

const at = require('./cred').at;

module.exports = function(repo) {

  var path;

  if(isPathValid(repo.local_path)) {
    path = `${repo.local_path}/${repo.name}`;

  } else {
    path = `${home}/repos/${repo.name}`;
  }

  return new Promise(function(resolve, reject) {
    exec(`git clone -o upstream "https://${at}@github.com/${repo.full_name}.git" ${path}`, function(err, stdout, stderr) {
      if(err) {
        reject(err);

      } else {
        if(stderr) console.log(stderr);
        // console.log(stdout);
        resolve(path);
      }
    });
  });
};
