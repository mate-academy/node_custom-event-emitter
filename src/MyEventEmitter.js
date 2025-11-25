'use strict';

class MyEventEmitter {
  events = {};

  on(eventName, listener) {
    if (typeof listener !== 'function') {
    } else {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }

      this.events[eventName].push({ fn: listener, once: false });
    }
  }
  once(eventName, listener) {
    if (typeof listener !== 'function') {
    } else {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }

      this.events[eventName].push({ fn: listener, once: true });
    }
  }
  off(eventName, listener) {
    if (!this.events[eventName]) {
    } else {
      if (listener === undefined) {
        return;
      }

      this.events[eventName] = this.events[eventName].filter(
        (object) => object.fn !== listener,
      );

      if (this.events[eventName].length === 0) {
        delete this.events[eventName];
      }
    }
  }
  emit(eventName, ...args) {
    if (!this.events[eventName]) {
    } else {
      const listEvent = (this.events[eventName] || []).concat();

      for (const object of listEvent) {
        if (object && typeof object.fn === 'function') {
          object.fn(...args);
        }

        if (object.once === true) {
          this.events[eventName] = this.events[eventName].filter(
            (elem) => elem !== object,
          );
        }
      }
    }
  }
  prependListener(eventName, listener) {
    if (typeof listener !== 'function') {
    } else {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }

      this.events[eventName].unshift({ fn: listener, once: false });
    }
  }
  prependOnceListener(eventName, listener) {
    if (typeof listener !== 'function') {
    } else {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }

      this.events[eventName].unshift({ fn: listener, once: true });
    }
  }
  removeAllListeners(eventName) {
    if (eventName !== undefined) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }
  }
  listenerCount(eventName) {
    if (!this.events[eventName]) {
      return 0;
    } else {
      return this.events[eventName].filter(
        (object) => typeof object.fn === 'function',
      ).length;
    }
  }
}

module.exports = MyEventEmitter;
