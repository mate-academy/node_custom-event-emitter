'use strict';

class MyEventEmitter {
  events = {};

  #getEvent(eventName) {
    if (!this.events[eventName]) {
      this.events[eventName] = {};
    }

    if (!this.events[eventName].listeners) {
      this.events[eventName].listeners = [];
    }

    return this.events[eventName];
  }
  #getListeners(eventName) {
    return this.#getEvent(eventName).listeners;
  }

  on(eventName, callback) {
    this.#getListeners(eventName).push({ callback });
  }
  once(eventName, callback) {
    this.#getListeners(eventName).push({
      eventName,
      callback,
      once: true,
    });
  }
  off(eventName, callback) {
    this.#getEvent(eventName).listeners = this.#getListeners(eventName).filter(
      (listener) => listener.callback !== callback,
    );
  }
  emit(eventName, ...args) {
    this.#getListeners(eventName).forEach((listener) => {
      listener.callback(...args);

      if (listener.once) {
        this.off(eventName, listener.callback);
      }
    });
  }
  prependListener(eventName, callback) {
    this.#getListeners(eventName).unshift({ callback });
  }
  prependOnceListener(eventName, callback) {
    this.#getListeners(eventName).unshift({
      eventName,
      callback,
      once: true,
    });
  }
  removeAllListeners(eventName) {
    this.#getEvent(eventName).listeners = [];
  }
  listenerCount(eventName) {
    return this.#getListeners(eventName).length;
  }
}

module.exports = MyEventEmitter;
