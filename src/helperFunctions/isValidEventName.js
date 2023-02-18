'use strict';

function isValidEventName(eventName) {
  if (!eventName) {
    throw new Error('eventName is requiered');
  }

  if (typeof eventName !== 'string') {
    throw new Error('eventName variable must have type of string');
  }
}

exports = {
  isValidEventName,
};
