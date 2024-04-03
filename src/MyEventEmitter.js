'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  emptyListener(eventName) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
  }

  setValidation(eventName, eventListener) {
    if (
      !(typeof eventName === 'string' && typeof eventListener === 'function')
    ) {
      throw new Error('ERROR: invalid arguments');
    }
  }

  onceArgs(eventName, eventListener) {
    const event = (...args) => {
      eventListener(...args);
      this.off(eventName, event);
    };

    return event;
  }

  on(eventName, eventListener) {
    this.setValidation(eventName, eventListener);
    this.emptyListener(eventName);

    this.listeners[eventName].push(eventListener);

    return this;
  }

  once(eventName, eventListener) {
    this.setValidation(eventName, eventListener);
    this.emptyListener(eventName);

    this.listeners[eventName].push(this.onceArgs(eventName, eventListener));

    return this;
  }

  off(eventName, eventListener) {
    this.listeners[eventName] = this.listeners[eventName].filter(
      (listener) => listener !== eventListener,
    );

    return this;
  }

  emit(eventName, ...args) {
    this.listeners[eventName].forEach((listener) => listener(...args));

    return this;
  }

  prependListener(eventName, eventListener) {
    this.setValidation(eventName, eventListener);
    this.emptyListener(eventName);

    this.listeners[eventName].unshift(eventListener);

    return this;
  }

  prependOnceListener(eventName, eventListener) {
    this.setValidation(eventName, eventListener);
    this.emptyListener(eventName);

    this.listeners[eventName].unshift(this.onceArgs(eventName, eventListener));

    return this;
  }

  removeAllListeners(eventName) {
    if (this.listeners[eventName]) {
      delete this.listeners[eventName];
    }

    return this;
  }

  listenerCount(eventName) {
    if (!eventName) {
      throw new Error('ERROR: eventName isn`t passed');
    }

    if (this.listeners[eventName]) {
      return this.listeners[eventName].length;
    }

    return 0;
  }
}

module.exports = MyEventEmitter;
