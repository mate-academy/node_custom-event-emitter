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
    const onceWrapper = () => {
      listener();
      this.off(eventName, onceWrapper);
    };

    this.on(eventName, onceWrapper);

    return this;
  }

  off(eventName, listener) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName].filter(
      eventListener => eventListener !== listener
    );

    return this;
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return false;
    }

    this.events[eventName].forEach(listener => listener(...args));

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
    const onceWrapper = () => {
      listener();
      this.off(eventName, onceWrapper);
    };

    this.prependListener(eventName, onceWrapper);

    return this;
  }

  removeAllListeners(eventName) {
    delete this.events[eventName];

    return this;
  }

  listenerCount(eventName) {
    return this.events[eventName].length || 0;
  }
}

module.exports = MyEventEmitter;
