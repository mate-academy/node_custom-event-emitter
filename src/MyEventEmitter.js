'use strict';

class MyEventEmitter {
  listeners = {};

  on(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    } else {
      this.listeners[event] = [callback];
    }
  }

  once(event, callback) {
    callback.once = true;

    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    } else {
      this.listeners[event] = [callback];
    }
  }

  off(event, callback) {
    this.listeners[event] = this.listeners[event].filter(
      (evn) => evn !== callback,
    );
  }

  emit(event, ...args) {
    for (const callback of this.listeners[event]) {
      callback(...args);
    }

    this.listeners[event] = this.listeners[event].filter(
      (callback) => !callback.once,
    );
  }

  prependListener(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].unshift(callback);
    } else {
      this.listeners[event] = [callback];
    }
  }

  prependOnceListener(event, callback) {
    callback.once = true;

    if (this.listeners[event]) {
      this.listeners[event].unshift(callback);
    } else {
      this.listeners[event] = [callback];
    }
  }

  removeAllListeners(event) {
    if (event) {
      this.listeners[event] = [];
    } else {
      this.listeners = {};
    }
  }

  listenerCount(event) {
    return this.listeners[event]?.length || 0;
  }
}

module.exports = MyEventEmitter;
