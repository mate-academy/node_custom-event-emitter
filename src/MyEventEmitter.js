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
    if (!this.events[event]) {
      this.events[event] = [];
    }

    const wrapper = (...args) => {
      listener(...args);

      const filteredEvents = this.events[event].filter((ev) => ev !== wrapper);

      this.events[event] = filteredEvents;
    };

    this.events[event].push(wrapper);
  }
  off(event, listener) {
    if (!this.events[event]) {
      return;
    }

    this.events[event] = this.events[event].filter((ev) => ev !== listener);
  }
  emit(event, ...args) {
    if (!this.events[event]) {
      return false;
    }

    this.events[event].forEach((ev) => ev(...args));

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
      listener(...args);

      const filteredEvents = this.events[event].filter((ev) => ev !== wrapper);

      this.events[event] = filteredEvents;
    };

    this.events[event].unshift(wrapper);

    return this;
  }
  removeAllListeners(event) {
    if (!event) {
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
