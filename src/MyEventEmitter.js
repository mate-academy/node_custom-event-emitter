'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push({
      callback: listener,
      original: listener,
      once: false,
    });

    return this;
  }

  once(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push({
      callback: listener,
      original: listener,
      once: true,
    });

    return this;
  }

  off(eventName, listener) {
    const listeners = this.events[eventName];

    if (!listeners || listeners.length === 0) {
      return this;
    }

    this.events[eventName] = listeners.filter(
      (storedListener) => storedListener.original !== listener,
    );

    if (this.events[eventName].length === 0) {
      delete this.events[eventName];
    }

    return this;
  }

  emit(eventName, ...args) {
    const listeners = this.events[eventName];

    if (!listeners || listeners.length === 0) {
      return false;
    }

    const listenersToCall = [...listeners];

    for (const listener of listenersToCall) {
      listener.callback(...args);

      if (listener.once) {
        this.off(eventName, listener.original);
      }
    }

    return true;
  }

  prependListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift({
      callback: listener,
      original: listener,
      once: false,
    });

    return this;
  }

  prependOnceListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift({
      callback: listener,
      original: listener,
      once: true,
    });

    return this;
  }

  removeAllListeners(eventName) {
    if (eventName === undefined) {
      this.events = {};

      return this;
    }

    delete this.events[eventName];

    return this;
  }

  listenerCount(eventName) {
    const listeners = this.events[eventName];

    return listeners ? listeners.length : 0;
  }
}

module.exports = MyEventEmitter;
