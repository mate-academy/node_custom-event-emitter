'use strict';

class MyEventEmitter {
  constructor() {
    this.events = Object.create(null);
  }

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(listener);

    return this;
  }
  once(eventName, listener) {
    return this.on(eventName, this.createOnceWrapper(eventName, listener));
  }
  off(eventName, listener) {
    const listeners = this.events[eventName];

    if (!listeners) {
      return this;
    }

    const index = listeners.findIndex(
      (l) => l === listener || l.listener === listener,
    );

    if (index !== -1) {
      listeners.splice(index, 1);
    }

    return this;
  }
  emit(eventName, ...args) {
    const listeners = this.events[eventName];

    if (!listeners) {
      return false;
    }

    for (const listener of [...listeners]) {
      listener.apply(this, args);
    }

    return true;
  }
  prependListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(listener);

    return this;
  }
  prependOnceListener(eventName, listener) {
    return this.prependListener(
      eventName,
      this.createOnceWrapper(eventName, listener),
    );
  }
  removeAllListeners(eventName) {
    if (eventName === undefined) {
      this.events = Object.create(null);
    } else {
      delete this.events[eventName];
    }

    return this;
  }
  listenerCount(eventName) {
    return this.events[eventName]?.length ?? 0;
  }

  createOnceWrapper(eventName, listener) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener.apply(this, args);
    };

    wrapper.listener = listener;

    return wrapper;
  }
}

module.exports = MyEventEmitter;
