'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(eventName, cb) {
    if (typeof cb !== 'function') {
      throw new Error('Listener must be a function!');
    } else {
      this.listeners[eventName] = this.listeners[eventName] || [];
      this.listeners[eventName].push(cb);

      return this;
    }
  };

  once(eventName, cb) {
    if (typeof cb !== 'function') {
      throw new Error('Listener must be a function!');
    }

    this.listeners[eventName] = this.listeners[eventName] || [];

    const onceWrapper = (...args) => {
      cb(...args);
      this.off(eventName, onceWrapper);
    };

    this.listeners[eventName].push(onceWrapper);

    return this;
  };

  off(type, cb) {
    const listenersArrayByType = this.listeners[type];

    if (!listenersArrayByType) {
      return this;
    };

    for (let i = listenersArrayByType.length; i > 0; i--) {
      if (listenersArrayByType[i] === cb) {
        listenersArrayByType.splice(i, 1);
        break;
      }
    }

    return this;
  };

  emit(eventName, ...args) {
    const cbs = this.listeners[eventName];

    if (!cbs) {
      return false;
    }

    cbs.forEach((cb) => {
      cb(...args);
    });

    return true;
  };

  prependListener(eventName, cb) {
    if (typeof cb !== 'function') {
      throw new Error('Listener must be a function!');
    } else {
      this.listeners[eventName] = this.listeners[eventName] || [];
      this.listeners[eventName].unshift(cb);

      return this;
    }
  };

  prependOnceListener(eventName, cb) {
    if (typeof cb !== 'function') {
      throw new Error('Listener must be a function!');
    }

    this.listeners[eventName] = this.listeners[eventName] || [];

    const onceWrapper = () => {
      cb();
      this.off(eventName, onceWrapper);
    };

    this.listeners[eventName].unshift(onceWrapper);

    return this;
  };

  removeAllListeners(eventName) {
    this.listeners[eventName] = [];

    return this;
  };

  listenerCount(eventName) {
    const listenersByType = this.listeners[eventName] || [];

    return listenersByType.length;
  };
};

module.exports = {
  MyEventEmitter,
};
