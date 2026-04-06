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
      listener(...args);
      this.off(event, wrapper);
    };

    wrapper.listener = listener;

    this.on(event, wrapper);
  }

  off(event, listener) {
    if (!this.events[event]) {
      return;
    }

    this.events[event] = this.events[event].filter((l) => {
      return l !== listener && l.listener !== listener;
    });
  }

  emit(event, ...args) {
    if (!this.events[event]) {
      return;
    }

    [...this.events[event]].forEach((listener) => {
      listener(...args);
    });
  }

  prependListener(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].unshift(listener);
  }

  prependOnceListener(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };

    wrapper.listener = listener;

    this.prependListener(event, wrapper);
  }

  removeAllListeners(event) {
    if (event) {
      this.events[event] = [];
    } else {
      this.events = {};
    }
  }

  listenerCount(event) {
    return this.events[event]?.length ?? 0;
  }
}

module.exports = MyEventEmitter;
