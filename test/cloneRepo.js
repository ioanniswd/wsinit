"use strict";

const expect = require('chai').expect;
const cloneRepo = require('../cloneRepo');
const home = require('os').homedir();

var repo_1 = require('../cred').test_repo_1;
var repo_2 = require('../cred').test_repo_2;

describe('Clone Repo Module', function() {

  describe('for correct path', function() {
    var err;
    var local_path;
    before(function(done) {
      cloneRepo(repo_1)
      .then(_local_path => {
        local_path = _local_path;
        done();
      })
      .catch(_err => {
        err = _err;
        done();
      });
    });

    it('returns no error', function() {
      expect(err).to.be.an('undefined');
    });

    it('returns correct local path', function() {
      expect(local_path).to.equal(`${home}/test/path/${repo_1.name}`);
    });
  });

  describe('for wrong path', function() {
    var err;
    var local_path;
    before(function(done) {
      cloneRepo(repo_2)
      .then(_local_path => {
        local_path = _local_path;
        done();
      })
      .catch(_err => {
        err = _err;
        done();
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
