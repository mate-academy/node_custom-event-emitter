'use strict';

class MyEventEmitter {
  events = {};

  on(evType, callback) {
    if (
      (typeof evType !== 'string' && typeof evType !== 'symbol') ||
      typeof callback !== 'function'
    ) {
      return;
    }

    if (!this.events[evType]) {
      this.events[evType] = [];
    }

    this.events[evType].push(callback);

    return this;
  }

  emit(evType, ...args) {
    if (!this.events[evType]) {
      return;
    }

    this.events[evType].forEach((callback) => {
      callback(...args);
    });

    return this;
  }

  off(evType, callback) {
    if (
      (typeof evType !== 'string' && typeof evType !== 'symbol') ||
      typeof callback !== 'function'
    ) {
      return;
    }

    if (!this.events[evType]) {
      return;
    }

    this.events[evType] = this.events[evType].filter((cb) => cb !== callback);

    return this;
  }

  once(evType, callback) {
    if (
      (typeof evType !== 'string' && typeof evType !== 'symbol') ||
      typeof callback !== 'function'
    ) {
      return;
    }

    if (!this.events[evType]) {
      this.events[evType] = [];
    }

    const onceWrapper = (...args) => {
      callback(...args);
      this.off(evType, onceWrapper);
    };

    this.on(evType, onceWrapper);

    return this;
  }

  prependListener(evType, callback) {
    if (
      (typeof evType !== 'string' && typeof evType !== 'symbol') ||
      typeof callback !== 'function'
    ) {
      return;
    }

    if (!this.events[evType]) {
      this.events[evType] = [];
    }

    this.events[evType].unshift(callback);

    return this;
  }

  prependOnceListener(evType, callback) {
    if (
      (typeof evType !== 'string' && typeof evType !== 'symbol') ||
      typeof callback !== 'function'
    ) {
      return;
    }

    if (!this.events[evType]) {
      this.events[evType] = [];
    }

    const onceWrapper = (...args) => {
      callback(...args);
      this.off(evType, onceWrapper);
    };

    this.events[evType].unshift(onceWrapper);

    return this;
  }

  removeAllListeners(evType) {
    if (evType === undefined) {
      this.events = {};
    }

    if (typeof evType !== 'string' && typeof evType !== 'symbol') {
      return;
    }

    this.events[evType] = [];

    return this;
  }

  listenerCount(evType) {
    if (typeof evType !== 'string' && typeof evType !== 'symbol') {
      return 0;
    }

    if (!this.events[evType]) {
      return 0;
    }

    return this.events[evType].length;
  }
}

module.exports = MyEventEmitter;
