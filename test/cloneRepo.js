"use strict";

const expect = require('chai').expect;
const cloneRepo = require('../cloneRepo');
const home = require('os').homedir();

var repo = require('../cred').test_repo;

describe('Clone Repo Module', function() {
  var err;
  var local_path;
  before(function(done) {
    cloneRepo(repo)
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
    expect(local_path).to.equal(`${home}/test/path/${repo.name}`);
  });
});
