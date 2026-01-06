'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push({ listener, once: false });
  }

  once(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push({ listener, once: true });
  }

  off(event, listener) {
    if (!this.events[event]) {
      return;
    }

    this.events[event] = this.events[event].filter(
      (item) => item.listener !== listener,
    );

    if (this.events[event].length === 0) {
      delete this.events[event];
    }
  }

  emit(event, ...args) {
    if (!this.events[event]) {
      return false;
    }

    const listeners = [...this.events[event]];

    listeners.forEach((item) => {
      item.listener(...args);

      if (item.once) {
        this.off(event, item.listener);
      }
    });

    return true;
  }

  prependListener(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].unshift({ listener, once: false });
  }

  prependOnceListener(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].unshift({ listener, once: true });
  }
  removeAllListeners(event) {
    if (event === undefined) {
      this.events = {};
    } else {
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
