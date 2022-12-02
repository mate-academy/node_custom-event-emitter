'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  validation(eventName, listener) {
    if (!(
      typeof listener === 'function'
      && typeof eventName === 'string'
    )) {
      throw new Error('Invalid arguments');
    }
  }

  isAnyListeners(eventName) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
  }

  makeOnceWrapper(eventName, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(eventName, wrapper);
    };

    return wrapper;
  }

  on(eventName, listener) {
    this.validation(eventName, listener);
    this.isAnyListeners(eventName);
    this.listeners[eventName].push(listener);

    return this;
  }

  once(eventName, listener) {
    this.validation(eventName, listener);
    this.isAnyListeners(eventName);
    this.listeners[eventName].push(this.makeOnceWrapper(eventName, listener));

    return this;
  }

  off(eventName, listener) {
    this.listeners[eventName]
      = this.listeners[eventName]
        .filter(listenerSet => listener !== listenerSet);

    return this;
  }

  emit(eventName, data) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach(listener => listener(data));
    }

    return this;
  }

  prependListener(eventName, listener) {
    this.validation(eventName, listener);
    this.isAnyListeners(eventName);
    this.listeners[eventName].unshift(listener);

    return this;
  }

  prependOnceListener(eventName, listener) {
    this.validation(eventName, listener);
    this.isAnyListeners(eventName);

    this.listeners[eventName].unshift(
      this.makeOnceWrapper(eventName, listener)
    );

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
      throw new Error('pass the event name to the method');
    }

    return this.listeners[eventName].length || 0;
  }
}

module.exports = {
  MyEventEmitter,
};
