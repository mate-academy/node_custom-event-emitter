'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  getListener(event) {
    if (!this.isListenerExist(event)) {
      this.listeners[event] = [];
    }

    return this.listeners[event];
  }

  isListenerExist(event) {
    return this.listeners[event];
  }

  on(event, callback) {
    this.getListener(event).push({ callback });
  }

  once(event, callback) {
    this.getListener(event).push({ callback, once: true });
  }

  off(event, callback) {
    if (!this.isListenerExist(event)) {
      return;
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener.callback !== callback,
    );
  }

  emit(event, ...args) {
    if (!this.isListenerExist(event)) {
      return;
    }

    this.listeners[event].forEach((listener) => {
      listener.callback(...args);
    });

    this.listeners[event] = this.listeners[event].filter(({ once }) => !once);
  }
  prependListener(event, callback) {
    this.getListener(event).unshift({ callback });
  }

  prependOnceListener(event, callback) {
    this.getListener(event).unshift({ callback, once: true });
  }

  removeAllListeners(event) {
    delete this.listeners[event];
  }
  listenerCount(event) {
    return this.listeners[event] ? this.listeners[event].length : 0;
  }
}

module.exports = MyEventEmitter;
