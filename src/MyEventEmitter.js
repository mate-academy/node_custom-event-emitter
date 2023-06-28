/* eslint-disable no-unused-vars */
'use strict';

const { checkEventName } = require('./helpers/checkEventName');
const { checkEventListener } = require('./helpers/checkEventListener');

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    checkEventName(eventName);
    checkEventListener(listener);

    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(listener);

    return this;
  }

  once(eventName, listener) {
    checkEventName(eventName);
    checkEventListener(listener);

    if (this.events[eventName]) {
      this.events[eventName] = [];
    }

    const oneTimeListener = (...args) => {
      listener(...args);
      this.off(eventName, oneTimeListener);
    };

    this.events[eventName].push(oneTimeListener);

    return this;
  }

  off(eventName, listener) {
    checkEventName(eventName);
    checkEventListener(listener);

    this.events[eventName] = this.events[eventName]
      .filter(event => event !== listener);

    return this;
  }

  emit(eventName, ...args) {
    checkEventName(eventName);

    if (this.events[eventName]) {
      this.events[eventName].forEach(event => event(...args));

      return true;
    }

    return false;
  }

  prependListener(eventName, listener) {
    checkEventName(eventName);
    checkEventListener(listener);

    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(listener);

    return this;
  }

  prependOnceListener(eventName, listener) {
    checkEventName(eventName);
    checkEventListener(listener);

    if (this.events[eventName]) {
      this.events[eventName] = [];
    }

    const oneTimeListener = (...args) => {
      listener(...args);
      this.off(eventName, oneTimeListener);
    };

    this.events[eventName].unshift(oneTimeListener);

    return this;
  }

  removeAllListeners(eventName) {
    checkEventName(eventName);

    this.events[eventName] = [];

    return this;
  }

  listenerCount(eventName) {
    checkEventName(eventName);

    return this.events[eventName].length || 0;
  }
}
