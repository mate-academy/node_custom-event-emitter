'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(eventName, listener) {
    this.validateEventName(eventName);
    this.validateHandler(listener);

    this.listeners[eventName].push(listener);

    return this;
  }

  once(eventName, listener) {
    this.validateEventName(eventName);
    this.validateHandler(listener);

    this.listeners[eventName] = this.listeners[eventName] || [];

    const onceWrapper = (...args) => {
      listener(args);
      this.off(eventName, onceWrapper);
    };

    this.listeners[eventName].push(onceWrapper);

    return this;
  }

  off(eventName, listener) {
    this.validateEventName(eventName);
    this.validateHandler(listener);

    return this.removeListener(eventName, listener);
  }

  emit(eventName, ...args) {
    this.validateEventName(eventName);

    if (!this.listeners[eventName]) {
      return false;
    }

    this.listeners[eventName].forEach((listener) => listener(...args));

    return true;
  }

  prependListener(eventName, listener) {
    this.validateEventName(eventName);
    this.validateHandler(listener);

    this.listeners[eventName].unshift(eventName);

    return this;
  }

  prependOnceListener(eventName, listener) {
    this.validateEventName(eventName);
    this.validateHandler(listener);

    const onceWrapper = (...args) => {
      listener(args);
      this.off(eventName, onceWrapper);
    };

    this.listeners[eventName].unshift(onceWrapper);

    return this;
  }

  removeAllListeners(eventName) {
    if (!eventName) {
      this.events = {};
    }

    return this;
  }

  listenerCount(eventName) {
    this.validateEventName(eventName);

    return this.listeners[eventName].length || 0;
  }

  validateEventName(event) {
    if (!event) {
      throw new Error('Event should be defined');
    }

    if (typeof event !== 'string') {
      throw new Error('The type of event name should be defined as string');
    }
  }

  validateHandler(handler) {
    if (!handler) {
      throw new Error('Handler should be defined');
    }

    if (typeof handler !== 'function') {
      throw new Error('Handler should be defined as function');
    }
  }
}

module.exports = { MyEventEmitter };
