/* eslint-disable no-useless-return */
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
  }
  once(event, listener) {
    const wrapper = (...args) => {
      this.off(event, wrapper);

      listener.apply(this, args);
    };

    wrapper.listener = listener;

    this.on(event, wrapper);
  }
  off(event, listener) {
    if (!this.events[event] || !listener) {
      return;
    }

    this.events[event] = this.events[event].filter(
      (fn) => fn !== listener && fn.listener !== listener,
    );
  }
  emit(event, ...args) {
    if (!this.events[event] || this.events[event].length === 0) {
      return false;
    }

    const listeners = [...this.events[event]];

    listeners.forEach((listener) => {
      listener.apply(this, args);
    });

    return true;
  }
  prependListener(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].unshift(listener);
  }
  prependOnceListener(event, listener) {
    const wrapper = (...args) => {
      this.off(event, wrapper);

      listener.apply(this, args);
    };

    wrapper.listener = listener;

    this.prependListener(event, wrapper);
  }
  removeAllListeners(event) {
    if (!event) {
      this.events = {};

      return;
    }

    if (this.events[event]) {
      delete this.events[event];
    }
  }
  listenerCount(event) {
    if (!this.events[event]) {
      return 0;
    }

    return this.events[event].length;
  }
}

module.exports = MyEventEmitter;
