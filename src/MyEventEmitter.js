'use strict';

class MyEventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    const arr = this.events.get(event) || [];

    arr.push(listener);
    this.events.set(event, arr);

    return this;
  }

  once(event, listener) {
    const onceWrapper = (...args) => {
      this.off(event, onceWrapper);
      listener(...args);
    };

    return this.on(event, onceWrapper);
  }

  off(event, listener) {
    const arr = this.events.get(event);

    if (!arr?.length) {
      return;
    }

    const arrWithoutListener = arr.filter((el) => el !== listener);

    this.events.set(event, arrWithoutListener);

    return this;
  }

  emit(event, ...args) {
    const listeners = this.events.get(event);

    if (!listeners?.length) {
      return false;
    }

    listeners.forEach((fn) => {
      fn(...args);
    });

    return true;
  }

  prependListener(event, listener) {
    const arr = this.events.get(event) || [];

    this.events.set(event, [listener, ...arr]);

    return this;
  }

  prependOnceListener(event, listener) {
    const onceWrapper = (...args) => {
      this.off(event, onceWrapper);
      listener(...args);
    };

    return this.prependListener(event, onceWrapper);
  }

  removeAllListeners(event) {
    if (event) {
      this.events.delete(event);

      return;
    }

    this.events.clear();

    return this;
  }

  listenerCount(event) {
    const listeners = this.events.get(event);

    return listeners?.length || 0;
  }
}

module.exports = MyEventEmitter;
