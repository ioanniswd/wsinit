"use strict";

const expect = require('chai').expect;
const cloneRepo = require('../cloneRepo');
const fs = require('fs');
const home = require('os').homedir();

// NOTE: You may need to increase the timeout, depending on your internet
// connection speed.

describe('Clone Repo Module', function() {

  describe('for correct path', function() {
    var err;
    var local_path;
    var repo_1;
    before(function(done) {
      this.timeout(15000);
      fs.readFile(`${home}/.wsinit.json`, 'utf-8', function(err, data) {
        if(err) {
          console.log(err);
          done();

        } else {
          data = JSON.parse(data);
          repo_1 = data.test_repo_1;
          let at = data.at;
          cloneRepo(repo_1, at)
            .then(_local_path => {
              local_path = _local_path;
              done();
            })
            .catch(_err => {
              err = _err;
              done();
            });
        }
      });
    });

    it('returns no error', function() {
      expect(err).to.be.an('undefined');
    });

    it('returns correct local path', function() {
      expect(local_path).to.equal(`test/path/${repo_1.name}`);
    });
  });

  describe('for wrong path', function() {
    var err;
    var local_path;
    var repo_2;
    before(function(done) {
      this.timeout(15000);
      fs.readFile(`${home}/.wsinit.json`, 'utf-8', function(err, data) {
        if(err) {
          console.log(err);
          done();

        } else {
          data = JSON.parse(data);
          repo_2 = data.test_repo_2;
          let at = data.at;
          cloneRepo(repo_2, at)
            .then(_local_path => {
              local_path = _local_path;
              done();
            })
            .catch(_err => {
              err = _err;
              done();
            });
        }
      });
    });

    it('returns no error', function() {
      expect(err).to.be.an('undefined');
    });

    it('returns correct local path', function() {
      expect(local_path).to.equal(`${home}/repos/${repo_2.name}`);
    });

  });
});
