'use strict';

class MyEventEmitter {
  listeners = {};

  on(event, callback) {
    this.listeners[event] = this.listeners[event]
      ? [...this.listeners[event], { callback, isOnce: false }]
      : [{ callback, isOnce: false }];
  }
  once(event, callback) {
    this.listeners[event] = this.listeners[event]
      ? [...this.listeners[event], { callback, isOnce: true }]
      : [{ callback, isOnce: true }];
  }
  off(event, callback) {
    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener.callback !== callback,
    );
  }
  emit(event, ...args) {
    this.listeners[event].forEach((item) => item.callback(...args));

    this.listeners[event] = this.listeners[event].filter(
      (item) => item.isOnce === false,
    );
  }
  prependListener(event, callback) {
    this.listeners[event] = this.listeners[event]
      ? [{ callback, isOnce: false }, ...this.listeners[event]]
      : [{ callback, isOnce: false }];
  }
  prependOnceListener(event, callback) {
    this.listeners[event] = this.listeners[event]
      ? [{ callback, isOnce: true }, ...this.listeners[event]]
      : [{ callback, isOnce: true }];
  }
  removeAllListeners(event = null) {
    if (!event) {
      this.listeners = {};
    } else {
      this.listeners[event] = [];
    }
  }
  listenerCount(event) {
    return this.listeners[event] ? this.listeners[event].length : 0;
  }
}

module.exports = MyEventEmitter;
