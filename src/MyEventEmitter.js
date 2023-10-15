'use strict';

const http = require('http');
const server = new http.Server();

class MyEventEmitter {
  constructor() {
    this.events = {};
  }
  on(eventName, listener) {
    if (eventName in this.events) {
      this.events[eventName].push(listener);
    } else {
      this.events[eventName] = [listener];
    }

    return this;
  }
  once(eventName, listener) {
    if (eventName in this.events) {
      this.events[eventName].push(listener);
    } else {
      this.events[eventName] = [listener];
    }

    return this;
  }
  off(eventName, listener) {
    this.events[eventName] = this.events[eventName].filter(el => (
      el !== listener
    ));

    return this;
  }
  emit(eventName, ...args) {
    http.Server.prototype.emit.call(server, eventName, ...args);

    return this;
  }
  prependListener(eventName, listener) {
    if (eventName in this.events) {
      this.events[eventName].unshift(listener);
    } else {
      this.events[eventName] = [listener];
    }

    return this;
  }
  prependOnceListener() {}
  removeAllListeners(eventName) {
    if (eventName) {
      this.events[eventName].length = 0;
    } else {
      for (const key in this.events) {
        this.events[key].length = 0;
      }
    }

    return this;
  }
  listenerCount(eventName, listener) {
    if (listener) {
      return this.events[eventName].filter(el => el === listener).length;
    } else {
      return this.events[eventName].length;
    }
  }
}

module.exports = {
  MyEventEmitter,
};
