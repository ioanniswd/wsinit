#!/usr/bin/env node

"use strict";

const exec = require('child_process').exec;
const minimist = require('minimist');
const fs = require('fs');
const home = require('os').homedir();

const getAllReposNames = require('./getAllReposNames');
const cloneRepo = require('./cloneRepo');
const initCred = require('./initCred');

var args = minimist(process.argv.slice(2), {
  boolean: ['org', 'v', 'version']
});

function getCred(done) {
  fs.readFile(`${home}/.wsinit.json`, 'utf-8', function(err, data) {
    if (err && err.code != 'ENOENT') {
      done(err);

    } else {
      if (err && err.code == 'ENOENT') {
        console.log('Credentials file was not found');
        initCred(function(err, message, cred) {
          if (err) {
            done(err);

          } else {
            console.log('Credentials initialized');
            let user = cred.user;
            let at = cred.at;
            done(null, user, at);

          }
        });
      } else {
        data = JSON.parse(data);
        let user = data.user;
        let at = data.at;
        done(null, user, at);
      }
    }
  });
}

if (args.v || args.version) {
  exec('npm show wsinit version', function(err, stdout, stderr) {
    if (err) {
      throw err;

    } else {
      if (stderr) console.log(stderr);
      process.stdout.write(stdout);
    }
  });

} else if (args.cred) {
  // initialize credentials
  initCred(function(err, message) {
    if (err) {
      throw err;
    } else {
      console.log(message);
    }
  });
} else {

  // get credentials
  getCred(function(err, user, at) {
    if(err) {
      throw err;

    } else {
      // console.log('name:', args.name);
      // console.log('org:', args.org);
      // console.log('user:', user);
      // console.log('at: ', at);

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
