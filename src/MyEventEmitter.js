'use strict';

class MyEventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, { listeners: [] });
    }
    this.events.get(event).listeners.push(listener);
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

    const eventObj = this.events.get(event);

    eventObj.listeners = eventObj.listeners.filter((l) => l !== listener);

    if (eventObj.listeners.length === 0) {
      this.events.delete(event);
    }
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).listeners.forEach((listener) => listener(...args));
    }
  }

  prependListener(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, { listeners: [] });
    }
    this.events.get(event).listeners.unshift(listener);
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
    return this.events.has(event) ? this.events.get(event).listeners.length : 0;
  }
}

module.exports = MyEventEmitter;
