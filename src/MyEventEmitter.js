'use strict';

class MyEventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(eventName, listener) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }

    this.events.get(eventName).push(listener);

    return this;
  }

  once(eventName, listener) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener(...args);
    };

    wrapper.listener = listener;
    this.on(eventName, wrapper);

    return this;
  }

  off(eventName, listener) {
    const listeners = this.events.get(eventName);

    if (!listeners) {
      return this;
    }

    this.events.set(
      eventName,
      listeners.filter((eventListener) => eventListener !== listener),
    );

    return this;
  }

  emit(eventName, ...args) {
    if (!this.events.has(eventName)) {
      return false;
    }

    const listeners = [...this.events.get(eventName)];

    for (const listener of listeners) {
      listener(...args);
    }

    return true;
  }

  prependListener(eventName, listener) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }

    this.events.get(eventName).unshift(listener);

    return this;
  }

  prependOnceListener(eventName, listener) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener(...args);
    };

    wrapper.listener = listener;
    this.prependListener(eventName, wrapper);

    return this;
  }

  removeAllListeners(eventName) {
    if (eventName) {
      this.events.delete(eventName);
    } else {
      this.events.clear();
    }

    return this;
  }

  listenerCount(eventName) {
    const listeners = this.events.get(eventName);

    return listeners ? listeners.length : 0;
  }
}

module.exports = MyEventEmitter;
