/* eslint-disable max-len */
'use strict';

class MyEventEmitter {
  constructor() {
    this.events = Object.create(null);
  }

  on(eventName, listener) {
    if (!listener) {
      return 0;
    }

    if (!this.events[eventName]) {
      this.events[eventName] = [{ callback: listener, once: false }];
    } else {
      this.events[eventName].push({ callback: listener, once: false });
    }
  }

  once(eventName, listener) {
    if (!listener) {
      return 0;
    }

    if (!this.events[eventName]) {
      this.events[eventName] = [{ callback: listener, once: true }];
    } else {
      this.events[eventName].push({ callback: listener, once: true });
    }
  }

  off(eventName, listener) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (l) => l.callback !== listener,
      );
    }
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return 0;
    }

    const listeners = [...this.events[eventName]];
    let count = 0;

    for (const listener of listeners) {
      listener.callback(...args);

      if (listener.once === true) {
        this.events[eventName] = this.events[eventName].filter(
          (ev) => ev !== listener,
        );
      }
      count++;
    }

    return count;
  }

  prependListener(eventName, listener) {
    if (!listener) {
      return 0;
    }

    if (!this.events[eventName]) {
      this.events[eventName] = [{ callback: listener, once: false }];
    } else {
      this.events[eventName].unshift({ callback: listener, once: false });
    }
  }

  prependOnceListener(eventName, listener) {
    if (!listener) {
      return 0;
    }

    if (!this.events[eventName]) {
      this.events[eventName] = [{ callback: listener, once: true }];
    } else {
      this.events[eventName].unshift({ callback: listener, once: true });
    }
  }

  removeAllListeners(eventName) {
    if (typeof eventName === 'undefined') {
      this.events = {};

      return;
    }

    delete this.events[eventName];
  }

  listenerCount(eventName) {
    if (!this.events[eventName]) {
      return 0;
    }

    return this.events[eventName].length;
  }
}

module.exports = MyEventEmitter;
