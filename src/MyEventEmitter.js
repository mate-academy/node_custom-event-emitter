'use strict';

const myEventEmitter = class MyEventEmitter {
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
      this.off(eventName, listener);
    };

    this.on(eventName, onceWrapper);

    return this;
  }

  off(eventName, listener) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName] = this.events[eventName]
      .filter(eventListener => listener !== eventListener);

    return this;
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName].forEach(listener => listener(...args));
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
      this.off(eventName, listener);
    };

    this.prependListener(eventName, onceWrapper);
  }

  removeAllListeners(eventName) {
    if (!eventName) {
      this.events = {};
    } else if (this.events.hasOwnProperty(eventName)) {
      delete this.events[eventName];
    }

    return this;
  }

  listenerCount(eventName) {
    return this.events[eventName].length || 0;
  }
};

module.exports = { myEventEmitter };
