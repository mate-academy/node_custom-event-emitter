'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listenter) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(listenter);

    return this;
  }
  once(eventName, listener) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper);

      listener(...args);
    };

    wrapper.listener = listener;

    this.on(eventName, wrapper);

    return this;
  }
  off(eventName, listener) {
    if (!this.events[eventName]) {
      return this;
    }

    const index = this.events[eventName].findIndex(
      (item) => item === listener || item.listener === listener,
    );

    if (index !== -1) {
      this.events[eventName].splice(index, 1);
    }

    return this;
  }
  emit(eventName, ...args) {
    const listeners = this.events[eventName];

    if (!listeners || listeners.length === 0) {
      return false;
    }

    [...listeners].forEach((listener) => {
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
      this.off(eventName, wrapper);
      listener(...args);
    };

    wrapper.listener = listener;

    this.prependListener(eventName, wrapper);

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
