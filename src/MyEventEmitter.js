'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = [];
  }

  on(eventName, callback) {
    this.listeners.push({ eventName, callback, disposable: false });
  }

  once(eventName, callback) {
    this.listeners.push({ eventName, callback, disposable: true });
  }

  off(eventName, callback) {
    this.listeners = this.listeners.filter(
      (listener) =>
        listener.eventName !== eventName || listener.callback !== callback,
    );
  }

  emit(eventName, ...args) {
    this.listeners.forEach((listener) => {
      if (listener.eventName === eventName) {
        listener.callback(...args);

        if (listener.disposable) {
          this.listeners = this.listeners.filter(
            (listenerToRemove) => listenerToRemove !== listener,
          );
        }
      }
    });
  }

  prependListener(eventName, callback) {
    this.listeners.unshift({ eventName, callback, disposable: false });
  }

  prependOnceListener(eventName, callback) {
    this.listeners.unshift({ eventName, callback, disposable: true });
  }

  removeAllListeners(eventName) {
    if (!eventName) {
      this.listeners = [];

      return;
    }

    this.listeners = this.listeners.filter(
      (listener) => listener.eventName !== eventName,
    );
  }

  listenerCount(eventName) {
    return this.listeners.reduce(
      (acc, listener) => (listener.eventName === eventName ? acc + 1 : acc),
      0,
    );
  }
}

module.exports = MyEventEmitter;
