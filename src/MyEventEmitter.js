'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = [];
  }

  on(eventName, listener) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].push(listener);
    } else {
      this.listeners[eventName] = [listener];
    }

    return this;
  }

  once(eventName, listener) {
    const onceListener = (...args) => {
      this.off(eventName, onceListener);
      listener(...args);
    };

    if (this.listeners[eventName]) {
      this.listeners[eventName].push(onceListener);
    } else {
      this.listeners[eventName] = [onceListener];
    }

    return this;
  }

  off(eventName, listener) {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName]
        .filter(l => l !== listener);
    }

    return this;
  }

  emit(eventName, ...args) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].map(listener => listener(...args));

      return true;
    }

    return false;
  }

  prependListener(eventName, listener) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].unshift(listener);
    } else {
      this.listeners[eventName] = [listener];
    }

    return this;
  }

  prependOnceListener(eventName, listener) {
    const onceListener = (...args) => {
      this.off(eventName, onceListener);
      listener(...args);
    };

    if (this.listeners[eventName]) {
      this.listeners[eventName].unshift(onceListener);
    } else {
      this.listeners[eventName] = [onceListener];
    }

    return this;
  }

  removeAllListeners(eventName) {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    return this;
  }

  listenerCount(eventName) {
    if (this.listeners[eventName]) {
      return this.listeners[eventName].length;
    } else {
      return 0;
    }
  }
}

module.exports = MyEventEmitter;
