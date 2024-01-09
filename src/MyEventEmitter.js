'use strict';

const { checkListenerType } = require('./checkListenerType');

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(eventName, listener) {
    checkListenerType(listener);

    if (this.listeners[eventName]) {
      this.listeners.eventName.push(listener);
    } else {
      this.listeners.eventName = [];
    }

    return this;
  }

  once(eventName, listener) {
    checkListenerType(listener);

    const callOnce = (...args) => {
      listener(...args);
      this.off(eventName, callOnce);
    };

    this.on(eventName, callOnce);

    return this;
  }

  off(eventName, listener) {
    if (this.listeners[eventName]) {
      this.listeners.eventName
        .filter(subscribedListener => subscribedListener !== listener);
    }

    return this;
  }

  emit(eventName) {
    if (this.listeners[eventName]) {
      this.listeners[eventName]
        .forEach(listener => listener(...arguments));
    }

    return this;
  }

  prependListener(eventName, listener) {
    checkListenerType(listener);

    if (this.listeners[eventName]) {
      this.listeners[eventName].unShift(listener);
    }

    return this;
  }

  prependOnceListener(eventName, listener) {
    checkListenerType(listener);

    const callOnce = (...args) => {
      listener(...args);
      this.off(eventName, callOnce);
    };

    this.prependListener(eventName, callOnce);

    return this;
  }

  removeAllListeners(eventName) {
    if (eventName && this.listeners[eventName]) {
      this.listeners[eventName] = [];
    } else {
      this.listeners = {};
    }

    return this;
  }

  listenerCount(eventName) {
    if (this.listeners[eventName]) {
      return this.listeners[eventName].length;
    }
  }
}

module.exports = { MyEventEmitter };
