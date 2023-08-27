'use strict';

function isValidCallback(callback) {
  if (!callback) {
    throw new Error('callback variable is required');
  }

  if (typeof callback !== 'function') {
    throw new Error('callback variable must have type of function');
  }
}

exports = {
  isValidCallback,
};
