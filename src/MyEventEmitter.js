'use strict';

class MyEventEmitter {
  #events = {};

  on(eventName, listener) {
    if (!this.#events[eventName]) {
      this.#events[eventName] = [];
    }

    this.#events[eventName].push(listener);

    return this;
  }

  once(eventName, listener) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener(...args);
    };

    return this.on(eventName, wrapper);
  }

  off(eventName, listener) {
    const listeners = this.#events[eventName];

    if (!listeners) {
      return this;
    }

    const index = listeners.indexOf(listener);

    if (index !== -1) {
      listeners.splice(index, 1);
    }

    return this;
  }

  emit(eventName, ...args) {
    const listeners = this.#events[eventName];

    if (!listeners) {
      return false;
    }

    [...listeners].forEach((listener) => listener(...args));

    return true;
  }

  prependListener(eventName, listener) {
    if (!this.#events[eventName]) {
      this.#events[eventName] = [];
    }

    this.#events[eventName].unshift(listener);

    return this;
  }

  prependOnceListener(eventName, listener) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener(...args);
    };

    return this.prependListener(eventName, wrapper);
  }

  removeAllListeners(eventName) {
    if (eventName === undefined) {
      this.#events = {};
    } else {
      delete this.#events[eventName];
    }

    return this;
  }

  listenerCount(eventName) {
    return this.#events[eventName]?.length ?? 0;
  }
}

module.exports = MyEventEmitter;
