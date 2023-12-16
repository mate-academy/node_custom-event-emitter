'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  on(eventName, listener) {
    if (!(this.listeners.has(eventName))) {
      this.listeners.set(eventName, []);
    }
    this.listeners.get(eventName).push(listener);
  }

  once(eventName, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(eventName, onceWrapper);
    };

    this.on(eventName, onceWrapper);
  }

  off(eventName, listener) {
    if (this.listeners.has(eventName)) {
      const listeners = this.listeners
        .get(eventName)
        .filter((l) => l !== listener);

      this.listeners.set(eventName, listeners);
    }
  }

  emit(eventName, ...args) {
    if (this.listeners.has(eventName)) {
      for (const listener of this.listeners.get(eventName)) {
        listener(...args);
      }
    }
  }

  prependListener(eventName, listener) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }

    this.listeners.get(eventName).unshift(listener);
  }

  prependOnceListener(eventName, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(eventName, onceWrapper);
    };

    this.prependListener(eventName, onceWrapper);
  }

  removeAllListeners(eventName) {
    if (this.listeners.has(eventName)) {
      this.listeners.delete(eventName);
    }
  }

  listenerCount(eventName) {
    return this.listeners.has(eventName)
      ? this.listeners.get(eventName).length
      : 0;
  }
}

module.exports = { MyEventEmitter };
