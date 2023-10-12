'use strict';

class MyEventEmitter {
  constructor() {
    this.prependListeners = {};
    this.commonListeners = {};
  }

  on(event, callback) {
    if (!this.commonListeners[event]) {
      this.commonListeners[event] = [];
    }

    const listenerData = {
      callback,
      isOnce: false,
    };

    this.commonListeners[event].push(listenerData);
  }

  once(event, callback) {
    if (!this.commonListeners[event]) {
      this.commonListeners[event] = [];
    }

    const listenerData = {
      callback,
      isOnce: true,
    };

    this.commonListeners[event].push(listenerData);
  }

  off(action, callback) {
    if (this.prependListeners[action]) {
      this.prependListeners[action] = this.prependListeners[action]
        .filter((listener) => listener.callback !== callback);
    }

    if (this.commonListeners[action]) {
      this.commonListeners[action] = this.commonListeners[action]
        .filter((listener) => listener.callback !== callback);
    }
  }

  emit(event, ...args) {
    if (this.prependListeners[event]) {
      this.prependListeners[event].forEach((listener, index) => {
        listener.callback(...args);

        if (listener.isOnce) {
          this.prependListeners[event].splice(index, 1);
        }
      });
    }

    if (this.commonListeners[event]) {
      this.commonListeners[event].forEach((listener, index) => {
        listener.callback(...args);

        if (listener.isOnce) {
          this.commonListeners[event].splice(index, 1);
        }
      });
    }
  }

  prependListener(event, callback) {
    if (!this.prependListeners[event]) {
      this.prependListeners[event] = [];
    }

    const listenerData = {
      callback,
      isOnce: false,
    };

    this.prependListeners[event].push(listenerData);
  }
  prependOnceListener(event, callback) {
    if (!this.prependListeners[event]) {
      this.prependListeners[event] = [];
    }

    const listenerData = {
      callback,
      isOnce: true,
    };

    this.prependListeners[event].push(listenerData);
  }

  removeAllListeners(event) {
    if (event) {
      delete this.prependListeners[event];
      delete this.commonListeners[event];
    } else {
      this.prependListeners = {};
      this.commonListeners = {};
    }
  }

  listenerCount(event) {
    const prependListenersNumber = this.prependListeners[event]
      ? this.prependListeners[event].length
      : 0;
    const commonListenersNumber = this.commonListeners[event]
      ? this.commonListeners[event].length
      : 0;
    const sum = prependListenersNumber + commonListenersNumber;

    return sum;
  }
}

module.exports = {
  MyEventEmitter,
};
