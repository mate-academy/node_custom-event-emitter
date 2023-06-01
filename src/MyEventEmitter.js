'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(listener);
  }

  off(event, listenerToRemove) {
    if (!this.events[event]) {
      throw new Error(`Event "${event}" doesn't exits.`);
    }

    this.events[event] = this.events[event]
      .filter(listener => listener !== listenerToRemove);
  }

  once(event, action) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    const callback = (...args) => {
      action(...args);
      this.off(event, callback);
    };

    this.events[event].push(callback);

    return this;
  }

  emit(event, data) {
    if (!this.events[event]) {
      throw new Error(`Event "${event}" doesn't exits.`);
    }

    this.events[event].forEach((callback) => callback(data));
  }

  prependListener(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].unshift(listener);
  }

  prependOnceListener(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    const callback = (...args) => {
      listener(...args);
      this.off(event, callback);
    };

    this.prependListener(event, callback);
  }

  removeAllListeners(event) {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {};
    }
  }

  listenerCount(event) {
    if (!this.events[event]) {
      throw new Error(`Event "${event}" doesn't exits.`);
    }

    return this.events[event].length;
  }
}

module.exports = { MyEventEmitter };
