'use strict';

class MyEventEmitter {
  events = new Map();

  on(eventName, listener, prepend) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }

    if (prepend) {
      this.events.get(eventName).unshift(listener);

      return;
    }

    this.events.get(eventName).push(listener);
  }

  once(eventName, listener, prepend = false) {
    const onceWrapper = (...args) => {
      this.off(eventName, onceWrapper);
      listener(...args);
    };

    this.on(eventName, onceWrapper, prepend);
  }

  off(eventName, listener) {
    const listeners = this.events.get(eventName);

    if (!listeners) {
      return;
    }

    this.events.set(
      eventName,
      listeners.filter((el) => el !== listener),
    );
  }

  emit(eventName, ...args) {
    const listeners = this.events.get(eventName);

    if (!listeners) {
      return;
    }

    for (const listener of [...listeners]) {
      listener(...args);
    }
  }

  prependListener(eventName, listener) {
    this.on(eventName, listener, true);
  }

  prependOnceListener(eventName, listener) {
    this.once(eventName, listener, true);
  }

  removeAllListeners(eventName) {
    if (!eventName) {
      this.events.clear();

      return;
    }

    this.events.delete(eventName);
  }

  listenerCount(eventName) {
    const listeners = this.events.get(eventName);

    if (!listeners) {
      return 0;
    }

    return listeners.length;
  }
}

module.exports = MyEventEmitter;
