'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  once(eventName, listener) {
    const onceListener = (...args) => {
      listener(...args);
      this.off(eventName, onceListener);
    };

    this.on(eventName, onceListener);
  }

  off(eventName, listener) {
    if (!this.events[eventName]) {
      throw new Error(`Event "${eventName}" doesn't exits.`);
    }

    const index = this.events[eventName].indexOf(listener);

    if (index !== -1) {
      this.events[eventName].splice(index, 1);
    }
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      throw new Error(`Event "${eventName}" doesn't exits.`);
    }

    const listeners = [...this.events[eventName]];

    for (const listener of listeners) {
      listener(...args);
    }
  }

  prependListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(listener);
  }

  prependOnceListener(eventName, listener) {
    const onceListener = (...args) => {
      listener(...args);
      this.off(eventName, onceListener);
    };

    this.prependListener(eventName, onceListener);
  }

  removeAllListeners(eventName) {
    if (!eventName) {
      this.events = {};
    } else {
      delete this.events[eventName];
    }
  }

  listenerCount(eventName) {
    if (!this.events[eventName]) {
      throw new Error(`Event "${eventName}" doesn't exits.`);
    }

    return this.events[eventName].length;
  }
}

module.exports = { MyEventEmitter };
