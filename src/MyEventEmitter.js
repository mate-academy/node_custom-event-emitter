'use strict';

class MyEventEmitter {
  listeners = {};

  ensureEventExists(eventName) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
  }

  on(eventName, callback) {
    this.ensureEventExists(eventName);

    this.listeners[eventName].push({ callback });
  }

  once(eventName, callback) {
    this.ensureEventExists(eventName);

    this.listeners[eventName].push({ callback, once: true });
  }

  off(eventName, callback) {
    if (!this.listeners[eventName]) {
      return;
    }

    this.listeners[eventName] = this.listeners[eventName].filter(
      (listener) => listener.callback !== callback,
    );
  }

  emit(eventName, ...arg) {
    const listenersForEvent = this.listeners[eventName];

    if (!listenersForEvent) {
      return;
    }

    for (let i = 0; i < listenersForEvent.length; i++) {
      const currentListener = listenersForEvent[i];

      currentListener.callback(...arg);

      if (currentListener.once) {
        listenersForEvent.splice(i, 1);
        i--;

        if (!listenersForEvent.length) {
          delete this.listeners[eventName];
        }
      }
    }
  }

  prependListener(eventName, callback) {
    this.ensureEventExists(eventName);

    this.listeners[eventName].unshift({ callback });
  }

  prependOnceListener(eventName, callback) {
    this.ensureEventExists(eventName);

    this.listeners[eventName].unshift({ callback, once: true });
  }

  removeAllListeners(eventName) {
    delete this.listeners[eventName];
  }

  listenerCount(eventName) {
    return this.listeners[eventName]?.length || 0;
  }
}

module.exports = MyEventEmitter;
