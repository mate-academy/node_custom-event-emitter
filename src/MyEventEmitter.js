'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(listener);

    return this;
  }

  once(eventName, listener) {
    const listenerWrapper = () => {
      this.off(eventName, listenerWrapper);
      listener();
    };

    this.on(eventName, listenerWrapper);

    return this;
  }

  off(eventName, listener) {
    if (this.events[eventName]) {
      const stringifiedListener = JSON.stringify(listener);
      const listeners = this.events[eventName];

      for (let i = 0; i < listeners.length; i++) {
        if (JSON.stringify(listeners[i]) === stringifiedListener) {
          listeners.splice(i, 1);
          break;
        }
      }
    }

    return this;
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return false;
    }

    this.events[eventName].forEach(listener => listener(...args));

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
    const listenerWrapper = () => {
      this.off(eventName, listenerWrapper);
      listener();
    };

    this.prependListener(eventName, listenerWrapper);

    return this;
  }

  removeAllListeners(eventName) {
    if (eventName) {
      delete this.events[eventName];

      return this;
    }

    for (const event in this.events) {
      delete this.events[event];
    }

    return this;
  }

  listenerCount(eventName, listener) {
    if (!listener) {
      return this.events[eventName].length || 0;
    }

    const stringifiedListener = JSON.stringify(listener);

    return this.events[eventName].filter(
      tempListener => JSON.stringify(tempListener) === stringifiedListener,
    ).length;
  }
}

module.exports = {
  MyEventEmitter,
};
