'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    const hasEvent = this.events[eventName];

    if (!hasEvent) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(listener);
  }
  once(eventName, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(eventName, wrapper);
    };

    wrapper.originalListener = listener;
    this.on(eventName, wrapper);
  }
  off(eventName, listener) {
    if (!this.events[eventName]) {
      // eslint-disable-next-line no-useless-return
      return;
    }

    this.events[eventName] = this.events[eventName].filter(
      (func) => func !== listener && func.originalListener !== listener,
    );
  }
  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return false;
    }

    this.events[eventName].forEach((listener) => {
      listener(...args);
    });
  }
  prependListener(eventName, listener) {
    const hasEvent = this.events[eventName];

    if (!hasEvent) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(listener);
  }
  prependOnceListener(eventName, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(eventName, wrapper);
    };

    wrapper.originalListener = listener;
    this.prependListener(eventName, wrapper);
  }
  removeAllListeners(eventName) {
    if (!eventName) {
      this.events = {};

      // eslint-disable-next-line no-useless-return
      return;
    }

    delete this.events[eventName];
  }
  listenerCount(eventName) {
    if (!this.events[eventName]) {
      return 0;
    }

    return this.events[eventName].length;
  }
}

module.exports = MyEventEmitter;
