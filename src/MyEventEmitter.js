'use strict';

class MyEventEmitter {
  constructor() {
    this.events = new Map();
  }

  getListeners(event) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }

    return this.events.get(event);
  }

  on(event, listener) {
    const listeners = this.getListeners(event);

    listeners.push(listener);
  }

  emit(event, ...args) {
    const listeners = this.events.get(event);

    if (!listeners) {
      return false;
    }

    listeners.forEach((fn) => fn(...args));

    return true;
  }

  off(event, listener) {
    const listeners = this.events.get(event);

    if (!listeners) {
      return;
    }

    const filtered = listeners.filter((fn) => fn !== listener);

    if (filtered.length) {
      this.events.set(event, filtered);
    } else {
      this.events.delete(event);
    }
  }

  listenerCount(event) {
    const listeners = this.events.get(event);

    return listeners ? listeners.length : 0;
  }

  prependListener(event, listener) {
    const listeners = this.getListeners(event);

    listeners.unshift(listener);
  }

  once(event, listener) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      listener(...args);
    };

    this.on(event, wrapper);
  }

  prependOnceListener(event, listener) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      listener(...args);
    };

    const listeners = this.getListeners(event);

    listeners.unshift(wrapper);
  }

  removeAllListeners(event) {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
  }
}

module.exports = MyEventEmitter;
