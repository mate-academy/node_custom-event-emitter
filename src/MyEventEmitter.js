'use strict';

class MyEventEmitter {
  #listeners;

  constructor() {
    this.#listeners = {};
  }

  on(event, callback) {
    if (!this.#listeners[event]) {
      this.#listeners[event] = [];
    }
    this.#listeners[event].push({ callback, once: false });
  }
  once(event, callback) {
    if (!this.#listeners[event]) {
      this.#listeners[event] = [];
    }
    this.#listeners[event].push({ callback, once: true });
  }
  off(event, callback) {
    if (!this.#listeners[event]) {
      return;
    }

    this.#listeners[event] = this.#listeners[event].filter(
      (elem) => elem.callback !== callback,
    );
  }
  emit(event, ...args) {
    if (!this.#listeners[event]) {
      return;
    }

    for (const callbackObj of this.#listeners[event]) {
      callbackObj.callback(...args);
    }

    this.#listeners[event] = this.#listeners[event].filter((el) => !el.once);
  }
  prependListener(event, callback) {
    if (!this.#listeners[event]) {
      this.#listeners[event] = [{ callback, once: false }];

      return;
    }

    this.#listeners[event] = [
      { callback, once: false },
      ...this.#listeners[event],
    ];
  }
  prependOnceListener(event, callback) {
    if (!this.#listeners[event]) {
      this.#listeners[event] = [{ callback, once: true }];

      return;
    }

    this.#listeners[event] = [
      { callback, once: true },
      ...this.#listeners[event],
    ];
  }
  removeAllListeners(event) {
    if (!event) {
      this.#listeners = {};

      return;
    }

    if (!this.#listeners[event]) {
      return;
    }

    this.#listeners[event] = [];
  }
  listenerCount(event) {
    if (!this.#listeners[event]) {
      return 0;
    }

    return this.#listeners[event].length;
  }
}

module.exports = MyEventEmitter;
