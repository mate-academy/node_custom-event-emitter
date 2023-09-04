'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  validateEventName(eventName) {
    if (typeof eventName !== 'string') {
      throw new Error('The event name must be a string');
    }
  }

  validateListener(listener) {
    if (typeof listener !== 'function') {
      throw new Error('The listener must be a fanction');
    }
  }

  on(eventName, listener) {
    this.validateEventName(eventName);
    this.validateListener(listener);

    if (!(eventName in this.events)) {
      this.events[eventName] = [listener];
    } else {
      this.events[eventName].push(listener);
    }

    return this;
  }

  once(eventName, listener) {
    this.validateEventName(eventName);
    this.validateListener(listener);

    const oneTimeListener = (...args) => {
      listener(...args);
      this.off(eventName, oneTimeListener);
    };

    if (!(eventName in this.events)) {
      this.events[eventName] = [oneTimeListener];
    } else {
      this.events[eventName].push(oneTimeListener);
    }

    return this;
  }

  off(eventName, listener) {
    this.validateEventName(eventName);
    this.validateListener(listener);

    this.events[eventName] = this.events[eventName].filter(eventListener =>
      eventListener !== listener
    );

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
  };

  prependListener(eventName, listener) {
    this.validateEventName(eventName);
    this.validateListener(listener);

    if (!(eventName in this.events)) {
      this.events[eventName] = [listener];
    } else {
      this.events[eventName].unshift(listener);
    }

    return this;
  }

  prependOnceListener(eventName, listener) {
    this.validateEventName(eventName);
    this.validateListener(listener);

    const oneTimeListener = (...args) => {
      listener(...args);
      this.off(eventName, oneTimeListener);
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

module.exports.MyEventEmitter = MyEventEmitter;
