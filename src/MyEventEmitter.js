'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  on(event, fn) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event).push(fn);
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };

    this.on(event, wrapper);
  }

  off(event, fn) {
    if (!this.listeners.has(event)) {
      return;
    }

    this.listeners.set(
      event,
      this.listeners.get(event).filter((l) => l !== fn),
    );
  }

  emit(event, ...payload) {
    if (!this.listeners.has(event)) {
      return;
    }

    const listeners = this.listeners.get(event);

    listeners.forEach((fn) => fn(...payload));
  }

  prependListener(event, ...listeners) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    const current = this.listeners.get(event);

    this.listeners.set(event, [...listeners, ...current]);

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

  removeAllListeners(event) {
    if (event) {
      this.listeners.set(event, []);
    } else {
      this.listeners.clear();
    }
  }

  listenerCount(event) {
    if (!this.listeners.has(event)) {
      return 0;
    }

    return this.listeners.get(event).length;
  }
}

module.exports = MyEventEmitter;
