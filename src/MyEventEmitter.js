'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, action) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(action);

    return this;
  }

  once(eventName, action) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    const onceCallback = (...args) => {
      action(args);
      this.off(eventName, onceCallback);
    };

    this.events[eventName].push(onceCallback);

    return this;
  }

  off(eventName, action) {
    this.events[eventName] = this.events[eventName]
      .filter(eventAction => eventAction !== action);

    return this;
  };

  emit(eventName, ...args) {
    this.events[eventName].forEach(eventAction => eventAction(...args));

    return this;
  };

  prependListener(eventName, action) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(action);

    return this;
  }

  prependOnceListener(eventName, action) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    const onceCallback = (...args) => {
      action(args);
      this.off(eventName, onceCallback);
    };

    this.events[eventName].unshift(onceCallback);

    return this;
  }

  removeAllListeners(eventName) {
    if (eventName) {
      this.events[eventName] = [];
    } else {
      this.events = {};
    }

    return this;
  };

  listenerCount(eventName) {
    return this.events[eventName].length || 0;
  };
}

module.exports = { MyEventEmitter };
