'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    this.addListener(eventName, listener);

    this.checkName(eventName);
    this.checkHandler(listener);

    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(listener);

    return this;
  }

  once(eventName, listener) {
    this.checkName(eventName);
    this.checkHandler(listener);

    const onceWrapper = (...args) => {
      listener.apply(this, args);
      this.off(eventName, onceWrapper);
    };

    this.on(eventName, onceWrapper);

    return this;
  }

  off(eventName, listener) {
    this.checkName(eventName);
    this.checkHandler(listener);

    if (!this.events[eventName]) {
      return this;
    }

    this.events[eventName] = this.events[eventName].filter(
      (event) => event !== listener
    );

    return this;
  }

  emit(eventName, ...args) {
    this.checkName(eventName);

    if (!this.events[eventName]) {
      return this;
    }

    this.events[eventName].forEach((event) => event.apply(this, args));

    return this;
  }

  prependListener(eventName, listener) {
    this.checkName(eventName);
    this.checkHandler(listener);

    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(listener);

    return this;
  }

  prependOnceListener(eventName, listener) {
    this.checkName(eventName);
    this.checkHandler(listener);

    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    const onceWrapper = (...args) => {
      listener.apply(this, args);
      this.off(eventName, onceWrapper);
    };

    this.events[eventName].unshift(onceWrapper);
  }

  removeAllListeners(eventName, listeners) {
    this.checkName(eventName);

    if (!this.events[eventName]) {
      return this;
    }

    this.events[eventName] = [];

    return this;
  }

  listenerCount(eventName) {
    this.checkName(eventName);

    if (!this.events[eventName]) {
      return 0;
    }

    return this.events[eventName].length;
  }

  checkName(eventName) {
    if (!eventName) {
      throw new Error('Event name must be defined!');
    }

    if (typeof eventName !== 'string') {
      throw new Error('Event name must be a string!');
    }
  }

  checkHandler(handler) {
    if (!handler) {
      throw new Error('Event handler must be defined!');
    }

    if (typeof handler !== 'function') {
      throw new Error('Event handler must be a function!');
    }
  }
}

module.exports = { MyEventEmitter };
