#!/usr/bin/env node

"use strict";

const exec = require('child_process').exec;
const minimist = require('minimist');

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
  getAllReposNames(args.name, args.org, function(err, repos) {
    if (err) {
      throw err;

    } else {
      // console.log('repos: ', repos);

      // clone all repos
      let promises = repos.map(cloneRepo);

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
