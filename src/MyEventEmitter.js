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
    if (!this.events[event]) {
      this.events[event] = [];
    }

    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };

    this.events[event].push(wrapper);
  }
  off(event, listener) {
    if (!this.events[event]) {
      return;
    }

    this.events[event] = this.events[event].filter(
      (currListener) => currListener !== listener,
    );
  }
  emit(event, ...args) {
    if (!this.events[event]) {
      return;
    }

    for (const lisener of [...this.events[event]]) {
      lisener(...args);
    }
  }
  prependListener(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].unshift(listener);
  }
  prependOnceListener(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };

    this.events[event].unshift(wrapper);
  }
  removeAllListeners(event) {
    if (!event) {
      this.events = {};
    } else if (this.events[event]) {
      this.events[event] = [];
    }
  }
  listenerCount(event) {
    return this.events[event]?.length || 0;
  }
}

module.exports = MyEventEmitter;
