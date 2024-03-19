/* eslint-disable no-console */
'use strict';

class MyEventEmitter {
  listeners = {};

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  once(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    const onceCallback = (...args) => {
      callback(...args);
      this.off(event, onceCallback);
    };

    this.listeners[event].push(onceCallback);
  }

  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(
        (item) => item !== callback,
      );
    }
  }

  emit(event, ...args) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach((callback) => {
      callback(...args);
    });
  }

  prependListener(event, callback) {
    this.listeners[event].unshift(callback);
  }

  prependOnceListener(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    const onceCallback = (...args) => {
      callback(...args);

      this.off(event, onceCallback);
    };

    this.listeners[event].unshift(onceCallback);
  }

  removeAllListeners(event) {
    if (!event) {
      this.listeners = {};

      return;
    }

    delete this.listeners[event];
  }

  listenerCount(event) {
    if (!this.listeners[event]) {
      return 0;
    }

    return this.listeners[event].length;
  }
}

const emitter = new MyEventEmitter();

emitter.on('add', () => {});
emitter.on('add', () => {});

console.log(emitter.listeners);
module.exports = MyEventEmitter;
