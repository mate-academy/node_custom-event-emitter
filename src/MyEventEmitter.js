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

  once(eventName, action) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    const onceCallback = (...args) => {
      action(args);
      this.off(eventName, onceCallback);
    };

    this.events[eventName].push(onceCallback);

    return this;
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
    for (const eventAction of this.events[event]) {
      eventAction(...args);
    }

    return this;
  };

  prependListener(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).unshift(listener);
  }

  prependOnceListener(eventName, action) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    const onceCallback = (...args) => {
      action(args);
      this.off(eventName, onceCallback);
    };

    this.events[eventName].unshift(onceCallback);

    return this;
  }

  removeAllListeners(event) {
    if (!this.events.has(event)) {
      this.events.clear();
    } else {
      this.events.delete(event);
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
