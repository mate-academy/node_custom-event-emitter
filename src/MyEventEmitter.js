'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  validateEventName(eventName) {
    if (typeof eventName !== 'string') {
      throw new Error('Event name must be a string');
    }
  }

  validateCallback(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
  }

  on(eventName, callback) {
    this.validateEventName(eventName);
    this.validateCallback(callback);

    if (!(eventName in this.events)) {
      this.events[eventName] = [callback];
    } else {
      this.events[eventName].push(callback);
    }

    return this;
  }

  once(eventName, callback) {
    this.validateEventName(eventName);
    this.validateCallback(callback);

    const oneTimeListener = (...args) => {
      this.off(eventName, oneTimeListener);
      callback(...args);
    };

    if (!(eventName in this.events)) {
      this.events[eventName] = [oneTimeListener];
    } else {
      this.events[eventName].push(oneTimeListener);
    }

    return this;
  }

  off(eventName, callback) {
    this.validateEventName(eventName);
    this.validateCallback(callback);

    this.events[eventName] = this.events[eventName].filter(listener => {
      return listener !== callback;
    });

    return this;
  }

  emit(eventName, ...args) {
    this.validateEventName(eventName);

    if (!this.events[eventName]) {
      return false;
    }

    this.events[eventName].forEach(listener => {
      listener(...args);
    });

    return true;
  }

  prependListener(eventName, callback) {
    this.validateEventName(eventName);
    this.validateCallback(callback);

    if (!(eventName in this.events)) {
      this.events[eventName] = [callback];
    } else {
      this.events[eventName].unshift(callback);
    }

    return this;
  }

  prependOnceListener(eventName, callback) {
    this.validateEventName(eventName);
    this.validateCallback(callback);

    const oneTimeListener = (...args) => {
      this.off(eventName, oneTimeListener);
      callback(...args);
    };

    if (!(eventName in this.events)) {
      this.events[eventName] = [oneTimeListener];
    } else {
      this.events[eventName].unshift(oneTimeListener);
    }

    return this;
  }

  removeAllListeners(eventName) {
    this.validateEventName(eventName);

    delete this.events[eventName];

    return this;
  }

  listenerCount(eventName) {
    this.validateEventName(eventName);

    return this.events[eventName].length || 0;
  }
}

module.exports = { MyEventEmitter };
