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
      listener(...args);
    };

    this.on(event, wrapper);
  }

  off(event, listener) {
    if (!this.events[event]) {
      return;
    }

    this.events[event] = this.events[event].filter(
      (eventListener) => eventListener !== listener,
    );
  }

  emit(event, ...args) {
    if (!this.events[event]) {
      return;
    }

    const listeners = [...this.events[event]];

    listeners.forEach((listenerFn) => {
      listenerFn(...args);
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
      this.off(event, wrapper);
      listener(...args);
    };

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
    if (this.events[event]) {
      return this.events[event].length;
    } else {
      return 0;
    }
  }
}

module.exports = MyEventEmitter;
