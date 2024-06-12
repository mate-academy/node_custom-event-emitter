'use strict';

class MyEvent {
  constructor(name) {
    this.name = name;
    this.listeners = [];
    this.onceListeners = new Set();
  }

  addEventListener(listener) {
    this.listeners.push(listener);
  }

  addOnceListener(listener) {
    this.addEventListener(listener);
    this.onceListeners.add(listener);
  }

  prependListener(listener) {
    this.listeners.unshift(listener);
  }

  prependOnceListener(listener) {
    this.prependListener(listener);
    this.onceListeners.add(listener);
  }

  removeListener(listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
    this.onceListeners.delete(listener);
  }

  fire(...args) {
    this.listeners.forEach((l) => l(...args));
    this.listeners = this.listeners.filter((l) => !this.onceListeners.has(l));
    this.onceListeners.clear();
  }

  listenerCount() {
    return this.listeners.length;
  }
}

class MyEventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(eventName, listener) {
    const event = this.getOrCreateEvent(eventName);

    event.addEventListener(listener);

    return this;
  }

  once(eventName, listener) {
    const event = this.getOrCreateEvent(eventName);

    event.addOnceListener(listener);

    return this;
  }
  off(eventName, listener) {
    const event = this.getEvent(eventName);

    if (!event) {
      return this;
    }

    event.removeListener(listener);

    return this;
  }

  emit(eventName, ...args) {
    const event = this.getEvent(eventName);

    if (!event) {
      return this;
    }

    event.fire(...args);

    return this;
  }

  prependListener(eventName, listener) {
    const event = this.getOrCreateEvent(eventName);

    event.prependListener(listener);

    return this;
  }

  prependOnceListener(eventName, listener) {
    const event = this.getOrCreateEvent(eventName);

    event.prependOnceListener(listener);

    return this;
  }

  removeAllListeners(eventName) {
    if (!eventName) {
      this.events.clear();

      return this;
    }

    this.events.delete(eventName);
  }

  listenerCount(eventName) {
    const event = this.getEvent(eventName);

    if (!event) {
      return 0;
    }

    return event.listenerCount();
  }

  getEvent(eventName) {
    return this.events.get(eventName);
  }

  getOrCreateEvent(eventName) {
    let event = this.events.get(eventName);

    if (!event) {
      event = new MyEvent(eventName);
      this.events.set(eventName, event);
    }

    return event;
  }
}

module.exports = MyEventEmitter;
