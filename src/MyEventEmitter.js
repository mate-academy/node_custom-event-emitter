'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }
  on(eventName, listener) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(listener);

    return this;
  }
  once(eventName, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(eventName, wrapper);
    };

    wrapper.listener = listener;

    return this.on(eventName, wrapper);
  }
  off(eventName, listener) {
    this.events[eventName] = this.events[eventName].filter(l => (
      l !== listener && l.listener !== listener
    ));

    return this;
  }
  emit(eventName, ...args) {
    const listeners = this.events[eventName];

    if (!listeners) {
      return false;
    }

    this.events[eventName].forEach(listener => listener(...args));

    return true;
  }
  prependListener(eventName, listener) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].unshift(listener);

    return this;
  }
  prependOnceListener(eventName, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(eventName, wrapper);
    };

    wrapper.listener = listener;

    return this.prependListener(eventName, wrapper);
  }
  removeAllListeners(eventName) {
    if (eventName === undefined) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }

    return this;
  }
  listenerCount(eventName) {
    const listeners = this.events[eventName];

    if (!listeners) {
      return 0;
    }

    return listeners.length;
  }
}

module.exports = { MyEventEmitter };
