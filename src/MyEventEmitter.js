'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(listener);

    return this;
  }

  doOnce(eventName, listener) {
    function listenerOnce() {
      listener();
      this.off(eventName, listenerOnce);
    }

    return listenerOnce;
  }

  once(eventName, listener) {
    this.events[eventName].push(this.doOnce(eventName, listener));

    return this;
  }

  off(eventName, listener) {
    if (this.events[eventName]) {
      this.events[eventName]
        = this.events[eventName].filter(item => item !== listener);
    }

    return this;
  }

  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(listener => listener(...args));
    }

    return this;
  }

  prependListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(listener);

    return this;
  }

  prependOnceListener(eventName, listener) {
    this.events[eventName].unshift(
      this.doOnce(eventName, listener)
    );

    return this;
  }

  removeAllListeners(eventName) {
    if (!eventName) {
      this.events = {};
    } else {
      delete this.events[eventName];
    }

    return this;
  }

  listenerCount(eventName) {
    if (!eventName) {
      throw new Error('There are no listeners to count');
    }

    return this.events[eventName].length;
  }
}

module.exports = { MyEventEmitter };
