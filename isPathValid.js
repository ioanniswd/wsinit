"use strict";

module.exports = function(path, done) {
  if(!path || path.indexOf(' ') != -1 || typeof path !== 'string') {
    return false;

  } else {
    return true;
  }
};
