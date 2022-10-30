'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [callback];
    } else {
      this.events[eventName].push(callback);
    }
  }

  once(eventName, callback) {
    this.listeners[eventName] = this.listeners[eventName] || [];

    const onceWrapper = () => {
      callback();
      this.off(eventName, onceWrapper);
    };

    this.listeners[eventName].push(onceWrapper);
  }

  off(eventName, callback) {
    this.events[eventName] = this.events[eventName] || [];

    for (let i = 0; i < this.events[eventName].length; i++) {
      if (this.events[eventName] === callback) {
        this.events[eventName].splice(i, 1);

        return;
      }
    }
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName].forEach(callback => {
      callback(...args);
    });
  }

  prependListener(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [callback];
    } else {
      this.events[eventName].unshift(callback);
    }
  }

  prependOnceListener(eventName, callback) {
    this.listeners[eventName] = this.listeners[eventName] || [];

    const onceWrapper = () => {
      callback();
      this.off(eventName, onceWrapper);
    };

    this.listeners[eventName].unshift(onceWrapper);
  }

  removeAllListeners(eventName) {
    this.events[eventName] = [];
  }

  listenerCount(eventName) {
    return this.events[eventName].length || 0;
  }

  // Additional methods:
  eventNames() {
    return Object.keys(this.events);
  }

  listeners(eventName) {
    return this.events[eventName] || [];
  }

  addListener(eventName, callback) {
    this.on(eventName, callback);
  }

  removeListener(eventName, callback) {
    this.off(eventName, callback);
  }
}

// Test it with with this one ;)
const emitter = new MyEventEmitter();

emitter.eventNames();
