'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  };

  on(eventName, listener) {
    this.events[eventName].push(listener);

    return this;
  }

  once(eventName, listener) {
    this.listeners[eventName] = this.listeners[eventName] || [];

    const onceWrapper = () => {
      listener();
      this.off(eventName, onceWrapper);
    };

    this.listeners[eventName].push(onceWrapper);

    return this;
  }

  off(eventName, listener) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName]
        .filter(event => event !== listener);
    }

    return this;
  }
  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(listener => {
        listener(...args);
      });
    }

    return this;
  }

  prependListener(eventName, listener) {
    this.events[eventName].unshift(listener);

    return this;
  }

  prependOnceListener(eventName, listener) {
    this.listeners[eventName] = this.listeners[eventName] || [];

    const onceWrapper = () => {
      listener();
      this.off(eventName, onceWrapper);
    };

    this.listeners[eventName].unshift(onceWrapper);

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
    const fns = this.listeners[eventName] || [];

    return fns.length;
  }
}

module.exports = {
  MyEventEmitter,
};
