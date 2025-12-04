'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);

    return this;
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };

    wrapper._original = listener;

    return this.on(event, wrapper);
  }

  off(event, listener) {
    if (!this.events[event]) {
      return this;
    }

    this.events[event] = this.events[event].filter(
      (l) => l !== listener && l._original !== listener,
    );

    return this;
  }

  emit(event, ...args) {
    if (!this.events[event]) {
      return false;
    }

    const listeners = [...this.events[event]];

    for (const listener of listeners) {
      listener(...args);
    }

    return true;
  }

  prependListener(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].unshift(listener);

    return this;
  }

  prependOnceListener(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };

    wrapper._original = listener;

    return this.prependListener(event, wrapper);
  }

  removeAllListeners(event) {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {};
    }

    return this;
  }

  listenerCount(event) {
    return this.events[event] ? this.events[event].length : 0;
  }
}

module.exports = MyEventEmitter;
