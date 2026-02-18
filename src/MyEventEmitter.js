'use strict';

class MyEventEmitter {
  events = {};

  on(eventName, handler) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(handler);
  }

  once(eventName, handler) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      handler(...args);
    };

    this.on(eventName, wrapper);
  }

  off(eventName, callback) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName] = this.events[eventName].filter(
      (cb) => cb !== callback,
    );
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName].slice().forEach((cb) => cb(...args));
  }

  prependListener(eventName, handler) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(handler);
  }

  prependOnceListener(eventName, handler) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      handler(...args);
    };

    this.prependListener(eventName, wrapper);
  }

  removeAllListeners(eventName) {
    if (!eventName) {
      this.events = {};

      return;
    }

    delete this.events[eventName];
  }

  listenerCount(eventName) {
    if (this.events[eventName]) {
      return this.events[eventName].length;
    } else {
      return 0;
    }
  }
}

module.exports = MyEventEmitter;
