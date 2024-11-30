'use strict';

class Listener {
  constructor(name, callback, isOnce = false) {
    this.name = name;
    this.callback = callback;
    this.isOnce = isOnce;
  }
}

class MyEventEmitter {
  constructor() {
    this.listeners = [];
  }

  on(name, callback) {
    const listener = new Listener(name, callback);

    this.listeners.push(listener);
  }
  once(name, callback) {
    const listener = new Listener(name, callback, true);

    this.listeners.push(listener);
  }
  off(name, callback) {
    this.listeners = this.listeners.filter(listener =>
      !(listener.name === name && listener.callback === callback)
    );
  }
  emit(name, ...args) {
    for (const listener of this.listeners) {
      if (listener.name === name) {
        listener.callback(...args);
      }
    }

    this.listeners = this.listeners.filter(listener =>
      !(listener.name === name && listener.isOnce)
    );
  }
  prependListener(name, callback) {
    const listener = new Listener(name, callback);

    this.listeners.unshift(listener);
  }
  prependOnceListener(name, callback) {
    const listener = new Listener(name, callback, true);

    this.listeners.unshift(listener);
  }
  removeAllListeners(name = '') {
    if (!name) {
      this.listeners = [];

      return;
    }

    this.listeners = this.listeners.filter(listener => listener.name !== name);
  }
  listenerCount(name) {
    return this.listeners.filter(listener => listener.name === name).length;
  }
}

module.exports = MyEventEmitter;
