#!/usr/bin/env node

"use strict";

const exec = require('child_process').exec;
const minimist = require('minimist');
const fs = require('fs');
const home = require('os').homedir();

const getAllReposNames = require('./getAllReposNames');
const cloneRepo = require('./cloneRepo');

var args = minimist(process.argv.slice(2), {
  boolean: ['org', 'v', 'version']
});

if (args.v || args.version) {
  exec('npm show wsinit version', function(err, stdout, stderr) {
    if (err) {
      throw err;

    } else {
      if (stderr) console.log(stderr);
      process.stdout.write(stdout);
    }
  });

} else {

  // get credentials
  fs.readFile(`${home}/.wsinit.json`, 'utf-8', function(err, data) {
    if (err) {
      throw err;

    } else {

      data = JSON.parse(data);
      let at = data.at;
      let user = data.user;

      console.log('name:', args.name);
      console.log('org:', args.org);
      console.log('user:', user);
      console.log('at: ', at);

      getAllReposNames(args.name, args.org, user, at, function(err, repos) {
        if (err) {
          throw err;

        } else {
          // console.log('repos: ', repos);

          // clone all repos
          let promises = repos.map(function(repo) {
            return cloneRepo(repo, at);
          });

          Promise.all(promises)
          .then(results => {
            console.log('Done');
          })
          .catch(err => {
            throw err;
          });
        }
      });
    }
  });
}
