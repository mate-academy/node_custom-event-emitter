'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (typeof listener !== 'function') {
      throw new Error('Listener must be a function!');
    }

    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(listener);

    return this;
  }

  once(eventName, listener) {
    const wrapper = () => {
      listener();
      this.off(eventName, wrapper);
    };

    this.events[eventName].push(wrapper);

    return this;
  }

  off(eventName, listenerToRemove) {
    if (!this.events[eventName]) {
      throw new Error(`Error removing listener! ${eventName} does not exists!`);
    }

    const filterListeners = (listener) => listener !== listenerToRemove;

    this.events[eventName] = this.events[eventName].filter(filterListeners);

    return this;
  }

  emit(eventName, ...args) {
    const fns = this.events[eventName];

    if (!fns) {
      return false;
    }

    fns.forEach(f => f(...args));

    return true;
  }

  prependListener(eventName, listener) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].unshift(listener);

    return this;
  }

  prependOnceListener(eventName, listener) {
    const wrapper = () => {
      listener();
      this.off(eventName, wrapper);
    };

    this.events[eventName].push(wrapper);

    return this.prependListener(eventName, wrapper);
  }

  removeAllListeners(eventName) {
    if (eventName) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }
  }

  listenerCount(eventName) {
    return this.events[eventName].length || 0;
  }
}

module.exports = { MyEventEmitter };
