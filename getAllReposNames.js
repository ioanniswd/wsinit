"use strict";

const request = require('request');

const user = require('./cred').user;
const at = require('./cred').at;

module.exports = function(name, org, done) {

  var url = "https://api.github.com/";

  // if searching for organization
  if(org) {
    url += 'orgs/';
  } else {
    url += `users/`;
  }

  url += `${name}/repos?access_token=${at}`;

  console.log('url:', url);

  request({
    url: url,
    headers: {
      'User-Agent': user
    }
  }, function(err, res, body) {
    if(err) {
      done(err);
    } else {
      // console.log(body);
      body = JSON.parse(body);
      // console.log(body[0]);
      // console.log('body[0]:', Object.keys(body[0]));

      let repos = [];

      body.forEach(function(repo) {
        repos.push({
          name: repo.name,
          full_name: repo.full_name,
          local_path: repo.description,
        });
      });
      // console.log('repos: ', repos);
      done(null, repos);
    }
  });

};
