'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }
  on(eventName, listener) {
    this.events[eventName] = this.events[eventName] || [];
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
    this.events[eventName] = this.events[eventName].filter(
      (curListener) => curListener !== listener,
    );
  }
  emit(eventName, ...args) {
    this.events[eventName].forEach((listener) => listener(...args));
  }
  prependListener(eventName, listener) {
    this.events[eventName] = this.events[eventName] || [];
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
    if (eventName) {
      this.events[eventName] = [];
    } else {
      Object.keys(this.events).forEach((evName) => (this.events[evName] = []));
    }
  }
  listenerCount(eventName) {
    return this.events[eventName] ? this.events[eventName].length : 0;
  }
}

module.exports = MyEventEmitter;
