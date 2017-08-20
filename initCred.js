"use strict";

const fs = require('fs');
const home = require('os').homedir();
const prompt = require('prompt');

module.exports = function(done) {

  var cred;

  function initCred(done) {
    var schema = {
      properties: {
        username: {
          description: 'Github username',
          type: 'string',
          required: true
        },
        at: {
          description: 'Github API access token',
          type: 'string',
          required: false
        }
      }
    };

    prompt.start();

    prompt.get(schema, function(err, result) {
      if (err) {
        done(err);

      } else {
        cred = {
          user: result.username,
          at: result.at
        };
        let data = JSON.stringify(cred, null, '\t');
        fs.writeFile(`${home}/.wsinit.json`, data, done);
      }
    });
  }

  fs.readFile(`${home}/.wsinit.json`, 'utf-8', function(err, data) {
    if (err && err.code != 'ENOENT') {
      throw err;

    } else {
      if (err && err.code == 'ENOENT') {
        console.log('Creating Credentials File..');
        initCred(function(err) {
          if (err) {
            done(err);

          } else {
            done(null, 'Credentials initialized', cred);
          }
        });
      } else {
        data = JSON.parse(data);
        console.log('Credentials file already exists:');
        console.log(data);

        let schema = {
          properties: {
            ok: {
              description: 'Update credentials file?[y/n]',
              required: true
            }
          }
        };

        prompt.start();

        prompt.get(schema, function(err, result) {
          if (err) {
            done(err);

          } else {
            if (result.ok.toLowerCase()[0] != 'n') {
              initCred(function(err) {
                if (err) {
                  done(err);

                } else {
                  done(null, 'Credentials updated');
                }
              });
            } else {
              done(null, 'Credentials not updated');
            }
          }
        });
      }
    }
  });
};
