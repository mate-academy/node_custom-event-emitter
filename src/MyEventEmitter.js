'use strict';

class MyEventEmitter {
  // 1. ДОДАЄМО КОНСТРУКТОР, якого не було в заготовці
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
      this.off(eventName, wrapper);
      listener.apply(this, args);
    };

    wrapper.originalListener = listener;
    this.on(eventName, wrapper);

    return this;
  }

  off(eventName, listener) {
    if (!this.events[eventName]) {
      return this;
    }

    const listeners = this.events[eventName];
    const index = listeners.findIndex(
      (l) => l === listener || l.originalListener === listener,
    );

    if (index !== -1) {
      listeners.splice(index, 1);

      if (listeners.length === 0) {
        delete this.events[eventName];
      }
    }

    return this;
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return false;
    }

    const listenersCopy = [...this.events[eventName]];

    listenersCopy.forEach((listener) => {
      listener.apply(this, args);
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
      listener.apply(this, args);
    };

    wrapper.originalListener = listener;
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
    return this.events[eventName] ? this.events[eventName].length : 0;
  }
}

module.exports = MyEventEmitter;
