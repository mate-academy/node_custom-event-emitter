'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(eventName, callBack) {
    if (typeof callback !== 'function' || typeof eventName !== 'string') {
      throw new Error();
    }

    if (this.listeners.hasOwnProperty(eventName)) {
      this.listeners[eventName].push(callBack);
    } else {
      this.listeners[eventName] = [ callBack ];
    }

    return this;
  }

  once(eventName, callBack) {
    if (typeof callback !== 'function') {
      throw new Error();
    }

    const newCallback = (...args) => {
      this.off(eventName, callBack);

      return callBack(...args);
    };

    this.on(eventName, newCallback);

    return this;
  }

  off(eventName, callBack) {
    if (!this.listeners.hasOwnProperty(eventName)
      || !this.listeners[eventName].includes(callBack)) {
      throw new Error();
    }

    if (this.listeners[eventName].length === 1) {
      delete this.listeners[eventName];
    } else {
      this.listeners[eventName] = this.listeners[eventName]
        .filter(listener => listener !== callBack);
    }

    return this;
  }

  emit(eventName, ...args) {
    if (!this.listeners.hasOwnProperty(eventName)) {
      throw new Error();
    }

    this.listeners[eventName].forEach(listener => {
      listener(...args);
    });

    return this;
  }

  prependListener(eventName, callBack) {
    if (typeof callback !== 'function' || typeof eventName !== 'string') {
      throw new Error();
    }

    if (this.listeners.hasOwnProperty(eventName)) {
      this.listeners[eventName].unshift(callBack);
    } else {
      this.listeners[eventName] = [ callBack ];
    }

    return this;
  }

  prependOnceListener(eventName, callBack) {
    if (typeof callback !== 'function') {
      throw new Error();
    }

    const newCallback = (...args) => {
      this.off(eventName, callBack);

      return callBack(...args);
    };

    this.prependListener(eventName, newCallback);

    return this;
  }

  removeAllListeners(eventName = null) {
    if (!eventName) {
      Object.keys(this.listeners).forEach(key => delete this.listeners[key]);
    } else if (this.listeners.hasOwnProperty(eventName)) {
      delete this.listeners[eventName];
    } else {
      throw new Error();
    }

    return this;
  }

  listenerCount(eventName) {
    if (this.listeners.hasOwnProperty(eventName)) {
      return this.listeners[eventName].length;
    } else {
      throw new Error();
    }
  }
}

module.exports = {
  MyEventEmitter,
};
