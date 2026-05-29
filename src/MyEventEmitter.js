/* eslint-disable no-param-reassign */
'use strict';

class MyEventEmitter {
  #events = {};
  on(event, listener) {
    if (!this.#events[event]) {
      this.#events[event] = [];
    }

    this.#events[event].push(listener);
  }
  off(event, listener) {
    const listeners = this.#events[event];

    if (!listeners) {
      return;
    }

    this.#events[event] = listeners.filter((cb) => cb !== listener);
  }
  once(event, listener) {
    if (!this.#events[event]) {
      this.#events[event] = [];
    }

    const wrapper = (...args) => {
      listener(...args);

      this.off(event, wrapper);
    };

    this.on(event, wrapper);
  }
  emit(key, ...args) {
    if (!this.#events[key]) {
      return;
    }

    for (const listener of this.#events[key]) {
      listener(...args);
    }
  }
  prependListener(event, listener) {
    if (!this.#events[event]) {
      this.#events[event] = [];
    }

    this.#events[event].unshift(listener);
  }
  prependOnceListener(event, listener) {
    if (!this.#events[event]) {
      this.#events[event] = [];
    }

    const wrapper = (...args) => {
      listener(...args);

      this.off(event, wrapper);
    };

    this.prependListener(event, wrapper);
  }
  removeAllListeners(event) {
    if (event) {
      this.#events[event] = [];
    } else {
      this.#events = {};
    }
  }
  listenerCount(event) {
    return this.#events[event]?.length ?? 0;
  }
}

module.exports = MyEventEmitter;
