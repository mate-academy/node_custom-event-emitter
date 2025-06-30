'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (typeof listener !== 'function') {
      return;
    }

    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(listener);
  }

  once(event, listener) {
    const onceWrapper = (...args) => {
      this.off(event, onceWrapper);
      listener.apply(this, args);
    };

    onceWrapper.originalListener = listener;
    this.on(event, onceWrapper);
  }

  off(event, listener) {
    if (!this.events[event]) {
      throw new Error(`Event '${event}' doesn't exist`);
    }

    this.events[event] = this.events[event].filter(
      (e) => e !== listener && e.originalListener !== listener,
    );
  }

  emit(event, ...args) {
    if (!this.events[event] || this.events[event].length === 0) {
      return;
    }

    this.events[event].slice().forEach((e) => e.apply(this, args));
  }

  prependListener(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].unshift(listener);
  }

  prependOnceListener(event, listener) {
    const onceWrapper = (...args) => {
      this.off(event, onceWrapper);
      listener.apply(this, args);
    };

    this.prependListener(event, onceWrapper);
  }

  removeAllListeners(event) {
    if (event) {
      this.events[event] = [];
    } else {
      this.events = {};
    }
  }

  listenerCount(event) {
    return this.events[event] ? this.events[event].length : 0;
  }
}

module.exports = MyEventEmitter;
