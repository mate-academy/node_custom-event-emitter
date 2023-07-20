'use strict';

const http = require('http');

class MyEventEmitter {
  on(eventName, callback) {
    http.Server.prototype.on.call(this, eventName, callback);
  }
  once(eventName, callback) {
    http.Server.prototype.once.call(this, eventName, callback);
  }
  off(eventName, callback) {
    http.Server.prototype.off.call(this, eventName, callback);
  }
  emit(eventName, ...args) {
    http.Server.prototype.emit.call(this, eventName, ...args);
  }
  prependListener(eventName, callback) {
    http.Server.prototype.prependListener.call(this, eventName, callback);
  }
  prependOnceListener(eventName, callback) {
    http.Server.prototype.prependOnceListener.call(this, eventName, callback);
  }
  removeAllListeners(eventName) {
    http.Server.prototype.removeAllListeners.call(this, eventName);
  }
  listenerCount(emitter, callback) {
    return http.Server.prototype.listenerCount.call(this, emitter, callback);
  }
}

module.exports = { MyEventEmitter };

