'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };

    wrapper.originalListener = listener;
    this.on(event, wrapper);
  }

  off(event, listener) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event] = this.listeners[event].filter(
      (lis) => lis !== listener && lis.originalListener !== listener,
    );
  }

  emit(event, ...args) {
    const eventListeners = this.listeners[event];

    if (!eventListeners || eventListeners.length === 0) {
      return;
    }

    [...eventListeners].forEach((listener) => {
      listener(...args);
    });
  }

  prependListener(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].unshift(listener);
  }

  prependOnceListener(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };

    wrapper.originalListener = listener;
    this.prependListener(event, wrapper);
  }

  removeAllListeners(event) {
    if (event) {
      if (this.listeners[event]) {
        delete this.listeners[event];
      }
    } else {
      this.listeners = {};
    }
  }

  listenerCount(event) {
    const eventListeners = this.listeners[event];

    return eventListeners ? eventListeners.length : 0;
  }
}

module.exports = MyEventEmitter;
