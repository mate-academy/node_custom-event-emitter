'use strict';

function checkEventName(eventName) {
  if (!eventName) {
    throw new Error('The event name is a mandatory');
  }
}

module.exports.checkEventName = checkEventName;
