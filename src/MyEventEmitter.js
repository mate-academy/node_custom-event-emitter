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
    const wrapperListener = (...args) => {
      this.off(event, wrapperListener);
      listener(...args);
    };

    wrapperListener.original = listener;

    this.on(event, wrapperListener);
  }
  off(event, listener) {
    if (!this.events[event]) {
      return;
    }

    this.events[event] = this.events[event].filter(
      (elem) => elem !== listener && elem.original !== listener,
    );
  }
  emit(event, ...args) {
    if (!this.events[event]) {
      return;
    }

    [...this.events[event]].forEach((listener) => {
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
    const wrapperListener = (...args) => {
      this.off(event, wrapperListener);
      listener(...args);
    };

    wrapperListener.original = listener;

    this.prependListener(event, wrapperListener);
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
