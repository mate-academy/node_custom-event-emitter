'use strict';

const checkListenerType = (listener) => {
  if (typeof listener !== 'function') {
    throw new Error(
      // eslint-disable-next-line max-len
      `The "listener" argument must be of type "function". Received type "${typeof listener}".`
    );
  }
};

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    checkListenerType(listener);

    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);

    return this;
  }

  once(event, listener) {
    checkListenerType(listener);

    const onceWrapper = (...args) => {
      this.off(event, onceWrapper);
      listener(...args);
    };

    this.on(event, onceWrapper);

    return this;
  }

  off(event, listener) {
    checkListenerType(listener);

    if (this.events[event]) {
      this.events[event] = this.events[event].filter((l) => l !== listener);
    }

    return this;
  }

  emit(event, ...args) {
    const listeners = this.events[event] || [];

    listeners.forEach((listener) => listener(...args));

    return listeners.length > 0;
  }

  prependListener(event, listener) {
    checkListenerType(listener);

    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].unshift(listener);

    return this;
  }

  prependOnceListener(event, listener) {
    checkListenerType(listener);

    const onceWrapper = (...args) => {
      this.off(event, onceWrapper);
      listener(...args);
    };

    this.prependListener(event, onceWrapper);

    return this;
  }

  removeAllListeners(event) {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {};
    }

    return this;
  }

  listenerCount(event) {
    return this.events[event] ? this.events[event].length : 0;
  }
}

module.exports = {
  MyEventEmitter,
};
