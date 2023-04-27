'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    const { events } = this;

    if (Object.prototype.hasOwnProperty.call(events, eventName)) {
      events[eventName].push(listener);
    } else {
      events[eventName] = [listener];
    }

    return this;
  }

  once(eventName, listener) {
    const newListener = (...args) => {
      listener(...args);
      this.removeListener(eventName, newListener);
    };

    return this.on(eventName, newListener);
  }

  off(eventName, listener) {
    const { events } = this;

    events[eventName] = events[eventName]
      .filter(currentListener => currentListener !== listener);

    return this;
  }

  emit(eventName, ...args) {
    const { events } = this;

    const listeners = events[eventName];

    if (!listeners) {
      return false;
    }

    listeners.forEach(listener => listener(...args));

    return true;
  }

  prependListener(eventName, listener) {
    const { events } = this;

    if (Object.prototype.hasOwnProperty.call(events, eventName)) {
      events[eventName].unshift(listener);
    } else {
      events[eventName] = [listener];
    }

    return this;
  }

  prependOnceListener(eventName, listener) {
    let hasAlredyCalled = false;

    const newListener = (...args) => {
      if (!hasAlredyCalled) {
        hasAlredyCalled = true;
        listener(...args);
      } else {
        this.off(eventName, newListener);
      }
    };

    return this.prependListener(eventName, newListener);
  }

  removeAllListeners(eventName) {
    let { events } = this;

    if (eventName) {
      events[eventName] = [];
    } else {
      events = {};
    }
  }

  listenerCount(eventName) {
    const { events } = this;

    const listeners = events[eventName];

    if (!listeners) {
      return 0;
    }

    return listeners.length;
  }
}

module.exports = {
  MyEventEmitter,
};
