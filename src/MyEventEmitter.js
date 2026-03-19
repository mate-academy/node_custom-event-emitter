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

    return this;
  }

  once(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push({ listener, once: true });

    return this;
  }

  off(event, listener) {
    if (!this.events[event]) {
      return this;
    }

    this.events[event] = this.events[event].filter(
      (item) => item.listener !== listener,
    );

    if (this.events[event].length === 0) {
      delete this.events[event];
    }

    return this;
  }

  emit(event, ...args) {
    if (!this.events[event]) {
      return false;
    }

    const listeners = [...this.events[event]];

    for (const item of listeners) {
      item.listener(...args);

      if (item.once) {
        this.off(event, item.listener);
      }
    }

    return true;
  }

  prependListener(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].unshift({ listener, once: false });

    return this;
  }

  prependOnceListener(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].unshift({ listener, once: true });

    return this;
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
    // FIX: Return the length (a number), not the array (an object)
    return this.events[event] ? this.events[event].length : 0;
  }
}

module.exports = MyEventEmitter;
