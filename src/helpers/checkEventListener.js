'use strict';

function checkEventListener(listener) {
  if (!listener) {
    throw new Error('The event listener is a mandatory');
  }

  if (typeof listener !== 'function') {
    throw new Error('The event listener must be a function');
  }
}

module.exports.checkEventListener = checkEventListener;
