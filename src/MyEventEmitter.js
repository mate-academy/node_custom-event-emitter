'use strict';

class MyEventEmitter {
  events = {};

  on(type, callback) {
    if (typeof callback !== 'function') {
      throw new Error('Listener must be a function!');
    }

    this.events[type] = this.events[type] || [];
    this.events[type].push({ isOnce: false, cb: callback });
  }

  once(type, callback) {
    if (typeof callback !== 'function') {
      throw new Error('Listener must be a function!');
    }

    this.events[type] = this.events[type] || [];
    this.events[type].push({ isOnce: true, cb: callback });
  }

  off(type, callback) {
    if (this.events[type]) {
      this.events[type].forEach((listener, index) => {
        // eslint-disable-next-line no-console
        console.log(listener.cb, callback);

        if (listener.cb === callback) {
          this.events[type] = this.events[type].filter((_, i) => i !== index);
        }
      });
    }
  }

  emit(type, ...args) {
    if (this.events[type]) {
      this.events[type].forEach((callback) => {
        callback.cb(...args);

        if (callback.isOnce) {
          this.off(type, callback.cb);
        }
      });
    }
  }

  prependListener(type, callback) {
    if (typeof callback !== 'function') {
      throw new Error('Listener must be a function!');
    }

    this.events[type] = this.events[type] || [];
    this.events[type] = [{ isOnce: false, cb: callback }, ...this.events[type]];
  }

  prependOnceListener(type, callback) {
    if (typeof callback !== 'function') {
      throw new Error('Listener must be a function!');
    }

    this.events[type] = this.events[type] || [];
    this.events[type] = [{ isOnce: true, cb: callback }, ...this.events[type]];
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
