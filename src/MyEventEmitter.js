'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  validateEventName(eventName) {
    if (typeof eventName !== 'string') {
      throw new Error('The event name supposed to be a string');
    }
  }

  validateListener(listener) {
    if (typeof listener !== 'function') {
      throw new Error('The listener supposed to be a function');
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

    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    const onceFn = (...args) => {
      listener(...args);
      this.off(eventName, onceFn);
    };

    this.events[eventName].push(onceFn);

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

    const onceList = (...args) => {
      listener(...args);
      this.off(eventName, onceList);
    };

    if (!(eventName in this.events)) {
      this.events[eventName] = [onceList];
    } else {
      this.events[eventName].unshift(onceList);
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
