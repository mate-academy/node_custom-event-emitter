'use strict';

class MyEventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }

  once(event, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(event, onceWrapper);
    };

    this.on(event, onceWrapper);
  }

  off(event, listener) {
    if (!this.events.has(event)) {
      return;
    }

    const listeners = this.events.get(event);
    const index = listeners.indexOf(listener);

    if (index !== -1) {
      listeners.splice(index, 1);
    }
  }

  emit(event, ...args) {
    if (!this.events.has(event)) {
      return;
    }

    const listeners = this.events.get(event).slice();

    for (const listener of listeners) {
      listener(...args);
    }
  }

  prependListener(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).unshift(listener);
  }

  prependOnceListener(event, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(event, onceWrapper);
    };

    this.prependListener(event, onceWrapper);
  }

  removeAllListeners(event) {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
  }

  listenerCount(event) {
    if (!this.events.has(event)) {
      return 0;
    }

    return this.events.get(event).length;
  }
}

module.exports = { MyEventEmitter };
