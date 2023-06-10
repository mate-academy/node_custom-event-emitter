'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  };

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(listener);
  }

  once(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    const callback = (...args) => {
      listener(...args);
      this.off(eventName, callback);
    };

    this.events[eventName].push(callback);

    return this;
  }

  off(eventName, listenerToRemove) {
    if (!this.events[eventName]) {
      throw new Error(`Event "${eventName}" doesn't exits.`);
    }

    this.events[eventName] = this.events[eventName]
      .filter(listener => listener !== listenerToRemove);
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      throw new Error(`Event "${eventName}" doesn't exits.`);
    }

    this.events[eventName].forEach((listener) => listener(args));
  }

  prependListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(listener);
  }

  prependOnceListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    const callback = (...args) => {
      listener(...args);
      this.off(eventName, callback);
    };

    this.prependListener(eventName, callback);
  }

  removeAllListeners(eventName) {
    if (eventName) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }
  }

  listenerCount(eventName) {
    if (!this.events[eventName]) {
      throw new Error(`Event "${eventName}" doesn't exits.`);
    }

    return this.events[eventName].length;
  }
}

module.exports = {
  MyEventEmitter,
};
