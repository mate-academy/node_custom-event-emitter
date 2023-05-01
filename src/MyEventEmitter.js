'use strict';

class MyEventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(eventName, listener) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName).push(listener);
  }

  once(eventName, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(eventName, wrapper);
    };

    this.on(eventName, wrapper);
  }

  off(eventName, listener) {
    if (this.events.has(eventName)) {
      const listeners = this.events.get(eventName);

      if (listener.name) {
        this.events
          .set(eventName, listeners
            .filter(func => func.name !== listener.name));
      } else {
        this.events.set(eventName, listeners.shift());
      }
    }
  }

  emit(eventName, ...args) {
    if (this.events.has(eventName)) {
      const listners = this.events.get(eventName);

      listners.forEach((listener) => listener(...args));
    }
  }

  prependListener(eventName, listener) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName).unshift(listener);
  }

  prependOnceListener(eventName, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(eventName, wrapper);
    };

    this.prependListener(eventName, wrapper);
  }

  removeAllListeners(eventName) {
    if (this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
  }

  listenerCount(eventName) {
    if (this.events.has(eventName)) {
     return this.events.get(eventName).length;
    } else {
     return 0;
    }
  }
}

module.exports = { MyEventEmitter };
