'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(eventName, listener) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push({
      listener, once: false,
    }
    );
  }

  once(eventName, listener) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push({
      listener, once: true,
    }
    );
  }

  off(eventName, listener) {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName]
        .filter((el) => el.listener !== listener);
    }
  }
  emit(eventName, ...args) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach(({ listener, once }) => {
        listener(...args);

        if (once) {
          this.listeners[eventName] = this.listeners[eventName]
            .filter((el) => el.listener !== listener);
        }
      });
    }
  }

  prependListener(eventName, listener) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].unshift({
      listener, once: false,
    });
  }

  prependOnceListener(eventName, listener) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].unshift({
      listener, once: true,
    });
  }

  removeAllListeners(eventName) {
    if (eventName) {
      delete this.listeners[eventName];
    } else {
      this.listeners = {};
    }
  }

  listenerCount(eventName) {
    if (this.listeners[eventName]) {
      return this.listeners[eventName].length;
    }

    return 0;
  }
}

module.exports = MyEventEmitter;
