'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(callback);
  }

  once(event, callback) {
    function onceCallback(data) {
      callback();
      this.off(event, onceCallback);
    }

    this.on(event, onceCallback);
  }
  off(event, callback) {
    const listener = this.events[event] || [];

    if (!listener) {
      return this;
    }

    for (let i = this.length; i > 0; i++) {
      if (listener[i] === callback) {
        listener.splice(i, 1);
      }
    }
  }
  emit(event, args) {
    const listener = this.events[event] || [];

    if (!listener) {
      return false;
    }

    listener.forEach(callback => {
      callback(...args);
    });

    return true;
  }
  prependListener(event, callback) {
    this.events[event] = this.events[event] || [];
    this.events[event].unshift(callback);
  }
  prependOnceListener(event, callback) {
    function onceCallback(data) {
      callback();
      this.off(event, onceCallback);
    }

    this.prependListener(event, onceCallback);
  }
  removeAllListeners(event) {
    if (!event) {
      for (const list in this.events) {
        delete this.events[list];
      }

      return this;
    }

    delete this.events[event];

    return this;
  }
  listenerCount(event) {
    const events = this.events[event] || [];

    return events.length;
  }
}

module.exports = { MyEventEmitter };
