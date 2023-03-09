'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    const { events } = this;

    events[eventName] = this.events[eventName] || [];
    events[eventName].push(listener);

    return this;
  }

  once(eventName, listener) {
    const { events } = this;

    const wrapper = () => {
      listener();
      this.off(eventName, wrapper);
    };

    events[eventName].push(wrapper);

    return this;
  }

  off(eventName, listenerToRemove) {
    const { events } = this;

    const filterListeners = (listener) => listener !== listenerToRemove;

    events[eventName] = events[eventName].filter(filterListeners);

    return this;
  }

  emit(eventName, ...args) {
    const { events } = this;

    const listeners = events[eventName];

    if (!listeners) {
      return false;
    }

    listeners.forEach(f => f(...args));

    return true;
  }

  prependListener(eventName, listener) {
    const { events } = this;

    events[eventName] = events[eventName] || [];
    events[eventName].unshift(listener);

    return this;
  }

  prependOnceListener(eventName, listener) {
    let hasAlreadyCalled = false;

    const wrapper = (...args) => {
      if (!hasAlreadyCalled) {
        hasAlreadyCalled = true;
        listener(...args);
      } else {
        this.off(eventName, wrapper);
      }
    };

    return this.prependListener(eventName, wrapper);
  }

  removeAllListeners(eventName) {
    const { events } = this;

    if (eventName) {
      delete events[eventName];
    } else {
      this.events = {};
    }
  }

  listenerCount(eventName) {
    const { events } = this;

    return events[eventName].length || 0;
  }
}

module.exports = { MyEventEmitter };
