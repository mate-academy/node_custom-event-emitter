'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(listener);

    return this;
  }

  once(event, listener) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      listener.apply(this, args);
    };

    wrapper.originalListener = listener;

    return this.on(event, wrapper);
  }

  off(event, listener) {
    if (!this.events[event]) {
      return this;
    }

    const listeners = this.events[event];

    for (let i = listeners.length - 1; i >= 0; i--) {
      const currentListener = listeners[i];

      if (
        currentListener === listener ||
        currentListener.originalListener === listener
      ) {
        listeners.splice(i, 1);
        break;
      }
    }

    if (listeners.length === 0) {
      delete this.events[event];
    }

    return this;
  }

  emit(event, ...args) {
    const listeners = this.events[event];

    if (!listeners || listeners.length === 0) {
      return false;
    }

    listeners.slice().forEach((listener) => {
      listener.apply(this, args);
    });

    return true;
  }

  prependListener(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].unshift(listener);

    return this;
  }

  prependOnceListener(event, listener) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      listener.apply(this, args);
    };

    wrapper.originalListener = listener;

    return this.prependListener(event, wrapper);
  }

  removeAllListeners(event) {
    if (event === undefined) {
      this.events = {};
    } else {
      delete this.events[event];
    }

    return this;
  }

  listenerCount(event) {
    if (!this.events[event]) {
      return 0;
    }

    return this.events[event].length;
  }
}

module.exports = MyEventEmitter;
