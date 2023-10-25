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
    const onceListener = (...args) => {
      listener(...args);
      this.off(event, onceListener);
    };

    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(onceListener);
  }

  off(event, listener) {
    if (this.events[event]) {
      this.events[event] = this.events[event]
        .filter((myListener) => myListener !== listener);
    }
  }

  emit(event, ...args) {
    if (this.events[event]) {
      for (const listener of this.events[event]) {
        listener(...args);
      }
    }
  }

  prependListener(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].unshift(listener);
  }

  prependOnceListener(event, listener) {
    const oncePrepandListener = (...args) => {
      listener(...args);
      this.off(event, oncePrepandListener);
    };

    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].unshift(oncePrepandListener);
  }

  removeAllListeners(event) {
    if (event) {
      if (this.events[event]) {
        delete this.events[event];
      }
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

module.exports = { MyEventEmitter };
