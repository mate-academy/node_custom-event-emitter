'use strict';

function validateEventName(eventName) {
  if (!eventName) {
    throw new Error('eventName is required');
  }

  if (typeof eventName !== 'string') {
    throw new Error('eventName variable must have type of string');
  }

  if (!eventName.trim()) {
    throw new Error('eventName is required');
  }
}

const validateEventNameDecorator = (target, key, descriptor) => {
  const originalMethod = descriptor.value;

  descriptor.value = function(eventName, ...args) {
    validateEventName(eventName);

    return originalMethod.call(this, eventName, ...args);
  };

  return descriptor;
};

module.exports = {
  validateEventName: validateEventNameDecorator,
};
