'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = [];
  }

  on(listenerName, callback) {
    this.listeners.push({
      listenerName,
      callback,
      once: false,
    });
  }

  once(listenerName, callback) {
    this.listeners.push({
      listenerName,
      callback,
      once: true,
    });
  }

  off(listenerName) {
    const index = this.listeners
      .findIndex(listener => listener.listenerName === listenerName);

    this.listeners.splice(index, 1);
  }

  emit(listenerName, ...args) {
    this.listeners.forEach((listener) => {
      if (listener.listenerName === listenerName) {
        listener.callback(...args);
      }
    });

    this.listeners = this.listeners.filter(listener =>
      (listener.listenerName !== listenerName)
      || (listener.listenerName === listenerName && !listener.once)
    );
  }

  prependListener(listenerName, callback) {
    this.listeners.unshift({
      listenerName,
      callback,
      once: false,
    });
  }

  prependOnceListener(listenerName, callback) {
    this.listeners.unshift({
      listenerName,
      callback,
      once: true,
    });
  }

  removeAllListeners() {
    this.listeners.length = 0;
  }

  get listenerCount() {
    return this.listeners.length;
  }
}

module.exports = {
  MyEventEmitter,
};
