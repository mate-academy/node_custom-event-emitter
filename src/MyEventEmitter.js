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
    const wrapper = (...args) => {
      listener(...args);
      this.off(eventName, wrapper);
    };

    wrapper.originalListener = listener;

    return this.on(eventName, wrapper);
  }

  off(eventName, listener) {
    if (!this.events[eventName]) {
      return this;
    }

    this.events[eventName] = this.events[eventName].filter(
      (currentListener) =>
        currentListener !== listener &&
        currentListener.originalListener !== listener,
    );

    if (this.events[eventName].length === 0) {
      delete this.events[eventName];
    }

    return this;
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return false;
    }

    const listeners = [...this.events[eventName]];

    listeners.forEach((listener) => {
      listener(...args);
    });

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
    const wrapper = (...args) => {
      listener(...args);
      this.off(eventName, wrapper);
    };

    wrapper.originalListener = listener;

    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(wrapper);

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
    if (!this.events[eventName]) {
      return 0;
    }

    return this.events[eventName].length;
  }
}

module.exports = MyEventEmitter;
