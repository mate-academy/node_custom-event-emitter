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
    const onceTimeListener = (...args) => {
      listener(...args);

      this.off(eventName, onceTimeListener);
    };

    this.on(eventName, onceTimeListener);
  }

  off(eventName, listener) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName] = this.events[eventName].filter(
      listenerName => listenerName !== listener
    );
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName].forEach(listener => listener(...args));
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

    const onceTimeListener = (...args) => {
      listener(...args);

      this.off(eventName, onceTimeListener);
    };

    this.prependListener(eventName, onceTimeListener);
  }

  removeAllListeners(eventName) {
    if (this.events[eventName]) {
      delete this.events[eventName];
    } else {
      throw new Error(`${eventName} does not exist`);
    }
  }

  listenerCount(eventName) {
    if (!this.events[eventName]) {
      return 0;
    }

    return this.events[eventName].length;
  }
}

module.exports = { MyEventEmitter };
