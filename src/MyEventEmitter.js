'use strict';

class MyEventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(eventName, listener) {
    this.#getListeners(eventName).push(listener);

    return this;
  }

  once(eventName, listener) {
    const wrappedListener = (...args) => {
      this.off(eventName, wrappedListener);
      listener(...args);
    };

    wrappedListener.originalListener = listener;

    return this.on(eventName, wrappedListener);
  }

  off(eventName, listener) {
    const listeners = this.events.get(eventName);

    if (!listeners || listeners.length === 0) {
      return this;
    }

    const nextListeners = listeners.filter(
      (currentListener) =>
        currentListener !== listener &&
        currentListener.originalListener !== listener,
    );

    if (nextListeners.length === 0) {
      this.events.delete(eventName);
    } else {
      this.events.set(eventName, nextListeners);
    }

    return this;
  }

  emit(eventName, ...args) {
    const listeners = this.events.get(eventName);

    if (!listeners || listeners.length === 0) {
      return false;
    }

    [...listeners].forEach((listener) => listener(...args));

    return true;
  }

  prependListener(eventName, listener) {
    this.#getListeners(eventName).unshift(listener);

    return this;
  }

  prependOnceListener(eventName, listener) {
    const wrappedListener = (...args) => {
      this.off(eventName, wrappedListener);
      listener(...args);
    };

    wrappedListener.originalListener = listener;

    return this.prependListener(eventName, wrappedListener);
  }

  removeAllListeners(eventName) {
    if (eventName === undefined) {
      this.events.clear();

      return this;
    }

    this.events.delete(eventName);

    return this;
  }

  listenerCount(eventName) {
    return this.events.get(eventName)?.length || 0;
  }

  #getListeners(eventName) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }

    return this.events.get(eventName);
  }
}

module.exports = MyEventEmitter;
