'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  validateEventName(eventName) {
    if (typeof eventName !== 'string' || eventName.trim().length === 0) {
      throw new Error('Invalid event name');
    }
  }

  validateListener(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Invalid listener function');
    }
  }

  on(eventName, listener) {
    this.validateEventName(eventName);
    this.validateListener(listener);

    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }

    this.listeners.get(eventName).push(listener);
  }

  once(eventName, listener) {
    this.validateEventName(eventName);
    this.validateListener(listener);

    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener(...args);
    };

    this.on(eventName, wrapper);
  }

  off(eventName, listener) {
    this.validateEventName(eventName);

    if (!this.listeners.has(eventName)) {
      return;
    }

    if (listener) {
      const listeners = this.listeners.get(eventName);
      const index = listeners.indexOf(listener);

      if (index !== -1) {
        listeners.splice(index, 1);
      }

      if (listeners.length === 0) {
        this.listeners.delete(eventName);
      }
    } else {
      this.listeners.delete(eventName);
    }
  }

  emit(eventName, ...args) {
    this.validateEventName(eventName);

    if (!this.listeners.has(eventName)) {
      return;
    }

    const listeners = this.listeners.get(eventName).slice();

    listeners.forEach((listener) => {
      listener(...args);
    });
  }

  prependListener(eventName, listener) {
    this.validateEventName(eventName);
    this.validateListener(listener);

    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }

    this.listeners.get(eventName).unshift(listener);
  }

  prependOnceListener(eventName, listener) {
    this.validateEventName(eventName);
    this.validateListener(listener);

    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener(...args);
    };

    this.prependListener(eventName, wrapper);
  }

  removeAllListeners(eventName) {
    if (!eventName) {
      this.listeners.clear();
    } else {
      this.validateEventName(eventName);
      this.listeners.delete(eventName);
    }
  }

  listenerCount(eventName) {
    this.validateEventName(eventName);

    return this.listeners.has(eventName)
      ? this.listeners.get(eventName).length : 0;
  }
}

module.exports = MyEventEmitter;
