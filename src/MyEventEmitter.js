'use strict';

class MyEventEmitter {
  listeners = {};

  on(eventName, callback) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].push(callback);
    } else {
      this.listeners[eventName] = [callback];
    }
  }
  once(eventName, callback) {
    const myCb = (...args) => {
      callback(...args);
      this.off(eventName, myCb);
    };

    this.on(eventName, myCb);
  }
  off(eventName, callback) {
    return (this.listeners[eventName] = this.listeners[eventName].filter(
      (item) => item !== callback,
    ));
  }
  emit(eventName, ...args) {
    const callbacks = this.listeners[eventName];

    for (const callback of callbacks) {
      callback(...args);
    }
  }
  prependListener(eventName, callback) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].unshift(callback);
    } else {
      this.listeners[eventName] = [callback];
    }
  }
  prependOnceListener(eventName, callback) {
    const myCb = (...args) => {
      callback(...args);
      this.off(eventName, myCb);
    };

    this.prependListener(eventName, myCb);
  }
  removeAllListeners(eventName) {
    return (this.listeners[eventName] = []);
  }
  listenerCount(eventName) {
    const callbacks = this.listeners[eventName];

    return callbacks ? callbacks.length : 0;
  }
}

module.exports = MyEventEmitter;
