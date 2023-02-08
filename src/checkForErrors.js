'use strict';

module.exports.checkForErrors = (eventName, listener) => {
  if (!eventName) {
    throw new Error('please provide the name of the event');
  }

  if (typeof listener !== 'function') {
    throw new Error('only a function can be used as the listener');
  }
};
