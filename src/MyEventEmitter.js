'use strict';

module.exports = class MyEventEmitter {
  constructor() {
    this.allListeners = {};
  }

  listeners(type) {
    return this.allListeners[type] || [];
  }

  makeListener(once, action) {
    return {
      once,
      action,
    };
  }

  on(type, action) {
    this.allListeners[type] = [
      ...this.listeners(type),
      this.makeListener(false, action),
    ];

    return this;
  }

  once(type, action) {
    this.allListeners[type] = [
      ...this.listeners(type),
      this.makeListener(true, action),
    ];

    return this;
  }

  off(type, action) {
    const listeners = this.listeners(type);

    const listenerToRemove = listeners
      .find(l => l.action.toString() === action.toString());

    this.allListeners[type] = listeners
      .filter(l => l !== listenerToRemove);

    return this;
  }

  emit(type, ...args) {
    const listeners = this.listeners(type);

    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];

      if (listener.once) {
        this.off(type, listener.action);
      }
      listener.action(args);
    }

    return this;
  }

  prependListener(type, action) {
    this.allListeners[type] = [
      this.makeListener(false, action),
      ...this.listeners(type),
    ];

    return this;
  }

  prependOnceListener(type, action) {
    this.allListeners[type] = [
      this.makeListener(true, action),
      ...this.listeners(type),
    ];

    return this;
  }

  removeAllListeners(type) {
    this.allListeners[type] = [];

    return this;
  }

  listenerCount(type) {
    return this.listeners(type).length;
  }
};
