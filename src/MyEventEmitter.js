'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(name, listener) {
    const { events } = this;

    if (!events[name]) {
      events[name] = [];
    }

    events[name].push(listener);
  }

  once(name, listener) {
    const onceListener = (...args) => {
      listener(...args);
      this.off(name, onceListener);
    };

    this.on(name, onceListener);
  }

  off(name, listener) {
    const { events } = this;

    if (events[name]) {
      events[name] = events[name].filter(callback => callback !== listener);
    }
  }

  emit(name, ...args) {
    this.events[name].forEach(listener => listener(...args));
  }

  prependListener(name, listener) {
    const { events } = this;

    if (!events[name]) {
      events[name] = [];
    }

    events[name].unshift(listener);
  }

  prependOnceListener(name, listener) {
    const onceListener = (...args) => {
      listener(...args);
      this.off(name, onceListener);
    };

    this.prependListener(name, onceListener);
  }

  removeAllListeners(name) {
    this.events[name] = [];
  }

  listenerCount(name) {
    const { events } = this;

    return events[name] ? events[name].length : 0;
  }
}

module.exports = MyEventEmitter;
