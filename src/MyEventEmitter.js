'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  checkEvent(event) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
  }

  on(event, listener) {
    this.checkEvent(event);

    this.events[event].push({ listener });

    return this;
  }

  once(event, listener) {
    this.checkEvent(event);

    this.events[event].push({ listener, once: true });

    return this;
  }

  off(event, listener) {
    this.events[event] = this.events[event].filter(
      ({ listener: lis }) => lis !== listener,
    );

    if (!this.events[event].length) {
      delete this.events[event];
    }

    return this;
  }

  emit(event, ...args) {
    const listeners = this.events[event];

    if (!listeners || !listeners.length) {
      return false;
    }

    const copyListeners = [...this.events[event]];

    copyListeners.forEach(({ listener, once }) => {
      listener(...args);

      if (once) {
        this.off(event, listener);
      }
    });

    return true;
  }

  prependListener(event, listener) {
    this.checkEvent(event);
    this.events[event].unshift({ listener });

    return this;
  }

  prependOnceListener(event, listener) {
    this.checkEvent(event);
    this.events[event].unshift({ listener, once: true });

    return this;
  }

  removeAllListeners(event) {
    if (event) {
      delete this.events[event];

      return this;
    }

    this.events = {};

    return this;
  }

  listenerCount(event) {
    if (this.events[event]) {
      return this.events[event].length;
    }

    return 0;
  }
}

module.exports = MyEventEmitter;
