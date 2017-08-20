"use strict";

const exec = require('child_process').exec;
const home = require('os').homedir();

const isPathValid = require('./isPathValid');

module.exports = function(repo, at) {

  var path = '';
  var url = 'https://';

  if(isPathValid(repo.local_path)) {
    path = `${repo.local_path}/${repo.name}`;
  }

  if(at) {
    url += `${at}@`;
  }

  url += `github.com/${repo.full_name}.git`;

  return new Promise(function(resolve, reject) {
    exec(`git clone -o upstream "${url}" ${path}`, function(err, stdout, stderr) {
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
