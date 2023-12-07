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
  }

  once(event, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(event, onceWrapper);
    };

    this.on(event, onceWrapper);
  }

  off(event, listenerToRemove) {
    if (!this.events[event]) {
      throw new Error(
        `Can't remove a listener. Event ${event} does not exists`
      );
    }

    this.events[event] = this.events[event].filter(
      listener => listener !== listenerToRemove);
  }

  emit(event, args) {
    if (!this.events[event]) {
      throw new Error(`Can't emit an event. Event ${event} does not exists`);
    }

    const fireCallbacks = callback => {
      callback(args);
    };

    this.events[event].forEach(fireCallbacks);
  }

  prependListener(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].unshift(listener);
  }

  prependOnceListener(event, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(event, onceWrapper);
    };

    this.events[event].unshift(onceWrapper);
    this.on(event, listener);
  }

  removeAllListeners(event) {
    if (!event) {
      this.events = {};
    } else {
      this.events[event] = [];
    }
  }

  listenerCount(event) {
    return this.events[event] ? this.events[event].length : 0;
  }
}

module.exports = {
  MyEventEmitter,
};
