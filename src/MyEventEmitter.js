'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  validateEventName(eventName) {
    if (typeof eventName !== 'string') {
      throw new Error('invalid type of eventName');
    }
  }

  validateListener(listener) {
    if (typeof listener !== 'function') {
      throw new Error('invalid type of listener');
    }
  }

  on(eventName, listener) {
    this.validateEventName(eventName);
    this.validateListener(listener);

    this.listeners[eventName].push(listener);

    return this;
  }

  once(eventName, listener) {
    this.validateEventName(eventName);
    this.validateListener(listener);

    const onceWrapper = (...args) => {
      listener(args);
      this.off(eventName, onceWrapper);
    };

    this.listeners[eventName].push(onceWrapper);

    return this;
  }

  off(eventName, listenerToRemove) {
    this.validateEventName(eventName);
    this.validateListener(listenerToRemove);

    this.listeners[eventName] = this.listeners[eventName]
      .filter(listener => listener !== listenerToRemove);

    return this;
  }

  emit(eventName, args) {
    this.validateEventName(eventName);

    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach(listener => listener(args));
    }

    return this;
  }

  prependListener(eventName, listener) {
    this.validateEventName(eventName);
    this.validateListener(listener);

    this.listeners[eventName].unshift(eventName);

    return this;
  }

  prependOnceListener(eventName, listener) {
    this.validateEventName(eventName);
    this.validateListener(listener);

    const onceWrapper = (...args) => {
      listener(args);
      this.off(eventName, onceWrapper);
    };

    this.listeners[eventName].unshift(onceWrapper);

    return this;
  }

  removeAllListeners(eventName) {
    if (!eventName) {
      this.listeners = {};

      return this;
    }

    if (this.listeners[eventName]) {
      delete this.listeners[eventName];
    }

    return this;
  }

  listenerCount(eventName) {
    if (!eventName) {
      throw new Error('missed eventName');
    }

    return this.listeners[eventName].length || 0;
  }
}

module.exports = { MyEventEmitter };
