'use strict';

const http = require('http');
const server = new http.Server();

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    (eventName in this.events)
      ? this.events[eventName].push(listener)
      : this.events[eventName] = [listener];
  }

  once(eventName, callback) {
    const oneTimeListener = (...args) => {
      this.off(eventName, oneTimeListener);
      callback(...args);
    };

    !(eventName in this.events)
      ? this.events[eventName] = [oneTimeListener]
      : this.events[eventName].push(oneTimeListener);
  }

  off(eventName, listener) {
    this.events[eventName] = this.events[eventName].filter(el => (
      el !== listener
    ));
  }

  emit(eventName, ...args) {
    http.Server.prototype.emit.call(server, eventName, ...args);
  }

  prependListener(eventName, listener) {
    (eventName in this.events)
      ? this.events[eventName].unshift(listener)
      : this.events[eventName] = [listener];
  }

  prependOnceListener(eventName, callback) {
    const oneTimeListener = (...args) => {
      this.off(eventName, oneTimeListener);
      callback(...args);
    };

    !(eventName in this.events)
      ? this.events[eventName] = [oneTimeListener]
      : this.events[eventName].unshift(oneTimeListener);
  }

  removeAllListeners(eventName) {
    if (eventName) {
      this.events[eventName].length = 0;
    } else {
      for (const key in this.events) {
        this.events[key].length = 0;
      }
    }
  }

  listenerCount(eventName, listener) {
    if (listener) {
      return this.events[eventName].filter(el => el === listener).length;
    }

    return this.events[eventName].length;
  }
}

module.exports = {
  MyEventEmitter,
};
