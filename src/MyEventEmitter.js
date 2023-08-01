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
  }

  once(eventName, listener) {
    const onceListener = (...args) => {
      listener(...args)

      this.off(eventName, onceListener);
    };

    this.on(eventName, onceListener);
  }

  off(eventName, listener) {
    if (!(eventName in this[_events])) {
      return;
    }

    this[_events][eventName] = this[_events][eventName]
      .filter(currentListener => currentListener !== listener);
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
  }

  removeAllListeners(eventName) {
    if (!eventName) {
      this[_events] = {};
    }

    if (!(eventName in this[_events])) {
      return;
    }

    delete this[_events][eventName];
  }

  prependOnceListener(eventName, listener) {
    const onceListener = (...args) => {
      listener(...args)

      this.off(eventName, onceListener);
    };

    this.prependListener(eventName, onceListener);
  }

  listenerCount(eventName, listener) {
    if (!(eventName in this[_events])) {
      return;
    }

    if (!listener) {
      return this[_events][eventName].length;
    }

    return this[_events][eventName]
      .filter(currentListener => currentListener === listener).length;
  }
}

