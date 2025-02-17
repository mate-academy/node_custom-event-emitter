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
      this.off(event, onceWrapper);
      listener(...args);
    };

    this.on(event, onceWrapper);
  }

  off(event, listener) {
    if (!this.events.has(event)) {
      return;
    }

    this.events.set(
      event,
      this.events.get(event).filter((l) => l !== listener),
    );
  }

  emit(event, ...args) {
    if (!this.events.has(event)) {
      return;
    }

    for (const listener of this.events.get(event)) {
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
      this.off(event, onceWrapper);
      listener(...args);
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
    return this.events.has(event) ? this.events.get(event).length : 0;
  }
}

module.exports = MyEventEmitter;
