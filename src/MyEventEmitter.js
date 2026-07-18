'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(name, listener) {
    if (!this.events[name]) {
      this.events[name] = [];
    }

    this.events[name].push(listener);
  }

  once(name, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(name, wrapper);
    };

    wrapper.listener = listener;

    this.on(name, wrapper);
  }

  off(name, listener) {
    if (!this.events[name]) {
      return;
    }

    this.events[name] = this.events[name].filter(
      (fn) => fn !== listener && fn.listener !== listener,
    );

    if (this.events[name].length === 0) {
      delete this.events[name];
    }
  }

  emit(name, ...args) {
    if (!this.events[name]) {
      return false;
    }

    const listiners = [...this.events[name]];

    for (let i = 0; i < listiners.length; i++) {
      const listener = listiners[i];

      listener(...args);
    }

    return true;
  }
  prependListener(name, listener) {
    if (!this.events[name]) {
      this.events[name] = [];
    }

    this.events[name].unshift(listener);
  }

  prependOnceListener(name, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(name, wrapper);
    };

    wrapper.listener = listener;

    this.prependListener(name, wrapper);
  }

  removeAllListeners(name) {
    if (name === undefined) {
      this.events = {};

      return;
    }

    delete this.events[name];
  }

  listenerCount(name) {
    return this.events[name] ? this.events[name].length : 0;
  }
}

module.exports = MyEventEmitter;
