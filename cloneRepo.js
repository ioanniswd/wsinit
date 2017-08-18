"use strict";

const exec = require('child_process').exec;
const home = require('os').homedir();

const isPathValid = require('./isPathValid');

module.exports = function(repo) {

  var path = `${home}/`;

  if(isPathValid(repo.local_path)) {
    path += `${repo.local_path}/${repo.name}`;

  } else {
    path += `repos/${repo.name}`;
  }

  return new Promise(function(resolve, reject) {
    exec(`git clone -o upstream ${repo.clone_url} ${path}`, function(err, stdout, stderr) {
      if(err) {
        reject(err);

      } else {
        if(stderr) console.log(stderr);
        console.log(stdout);
        resolve(path);
      }
    });
  });
};
