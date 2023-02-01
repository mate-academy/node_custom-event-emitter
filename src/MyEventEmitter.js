'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    this.validateEventName(eventName);
    this.validateHandler(listener);

    this.events[eventName].push(listener);

    return this;
  }
  once(eventName, listener) {
    this.validateEventName(eventName);
    this.validateHandler(listener);

    this.events[eventName] = this.events[eventName] || [];

    const onceWrapper = () => {
      listener();
      this.off(eventName, onceWrapper);
    };

    this.events[eventName].push(onceWrapper);

    return this;
  }
  off(eventName, listener) {
    this.validateEventName(eventName);
    this.validateHandler(listener);

    return this.removeListener(eventName, listener);
  }
  emit(eventName, ...args) {
    this.validateEventName(eventName);

    if (!this.events[eventName]) {
      return false;
    }

    this.events[eventName].forEach((f) => f(...args));

    return true;
  }
  prependListener(eventName, listener) {
    this.validateEventName(eventName);
    this.validateHandler(listener);

    this.events[eventName].unshift(eventName);

    return this;
  }
  prependOnceListener(eventName, listener) {
    this.validateEventName(eventName);
    this.validateHandler(listener);

    const onceWrapper = (...args) => {
      listener(args);
      this.off(eventName, onceWrapper);
    };

    this.events[eventName].unshift(onceWrapper);

    return this;
  }
  removeAllListeners(eventName) {
    this.validateEventName(eventName);

    if (!eventName) {
      this.events = {};
    }

    return this;
  }
  listenerCount(eventName) {
    this.validateEventName(eventName);

    let listnersCount = 0;
    const listeners = this.events[eventName] || [];

    listnersCount = listeners.length;

    return listnersCount;
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
