'use strict';

function validateCallback(callback) {
  if (!callback) {
    throw new Error('callback variable is required');
  }

  if (typeof callback !== 'function') {
    throw new Error('callback variable must have type of function');
  }
}

function validateCallbackDecorator(target, key, descriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function(eventName, callback, ...args) {
    validateCallback(callback);

    return originalMethod.call(this, eventName, callback, ...args);
  };

  return descriptor;
}

module.exports = {
  validateCallback: validateCallbackDecorator,
};
