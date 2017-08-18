"use strict";

const expect = require('chai').expect;
const getAllReposNames = require('../getAllReposNames');

describe('Get All Repos Names Module', function() {
  describe('for user', function() {
    var org = false;
    var name = 'ioanniswd';

    var err;
    var repos;
    before(function(done) {
      getAllReposNames(name, org, function(_err, _repos) {
        err = _err;
        repos = _repos;
        done();
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
