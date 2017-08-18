"use strict";

const request = require('request');
const user_agent_header = require('./cred').user_agent_header;

module.exports = function(name, org, done) {

  var url = "https://api.github.com/";

  // if searching for organization
  if(org) {
    url += 'orgs/';
  } else {
    url += `users/`;
  }

  url += `${name}/repos`;

  request({
    url: url,
    headers: {
      'User-Agent': user_agent_header
    }
  }, function(err, res, body) {
    if(err) {
      done(err);
    } else {
      body = JSON.parse(body);
      // console.log(body[0]);
      // console.log('body[0]:', Object.keys(body[0]));

      let repos = [];

      body.forEach(function(repo) {
        repos.push({
          name: repo.name,
          clone_url: repo.clone_url,
          local_path: repo.description,
        });
      });
      // console.log('repos: ', repos);
      done(null, repos);
    }
  });

};
