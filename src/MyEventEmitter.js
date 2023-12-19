'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (typeof listener !== 'function') {
      throw new Error('Listener must be a function');
    }

    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(listener);

    return this;
  }

  once(eventName, listener) {
    if (typeof listener !== 'function') {
      throw new Error('Listener must be a function');
    }

    this.events[eventName] = this.events[eventName] || [];

    const oneCallFunc = (...args) => {
      listener(args);
      this.off(eventName, oneCallFunc);
    };

    this.events[eventName].push(oneCallFunc);
  }

  off(eventName, listener) {
    if (!this.events[eventName]) {
      const errText = `Event ${eventName} doest not exist. `
      + 'Cannot remove a listener';

      throw new Error(errText);
    }

    const events = this.events[eventName];

    for (let i = 0; i < events.length; i += 1) {
      if (events[i] === listener) {
        events.splice(i, 1);
      }
    }

    return this;
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return false;
    }

    this.events[eventName].forEach(callback => callback(...args));

    return true;
  }

  prependListener(eventName, listener) {
    if (typeof listener !== 'function') {
      throw new Error('Listener must be a function');
    }

    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].unshift(listener);

    return this;
  }

  prependOnceListener(eventName, listener) {
    if (typeof listener !== 'function') {
      throw new Error('Listener must be a function');
    }

    this.events[eventName] = this.events[eventName] || [];

    const oneCallFunc = (...args) => {
      listener(args);
      this.off(eventName, oneCallFunc);
    };

    this.events[eventName].unshift(oneCallFunc);
  }

  removeAllListeners(eventName) {
    if (!this.events[eventName]) {
      const errText = `Event ${eventName} doest not exist. `
        + 'Cannot remove a listeners';

      throw new Error(errText);
    }

    this.events[eventName] = [];

    return this;
  }

  listenerCount(eventName) {
    const listeners = this.events[eventName] = this.events[eventName] || [];

    return listeners.length;
  }
}

module.exports.MyEventEmitter = MyEventEmitter;
