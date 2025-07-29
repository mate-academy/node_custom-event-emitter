'use strict';

class MyEventEmitter {
  events = {};

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(listener);
  }
  once(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    const onceListener = (...args) => {
      listener(...args);
      this.off(eventName, onceListener);
    };

    this.events[eventName].push(onceListener);
  }
  off(eventName, listener) {
    if (!this.events[eventName]) {
      return;
    }

    const newEvents = [];

    for (const eventListener of this.events[eventName]) {
      if (eventListener !== listener) {
        newEvents.push(eventListener);
      }
    }

    this.events[eventName] = newEvents;
  }
  emit(eventName, ...args) {
    const listeners = this.events[eventName];

    if (listeners) {
      listeners.forEach((listener) => listener(...args));
    }
  }
  prependListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    const newListeners = [listener];

    for (const eventListener of this.events[eventName]) {
      if (eventListener !== listener) {
        newListeners.push(eventListener);
      }
    }

    this.events[eventName] = newListeners;
  }
  prependOnceListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    const onceListener = (...args) => {
      listener(...args);
      this.off(eventName, onceListener);
    };

    const newListeners = [onceListener];

    for (const eventListener of this.events[eventName]) {
      if (eventListener !== listener) {
        newListeners.push(eventListener);
      }
    }

    this.events[eventName] = newListeners;
  }
  removeAllListeners(eventName = '') {
    if (!eventName) {
      this.events.length = 0;

      return;
    }
    this.events[eventName].length = 0;
  }
  listenerCount(eventName) {
    if (!this.events[eventName]) {
      return 0;
    }

    return this.events[eventName].length;
  }
}

module.exports = MyEventEmitter;
