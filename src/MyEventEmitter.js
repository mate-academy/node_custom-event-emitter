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

    return this;
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };

    wrapper.listener = listener;

    this.on(event, wrapper);

    return this;
  }

  off(event, listener) {
    if (!this.events[event]) {
      return this;
    }

    this.events[event] = this.events[event].filter((l) => {
      return l !== listener && l.listener !== listener;
    });

    return this;
  }

  emit(event, ...args) {
    if (!this.events[event]) {
      return false;
    }

    [...this.events[event]].forEach((listener) => {
      listener(...args);
    });

    return true;
  }

  prependListener(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].unshift(listener);

    return this;
  }

  prependOnceListener(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };

    wrapper.listener = listener;

    this.prependListener(event, wrapper);

    return this;
  }

  removeAllListeners(event) {
    if (event) {
      if (this.events[event]) {
        delete this.events[event];
      }
    } else {
      this.events = {};
    }

    return this;
  }

  listenerCount(event) {
    return this.events[event]?.length ?? 0;
  }
}

module.exports = MyEventEmitter;
