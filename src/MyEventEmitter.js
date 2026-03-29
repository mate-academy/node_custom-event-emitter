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
    // abc it is function to remove the listener after it is called
    const abc = (...args) => {
      this.off(eventName, abc);
      listener(...args);
    };

    this.on(eventName, abc);
  }
  off(eventName, listener) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName] = this.events[eventName].filter(
      (l) => l !== listener,
    );
  }
  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return;
    }
    [...this.events[eventName]].forEach((listener) => listener(...args));
  }
  prependListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].unshift(listener);
  }
  prependOnceListener(eventName, listener) {
    // abc it is function to remove the listener after it is called
    const abc = (...args) => {
      this.off(eventName, abc);
      listener(...args);
    };

    this.prependListener(eventName, abc);
  }
  removeAllListeners(eventName) {
    if (eventName === undefined) {
      this.events = {};
    } else {
      if (!this.events[eventName]) {
        return;
      }
      this.events[eventName] = [];
    }
  }
  listenerCount(eventName) {
    if (!this.events[eventName]) {
      return 0;
    }

    return this.events[eventName].length;
  }
}

module.exports = MyEventEmitter;
