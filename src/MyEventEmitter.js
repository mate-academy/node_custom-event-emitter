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
  }
  once(eventName, listener) {
    const onceWrapper = (...args) => {
      this.off(eventName, onceWrapper);
      listener(...args);
    };

    onceWrapper._original = listener;

    this.on(eventName, onceWrapper);
  }
  off(eventName, listener) {
    const listeners = this.events[eventName];

    if (!listeners) {
      return;
    }

    this.events[eventName] = listeners.filter(
      (fn) => fn !== listener && fn._original !== listener,
    );

    if (this.events[eventName].length === 0) {
      delete this.events[eventName];
    }
  }
  emit(eventName, ...args) {
    const listeners = this.events[eventName];

    if (!listeners || listeners.length === 0) {
      return false;
    }

    for (const listener of [...listeners]) {
      listener(...args);
    }

    return true;
  }
  prependListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(listener);
  }
  prependOnceListener(eventName, listener) {
    const onceWrapper = (...args) => {
      this.off(eventName, onceWrapper);
      listener(...args);
    };

    onceWrapper._original = listener;

    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(onceWrapper);
  }
  removeAllListeners(eventName) {
    if (eventName) {
      delete this.events[eventName]; // Видалити одну подію
    } else {
      this.events = {}; // Видалити всі події
    }
  }
  listenerCount(eventName) {
    const listeners = this.events[eventName];

    return listeners ? listeners.length : 0;
  }
}

module.exports = MyEventEmitter;
