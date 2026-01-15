'use strict';

class MyEventEmitter {
  #listeners = {};

  on(event, cb) {
    if (!this.#listeners[event]) {
      this.#listeners[event] = [];
    }

    this.#listeners[event].push({ cb });

    return this;
  }
  once(event, cb) {
    if (!this.#listeners[event]) {
      this.#listeners[event] = [];
    }

    this.#listeners[event].push({ cb, once: true });

    return this;
  }
  off(event, cb) {
    if (!this.#listeners[event]) {
      return this;
    }

    const index = this.#listeners[event].findIndex(
      (listener) => listener.cb === cb,
    );

    if (index !== -1) {
      this.#listeners[event].splice(index, 1);
    }

    return this;
  }
  emit(event, ...args) {
    if (!this.#listeners[event]) {
      return false;
    }

    const listeners = [...this.#listeners[event]];

    for (const listener of listeners) {
      listener.cb(...args);

      if (listener.once) {
        this.off(event, listener.cb);
      }
    }

    return true;
  }
  prependListener(event, cb) {
    if (!this.#listeners[event]) {
      this.#listeners[event] = [];
    }

    this.#listeners[event].unshift({ cb });

    return this;
  }
  prependOnceListener(event, cb) {
    if (!this.#listeners[event]) {
      this.#listeners[event] = [];
    }

    this.#listeners[event].unshift({ cb, once: true });

    return this;
  }
  removeAllListeners(event) {
    if (!event) {
      this.#listeners = {};

      return this;
    }

    this.#listeners[event] = [];

    return this;
  }
  listenerCount(event) {
    if (!event) {
      return 0;
    }

    return this.#listeners[event]?.length || 0;
  }
}

module.exports = MyEventEmitter;
