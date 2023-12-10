'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = new Map();

    const onceWrapper = (eventName, listener) => {
      listener();
      this.off(eventName, onceWrapper);
    };

    this.on = (eventName, listener) => {
      const existingListeners = this.listeners.get(eventName) || [];

      existingListeners.push(listener);
      this.listeners.set(eventName, existingListeners);
    };

    this.once = (eventName, listener) => {
      this.on(eventName, onceWrapper(eventName, listener));
    };

    this.off = (eventName, listener) => {
      const existingListeners = this.listeners.get(eventName);

      if (existingListeners) {
        const index = existingListeners.indexOf(listener);

        if (index !== -1) {
          existingListeners.splice(index, 1);
        }
      }
    };

    this.emit = (eventName, ...args) => {
      const existingListeners = this.listeners.get(eventName);

      if (existingListeners) {
        existingListeners.forEach(listener => {
          listener(...args);
        });
      }
    };

    this.prependListener = (eventName, listener) => {
      this.listeners.set(eventName,
        [listener, ...this.listeners.get(eventName) || []]);
    };

    this.prependOnceListener = (eventName, listener) => {
      this.prependListener(eventName, onceWrapper(eventName, listener));
    };

    this.removeAllListeners = (...eventName) => {
      if (!eventName) {
        this.listeners.clear();
      } else {
        delete this.listeners.get(eventName);
      }
    };

    this.listenerCount = (eventName) => {
      return this.listeners.get(eventName).length;
    };
  }
}

module.exports = { MyEventEmitter };
