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

    this.on(event, wrapper);
  }
  off(event, listener) {
    const listeners = this.events[event];

    if (!listeners) {
      return;
    }

    this.events[event] = listeners.filter((l) => l !== listener);
  }
  emit(event, ...args) {
    const listeners = this.events[event];

    if (!listeners) {
      return;
    }

    const listenersCopy = [...listeners];

    listenersCopy.forEach((listener) => {
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

    this.prependListener(event, wrapper);
  }
  removeAllListeners(event) {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {};
    }
  }
  listenerCount(event) {
    return this.events[event]?.length || 0;
  }
}

module.exports = MyEventEmitter;
