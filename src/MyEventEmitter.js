'use strict';

class MyEventEmitter {
  constructor() {
    this.events = new Map();
  }

  getListeners(event) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }

    return this.events.get(event);
  }

  on(event, listener) {
    this.getListeners(event).push({ listener, once: false });
  }

  once(event, listener) {
    this.getListeners(event).push({ listener, once: true });
  }

  off(event, listener) {
    if (!this.events.has(event)) {
      return;
    }

    const listeners = this.events
      .get(event)
      .filter((l) => l.listener !== listener);

    if (listeners.length) {
      this.events.set(event, listeners);
    } else {
      this.events.delete(event);
    }
  }

  emit(event, ...args) {
    if (!this.events.has(event)) {
      return false;
    }

    const listeners = this.events.get(event).slice();

    for (const entry of listeners) {
      entry.listener(...args);

      if (entry.once) {
        this.off(event, entry.listener);
      }
    }

    return true;
  }

  prependListener(event, listener) {
    this.getListeners(event).unshift({ listener, once: false });
  }

  prependOnceListener(event, listener) {
    this.getListeners(event).unshift({ listener, once: true });
  }

  removeAllListeners(event) {
    if (event !== undefined) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
  }

  listenerCount(event) {
    return this.events.has(event) ? this.events.get(event).length : 0;
  }
}

module.exports = MyEventEmitter;
