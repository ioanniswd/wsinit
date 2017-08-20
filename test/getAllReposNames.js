"use strict";

const expect = require('chai').expect;
const getAllReposNames = require('../getAllReposNames');
const fs = require('fs');
const home = require('os').homedir();

// NOTE: You may need to increase the timeout, depending on your internet
// connection speed.

describe('Get All Repos Names Module', function() {
  describe('for user', function() {
    var org = false;
    var name = 'ioanniswd';

    // BUG: Even though the err gets value null in line 31,
    // in expect it appears as undefined.
    var err = null;
    var repos;
    before(function(done) {
      this.timeout(15000);
      fs.readFile(`${home}/.wsinit.json`, 'utf-8', function(err, data) {
        if(err) {
          console.log(err);
          done();

        } else {
          data = JSON.parse(data);
          let user = data.user;
          let at = data.at;
          getAllReposNames(name, org, user, at, function(_err, _repos) {
            err = _err;
            // console.log('err:', err);
            repos = _repos;
            done();
          });
        }
      });
    });

    it('returns no Error', function() {
      expect(err).to.be.a('null');
    });

    it('returns an array', function() {
      expect(repos).to.be.an('array');
    });

    it('returns repo names and clone urls', function() {
      repos.forEach(function(item) {
        expect(item).to.have.property('name');
        expect(item).to.have.property('full_name');
        expect(item).to.have.property('local_path');
      });
    });
  });
});
