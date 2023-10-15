'use strict';

const http = require('http');
const server = new http.Server();

class MyEventEmitter {
  on() {}
  once() {}
  off() {}
  emit(eventName, ...args) {
    http.Server.prototype.emit.call(server, eventName, ...args);
  }
  prependListener() {}
  prependOnceListener() {}
  removeAllListeners() {}
  listenerCount() {}
}

module.exports = {
  MyEventEmitter,
};
