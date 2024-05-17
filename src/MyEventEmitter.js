'use strict';

class MyEventEmitter {
  events = {};

  on(type, callback) {
    if (typeof callback !== 'function') {
      throw new Error('Listener must be a function!');
    }

    this.events[type] = this.events[type] || [];
    this.events[type].push(callback);
  }

  once(type, callback) {
    const tempCallback = (...args) => {
      callback(...args);

      this.off(type, tempCallback);
    };

    this.on(type, tempCallback);
  }

  off(type, callback) {
    if (this.events[type]) {
      this.events[type].forEach((listener, index) => {
        if (listener === callback) {
          this.events[type] = this.events[type].filter((_, i) => i !== index);
        }
      });
    }
  }

  emit(type, ...args) {
    if (this.events[type]) {
      this.events[type].forEach((callback) => {
        callback(...args);
      });
    }
  }

  prependListener(type, callback) {
    if (typeof callback !== 'function') {
      throw new Error('Listener must be a function!');
    }

    this.events[type] = this.events[type] || [];
    this.events[type].unshift(callback);
  }

  prependOnceListener(type, callback) {
    const tempCallback = (...args) => {
      callback(...args);

      this.off(type, tempCallback);
    };

    this.prependListener(type, tempCallback);
  }

  removeAllListeners(type) {
    if (this.events[type]) {
      delete this.events[type];
    }
  }

  listenerCount(type) {
    let callbackCont = 0;
    const callbacks = this.events[type] || [];

    callbackCont = callbacks.length;

    return callbackCont;
  }
}

module.exports = MyEventEmitter;
