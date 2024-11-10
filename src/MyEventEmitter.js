'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = [];
  }

  on(eventName, listener) {
    const listenerObj = { name: eventName, function: listener, once: false };

    this.listeners.push(listenerObj);
  }

  once(eventName, listener) {
    const listenerObj = { name: eventName, function: listener, once: true };

    this.listeners.push(listenerObj);
  }

  off(eventName, listener) {
    this.listeners = [...this.listeners].filter(
      (obj) => !(obj.name === eventName && obj.function === listener),
    );
  }

  emit(eventName, ...args) {
    const targetListeners = [...this.listeners].filter(
      (listener) => listener.name === eventName,
    );

    for (const listener of targetListeners) {
      listener.function(...args);
    }

    this.listeners = [...this.listeners].filter(
      (obj) => !(obj.once === true && obj.name === eventName),
    );
  }

  prependListener(eventName, listener) {
    const listenerObj = { name: eventName, function: listener, once: false };

    this.listeners = [listenerObj, ...this.listeners];
  }

  prependOnceListener(eventName, listener) {
    const listenerObj = { name: eventName, function: listener, once: true };

    this.listeners = [listenerObj, ...this.listeners];
  }

  removeAllListeners(eventName) {
    if (!eventName) {
      this.listeners = [];
    } else {
      this.listeners = [...this.listeners].filter(
        (obj) => obj.name !== eventName,
      );
    }
  }

  listenerCount(eventName) {
    return this.listeners.reduce(
      (acc, curr) => (curr.name === eventName ? acc + 1 : acc),
      0,
    );
  }
}

module.exports = MyEventEmitter;
