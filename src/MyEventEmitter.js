'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push({ listener, once: false });
  }

  once(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push({ listener, once: true });
  }

  off(event, listener) {
    if (!this.listeners[event]) {
      return false;
    }

    const listeners = this.listeners[event];

    this.listeners[event] = listeners.filter(
      (item) => item.listener !== listener,
    );

    if (this.listeners[event].length === 0) {
      delete this.listeners[event];
    }

    return true;
  }

  emit(event, ...args) {
    if (!this.listeners[event]) {
      return false;
    }

    const listenersToCall = [...this.listeners[event]];

    listenersToCall.forEach((item) => {
      item.listener(...args);

      if (item.once) {
        this.off(event, item.listener);
      }
    });

    return true;
  }

  prependListener(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].unshift({ listener, once: false });
  }

  prependOnceListener(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].unshift({ listener, once: true });
  }

  removeAllListeners(event) {
    if (event) {
      delete this.listeners[event];
    } else {
      this.listeners = {};
    }
  }

  listenerCount(event) {
    if (!this.listeners[event]) {
      return 0;
    }

    return this.listeners[event].length;
  }
}

module.exports = MyEventEmitter;
