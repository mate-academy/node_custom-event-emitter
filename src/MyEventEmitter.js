'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (typeof listener !== 'function') {
      throw new Error('Listener should be a function!');
    }

    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(listener);

    return this;
  }

  once(eventName, listener) {
    this.events[eventName] = this.events[eventName] || [];

    const onceWrapper = () => {
      listener();
      this.off(eventName, onceWrapper);
    };

    this.events[eventName].push(onceWrapper);

    return this;
  }

  off(eventName, listener) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName]
        .filter(eventListener => eventListener !== listener);
    }

    return this;
  }

  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function(listener) {
        listener(...args);
      });
    }

    return this;
  }

  prependListener(eventName, listener) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].unshift(listener);

    return this;
  }

  prependOnceListener(eventName, listener) {
    this.events[eventName] = this.events[eventName] || [];

    const onceWrapper = () => {
      listener();
      this.off(eventName, onceWrapper);
    };

    this.events[eventName].unshift(onceWrapper);

    return this;
  }

  removeAllListeners(event) {
    if (this.events[event]) {
      this.events[event] = [];
    }
  }

  listenerCount(event) {
    const listeners = this.events[event] || [];

    return listeners.length;
  }
}

module.exports = {
  MyEventEmitter,
};
