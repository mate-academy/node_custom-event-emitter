'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  hasName(name) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }
  }

  checkEventName(name) {
    if (typeof name !== 'string') {
      throw new TypeError('Event should be a string');
    }
  }

  on(name, callback) {
    this.checkEventName(name);
    this.hasName(name);

    this.listeners[name].push(callback);

    return this;
  }

  once(name, callback) {
    this.checkEventName(name);

    const onceWrapper = (...args) => {
      callback(...args);
      this.off(name, onceWrapper);
    };

    this.on(name, onceWrapper);

    return this;
  }

  off(name, callback) {
    this.checkEventName(name);

    if (this.listeners[name]) {
      this.listeners[name] = this.listeners[name]
        .filter(listener => listener !== callback);
    } else {
      return this;
    }
  }

  emit(name, ...args) {
    this.checkEventName(name);

    if (this.listeners[name]) {
      this.listeners[name].forEach(listener => listener(...args));
    } else {
      return this;
    }
  }

  prependListener(name, callback) {
    this.checkEventName(name);
    this.hasName(name);

    this.listeners[name] = [callback, ...this.listeners[name]];

    return this;
  }

  prependOnceListener(name, callback) {
    this.checkEventName(name);

    const onceWrapper = (...args) => {
      callback(...args);
      this.off(name, onceWrapper);
    };

    this.prependListener(name, onceWrapper);

    return this;
  }

  removeAllListeners(name) {
    this.checkEventName(name);

    if (name) {
      delete this.listeners[name];
    } else {
      this.listeners = {};
    }

    return this;
  }

  listenerCount(name) {
    this.checkEventName(name);

    return this.listeners[name].length || 0;
  }
}

module.exports = {
  MyEventEmitter,
};
