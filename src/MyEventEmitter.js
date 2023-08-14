'use strict';
/* eslint-disable */

const _events = Symbol('events');

class MyEventEmitter {
  constructor() {
    this[_events] = {};
  }

  on(eventName, listener) {
    if (!(eventName in this[_events])) {
      this[_events][eventName] = [];
    }

    this[_events][eventName].push(listener);

    return this;
  }

  once(eventName, listener) {
    const onceListener = (...args) => {
      listener(...args)

      this.off(eventName, onceListener);
    };

    this.on(eventName, onceListener);

    return this;
  }

  off(eventName, listener) {
    if (!(eventName in this[_events])) {
      return;
    }

    this[_events][eventName] = this[_events][eventName]
      .filter(currentListener => currentListener !== listener);

    return this;
  }

  emit(eventName, ...args) {
    const canEmit = eventName in this[_events]
      && this[_events][eventName].length > 0;

    if (!canEmit) {
      return;
    }

    this[_events][eventName].forEach(listener => listener(...args));
  }

  prependListener(eventName, listener) {
    if (!(eventName in this[_events])) {
      this[_events][eventName] = [];
    }

    this[_events][eventName].unshift(listener);

    return this;
  }

  removeAllListeners(eventName) {
    if (!eventName) {
      this[_events] = {};
    }

    if (!(eventName in this[_events])) {
      return;
    }

    delete this[_events][eventName];

    return this;
  }

  prependOnceListener(eventName, listener) {
    const onceListener = (...args) => {
      listener(...args)

      this.off(eventName, onceListener);
    };

    this.prependListener(eventName, onceListener);

    return this;
  }

  listenerCount(eventName, listener) {
    if (!(eventName in this[_events])) {
      return 0;
    }

    if (!listener) {
      return this[_events][eventName].length;
    }

    return this[_events][eventName]
      .filter(currentListener => currentListener === listener).length;
  }
}
