'use strict';

class MyeventsEmitter {
  constructor() {
    this.events = new Map();
  }

  on(events, listener) {
    const listeners = this.events.get(events) || [];

    listeners.push(listener);
    this.events.set(events, listeners);
  }
  once(events, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(events, wrapper);
    };

    this.on(events, wrapper);
  }
  off(events, listener) {
    const listeners = this.events.get(events);

    const index = listeners.indexOf(listener);

    listeners.splice(index, 1);

    if (listeners.length === 0) {
      this.events.delete(events);
    } else {
      this.events.set(events, listeners);
    }
  }
  emit(events, ...args) {
    const listeners = [...this.events.get(events)];

    listeners.forEach((listener) => {
      listener(...args);
    });
  }
  prependListener(events, listener) {
    const listeners = [listener, ...(this.events.get(events) || [])];

    this.events.set(events, listeners);
  }
  prependOnceListener(events, listener) {
    const self = this;

    function wrapper(...args) {
      listener(...args);

      self.off(events, wrapper);
    }

    this.prependListener(events, wrapper);
  }
  removeAllListeners(events) {
    if (!events) {
      this.events.clear();
    } else {
      this.events.delete(events);
    }
  }
  listenerCount(events) {
    const listeners = this.events.get(events) || [];

    return listeners.length;
  }
}

module.exports = MyeventsEmitter;
