'use strict';

class MyEventEmitter {
  constructor() {
    this.events = new Map();
  }

  validName(name) {
    if (typeof name !== 'string') {
      throw new Error('Event name must be a string');
    }
  }

  validFunc(func) {
    if (typeof func !== 'function') {
      throw new Error('Listener must be a function');
    }
  }

  on(event, listener) {
    this.validName(event);
    this.validFunc(listener);

    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);

    return this;
  }

  once(event, listener) {
    this.validName(event);
    this.validFunc(listener);

    const onceWrapper = (...args) => {
      this.off(event, onceWrapper);
      listener.apply(this, args);
    };

    this.on(event, onceWrapper);
  }

  off(event, listener) {
    this.validName(event);
    this.validFunc(listener);

    if (!this.events.has(event)) {
      return;
    }

    const listeners = this.events.get(event);
    const index = listeners.indexOf(listener);

    if (index !== -1) {
      listeners.splice(index, 1);
    }

    return this;
  }

  emit(event, ...args) {
    if (!this.events.has(event)) {
      return;
    }

    const listeners = this.events.get(event).slice();

    listeners.forEach((listener) => listener.apply(this, args));
  }

  prependListener(event, listener) {
    this.validName(event);
    this.validFunc(listener);

    if (!this.events.has(event)) {
      this.events.set(event, []);
    }

    this.events.get(event).unshift(listener);

    return this;
  }

  prependOnceListener(event, listener) {
    this.validName(event);
    this.validFunc(listener);

    const onceWrapper = (...args) => {
      this.off(event, onceWrapper);
      listener.apply(this, args);
    };

    this.prependListener(event, onceWrapper);
  }

  removeAllListeners(event) {
    this.validName(event);

    this.events.delete(event);

    return this;
  }

  listenerCount(event) {
    this.validName(event);

    if (!this.events.has(event)) {
      return 0;
    }

    return this.events.get(event).length;
  }
}

module.exports = MyEventEmitter;
