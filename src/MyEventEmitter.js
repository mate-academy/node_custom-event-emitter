'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  check(eventName) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
  }

  on(eventName, listener) {
    this.check(eventName);

    this.events[eventName].push({ listener });

    return this;
  }

  once(eventName, listener) {
    this.check(eventName);

    this.events[eventName].push({ listener, once: true });

    return this;
  }

  off(eventName, listener) {
    const listeners = this.events[eventName];

    if (!listeners || listeners.length === 0) {
      return this;
    }

    this.events[eventName] = listeners.filter(
      ({ listener: original }) => original !== listener,
    );

    if (this.events[eventName].length === 0) {
      delete this.events[eventName];
    }

    return this;
  }

  emit(eventName, ...args) {
    const listeners = this.events[eventName];

    if (!listeners || listeners.length === 0) {
      return false;
    }

    [...listeners].forEach(({ listener, once }) => {
      listener(...args);

      if (once) {
        this.off(eventName, listener);
      }
    });

    return true;
  }

  prependListener(eventName, listener) {
    this.check(eventName);

    this.events[eventName].unshift({ listener });

    return this;
  }

  prependOnceListener(eventName, listener) {
    this.check(eventName);

    this.events[eventName].unshift({ listener, once: true });

    return this;
  }

  removeAllListeners(eventName) {
    if (eventName) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }

    return this;
  }

  listenerCount(eventName) {
    return this.events[eventName] ? this.events[eventName].length : 0;
  }
}

module.exports = MyEventEmitter;
