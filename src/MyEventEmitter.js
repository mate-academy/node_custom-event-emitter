'use strict';

class MyEventEmitter {
  listeners = {};
  on(name, callback) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }
    this.listeners[name].push(callback);
  }
  once(eventName, callback) {
    const wrapper = () => {
      callback();
      this.off(eventName, wrapper);
    };

    wrapper.original = callback;

    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(wrapper);
  }
  off(eventName, callback) {
    if (!this.listeners[eventName]) {
      return;
    }

    this.listeners[eventName] = this.listeners[eventName].filter(
      (fn) => fn !== callback && (!fn.original || fn.original !== callback),
    );
  }
  emit(eventName, ...args) {
    const callbacks = this.listeners[eventName];

    if (callbacks) {
      callbacks.forEach((fn) => {
        fn(...args);
      });
    }
  }
  prependListener(name, callback) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }
    this.listeners[name].unshift(callback);
  }
  prependOnceListener(eventName, callback) {
    const wrapper = () => {
      callback();
      this.off(eventName, wrapper);
    };

    wrapper.original = callback;

    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].unshift(wrapper);
  }
  removeAllListeners(eventName = 'all') {
    if (eventName !== 'all') {
      this.listeners[eventName] = [];

      return;
    }
    this.listeners = {};
  }
  listenerCount(event) {
    return this.listeners[event] ? this.listeners[event].length : 0;
  }
}

module.exports = MyEventEmitter;
