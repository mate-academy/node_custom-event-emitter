'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (typeof eventName !== 'string') {
      throw new Error('The event name must be a string');
    }

    if (typeof listener !== 'function') {
      throw new Error('The listener must be a fanction');
    }

    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(listener);

    return this;
  }

  once(eventName, listener) {
    if (typeof eventName !== 'string') {
      throw new Error('The event name must be a string');
    }

    if (typeof listener !== 'function') {
      throw new Error('The listener must be a fanction');
    }

    const targetThis = this;

    function wrapperOnce(...args) {
      listener(...args);
      targetThis.off(eventName, wrapperOnce);
    }

    this.on(eventName, wrapperOnce);

    return this;
  }

  off(eventName, listenerToRemove) {
    if (typeof eventName !== 'string') {
      throw new Error('The event name must be a string');
    }

    if (typeof listenerToRemove !== 'function') {
      throw new Error('The listener to remove must be a fanction');
    }

    if (!this.events[eventName]) {
      throw new Error('This event name does not exist');
    }

    this.events[eventName] = this.events[eventName].filter(listener => (
      listener !== listenerToRemove
    ));

    return this;
  }

  emit(eventName, ...args) {
    if (typeof eventName !== 'string') {
      throw new Error('The event name must be a string');
    }

    if (!this.events[eventName]) {
      return false;
    }

    this.events[eventName].forEach(listener => {
      listener(...args);
    });

    return true;
  }

  prependListener(eventName, listener) {
    if (typeof eventName !== 'string') {
      throw new Error('The event name must be a string');
    }

    if (typeof listener !== 'function') {
      throw new Error('The listener must be a fanction');
    }

    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(listener);

    return this;
  }

  prependOnceListener(eventName, listener) {
    if (typeof eventName !== 'string') {
      throw new Error('The event name must be a string');
    }

    if (typeof listener !== 'function') {
      throw new Error('The listener must be a fanction');
    }

    const targetThis = this;

    function wrapperPrependOnce(...args) {
      listener(...args);
      targetThis.off(eventName, wrapperPrependOnce);
    }

    this.prependListener(eventName, wrapperPrependOnce);

    return this;
  }

  removeAllListeners(eventName) {
    if (typeof eventName !== 'string') {
      throw new Error('The event name must be a string');
    }

    if (eventName) {
      this.events[eventName] = [];
    } else {
      this.events = {};
    }

    return this;
  }

  listenerCount(eventName) {
    if (typeof eventName !== 'string') {
      throw new Error('The event name must be a string');
    }

    return this.events[eventName].length || 0;
  }
}

module.exports = { MyEventEmitter };
