'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
    this.onceMap = new WeakMap();
  }
  on(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('listener must be a function');
    }

    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);

    return this;
  }
  once(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('listener must be a function');
    }

    if (!this.events[event]) {
      this.events[event] = [];
    }

    const wrapper = (...args) => {
      listener.apply(this, args);

      this.events[event] = this.events[event].filter(
        (ev) => ev !== listener && ev !== wrapper,
      );
      this.onceMap.delete(listener);
    };

    this.onceMap.set(listener, wrapper);
    this.events[event].push(wrapper);

    return this;
  }
  off(event, listener) {
    if (!this.events[event]) {
      return;
    }

    const wrapper = this.onceMap.get(listener);

    this.events[event] = this.events[event].filter(
      (ev) => ev !== listener && ev !== wrapper,
    );
  }
  emit(event, ...args) {
    if (!this.events[event]) {
      return false;
    }

    const listeners = this.events[event].slice();

    for (const listener of listeners) {
      listener(...args);
    }

    return true;
  }
  prependListener(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('listener must be a function');
    }

    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].unshift(listener);

    return this;
  }
  prependOnceListener(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('listener must be a function');
    }

    if (!this.events[event]) {
      this.events[event] = [];
    }

    const wrapper = (...args) => {
      listener.apply(this, args);

      const filteredEvents = this.events[event].filter(
        (ev) => ev !== listener && ev !== wrapper,
      );

      this.events[event] = filteredEvents;
      this.onceMap.delete(listener);
    };

    this.onceMap.set(listener, wrapper);
    this.events[event].unshift(wrapper);

    return this;
  }
  removeAllListeners(event) {
    if (event === undefined) {
      this.events = {};

      return this;
    }

    if (!this.events[event]) {
      return;
    }

    this.events[event] = [];

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
