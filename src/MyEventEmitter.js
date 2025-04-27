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

    return this;
  }

  once(eventName, listener) {
    const onceWraper = (...args) => {
      this.off(eventName, onceWraper);
      listener(...args);
    };

    this.on(eventName, onceWraper);

    return this;
  }

  off(eventName, listener) {
    const listeners = this.events[eventName];

    if (!listeners) {
      return;
    }

    const index = listeners.indexOf(listener);

    if (index !== -1) {
      listeners.splice(index, 1);

      if (listeners.length === 0) {
        delete this.events[eventName];
      }
    }

    return this;
  }

  emit(eventName, ...args) {
    const listeners = this.events[eventName];

    if (!listeners) {
      return false;
    }

    const listenerCopy = [...listeners];

    for (const listener of listenerCopy) {
      listener(...args);
    }

    return true;
  }

  prependListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(listener);

    return this;
  }

  prependOnceListener(eventName, listener) {
    const onceWraper = (...args) => {
      this.off(eventName, onceWraper);
      listener(...args);
    };

    this.prependListener(eventName, onceWraper);

    return this;
  }

  removeAllListeners(eventName) {
    if (eventName) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }

    return this;
  }

  listenerCount(eventName) {
    const listeners = this.events[eventName];

    return listeners ? listeners.length : 0;
  }
}

module.exports = MyEventEmitter;
