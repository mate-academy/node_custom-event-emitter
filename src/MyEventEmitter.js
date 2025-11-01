'use strict';

class MyEventEmitter {
  events = {};

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(listener);

    return this;
  }

  once(eventName, listener) {
    const wrappedCallback = this.wrapListenerOnce(eventName, listener);

    this.on(eventName, wrappedCallback);

    return this;
  }

  off(eventName, listener) {
    if (!this.events[eventName]) {
      return this;
    }

    this.events[eventName] = this.events[eventName].filter(
      (l) => l !== listener,
    );

    return this;
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return false;
    }

    const listeners = [...this.events[eventName]];

    listeners.forEach((callback) => {
      callback(...args);
    });

    return true;
  }

  prependListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(listener);

    return this;
  }

  prependOnceListener(eventName, listener) {
    const wrappedListener = this.wrapListenerOnce(eventName, listener);

    return this.prependListener(eventName, wrappedListener);
  }

  removeAllListeners(eventName) {
    if (this.events[eventName]) {
      this.events[eventName] = [];
    }

    return this;
  }

  listenerCount(eventName) {
    if (!this.events[eventName]) {
      return 0;
    }

    return this.events[eventName].length;
  }

  wrapListenerOnce(eventName, listener) {
    if (!listener || !eventName) {
      return;
    }

    const wrappedListener = (...args) => {
      listener(...args);
      this.off(eventName, wrappedListener);
    };

    return wrappedListener;
  }
}

module.exports = MyEventEmitter;
