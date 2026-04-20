'use strict';

class MyEventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(eventName, listener) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }

    this.events.get(eventName).push(listener);
  }
  prependListener(eventName, listener) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }

    this.events.get(eventName).unshift(listener);
  }
  once(eventName, listener) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener(...args);
    };

    this.on(eventName, wrapper);
  }
  off(eventName, listener) {
    const listeners = this.events.get(eventName);

    if (!listeners) {
      return;
    }

    const index = listeners.indexOf(listener);

    if (index !== -1) {
      listeners.splice(index, 1);
    }
  }
  emit(eventName, ...args) {
    const listeners = this.events.get(eventName);

    if (!listeners) {
      return false;
    }

    [...listeners].forEach((listener) => {
      listener(...args);
    });

    return true;
  }
  prependOnceListener(eventName, listener) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener(...args);
    };

    this.prependListener(eventName, wrapper);
  }
  removeAllListeners(eventName) {
    if (eventName) {
      this.events.delete(eventName);
    } else {
      this.events.clear();
    }
  }
  listenerCount(eventName) {
    const listeners = this.events.get(eventName);

    return listeners ? listeners.length : 0;
  }
}

module.exports = MyEventEmitter;
