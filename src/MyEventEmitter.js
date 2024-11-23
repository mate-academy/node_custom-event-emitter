/* eslint-disable no-console */
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
  }
  once(eventName, listener) {
    const listenerWrapper = (...args) => {
      listener(...args);
      this.off(eventName, listenerWrapper);
    };

    this.on(eventName, listenerWrapper);
  }
  off(eventName, listener) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName] = this.events[eventName].filter(
      (eventListener) => eventListener !== listener,
    );
  }
  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName].forEach((listener) => {
      listener(...args);
    });
  }
  prependListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].unshift(listener);
  }
  prependOnceListener(eventName, listener) {
    const listenerWrapper = (...args) => {
      listener(...args);
      this.off(eventName, listenerWrapper);
    };

    this.prependListener(eventName, listenerWrapper);
  }
  removeAllListeners(event) {
    if (event) {
      this.events[event] = [];
    } else {
      this.events = [];
    }
  }
  listenerCount(eventName) {
    const count = this.events[eventName] ? this.events[eventName].length : 0;

    console.log('count:', count);

    return count;
  }
}

module.exports = MyEventEmitter;
