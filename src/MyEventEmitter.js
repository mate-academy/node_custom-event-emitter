'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    this.events[event] = this.events[event]
      ? [...this.events[event], listener]
      : [listener];
  }

  once(event, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(event, onceWrapper);
    };

    this.on(event, onceWrapper);
  }

  off(event, listener) {
    this.events[event] = this.events[event]
      ? this.events[event].filter(fn => fn !== listener)
      : [];
  }

  emit(event, ...args) {
    this.events[event].forEach(listener => listener(...args));
  }

  prependListener(event, listener) {
    this.events[event] = this.events[event]
      ? [listener, ...this.events[event]]
      : [listener];
  }

  prependOnceListener(event, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(event, onceWrapper);
    };

    this.prependListener(event, onceWrapper);
  }

  removeAllListeners(event) {
    this.events[event] = [];
  }

  listenerCount(event) {
    return this.events[event].length || 0;
  }
}

module.exports = MyEventEmitter;
