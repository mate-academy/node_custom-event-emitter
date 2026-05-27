'use strict';

class MyEventEmitter {
  #events = {};

  on(eventName, listener) {
    if (typeof listener !== 'function') {
      return this;
    }

    (this.#events[eventName] ??= []).push(listener);

    return this;
  }

  once(eventName, listener) {
    if (typeof listener !== 'function') {
      return this;
    }

    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener(...args);
    };

    wrapper.listener = listener;

    return this.on(eventName, wrapper);
  }

  off(eventName, listener) {
    if (typeof listener !== 'function') {
      return this;
    }

    const listeners = this.#events[eventName];

    if (!listeners) {
      return this;
    }

    const index = listeners.findIndex(
      (l) => l === listener || l.listener === listener,
    );

    if (index !== -1) {
      listeners.splice(index, 1);

      if (listeners.length === 0) {
        delete this.#events[eventName];
      }
    }

    return this;
  }

  emit(eventName, ...args) {
    const listeners = this.#events[eventName];

    if (!listeners || listeners.length === 0) {
      return false;
    }

    const listenersCopy = [...listeners];

    for (const listener of listenersCopy) {
      listener(...args);
    }

    return true;
  }

  prependListener(eventName, listener) {
    if (typeof listener !== 'function') {
      return this;
    }

    (this.#events[eventName] ??= []).unshift(listener);

    return this;
  }
  prependOnceListener(eventName, listener) {
    if (typeof listener !== 'function') {
      return this;
    }

    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener(...args);
    };

    wrapper.listener = listener;

    return this.prependListener(eventName, wrapper);
  }
  removeAllListeners(eventName) {
    if (eventName) {
      delete this.#events[eventName];
    } else {
      this.#events = {};
    }

    return this;
  }

  listenerCount(eventName) {
    return this.#events[eventName]?.length ?? 0;
  }
}

module.exports = MyEventEmitter;
