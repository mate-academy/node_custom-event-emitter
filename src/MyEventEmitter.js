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
  }
  once(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    const onceListener = () => {
      listener();

      const index = this.events[eventName].indexOf(onceListener);

      if (index !== -1) {
        this.events[eventName].splice(index, 1);
      }
    };

    this.events[eventName].push(onceListener);
  }
  off(eventName, listener) {
    if (!this.events[eventName]) {
      return;
    }

    const index = this.events[eventName].indexOf(listener);

    if (index !== -1) {
      this.events[eventName].splice(index, 1);
    }
  }
  emit(eventName) {
    if (!this.events[eventName]) {
      return;
    }

    for (const call of this.events[eventName]) {
      call();
    }
  }
  prependListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(listener);
  }
  prependOnceListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    const onceListener = () => {
      listener();

      const index = this.events[eventName].indexOf(onceListener);

      if (index !== -1) {
        this.events[eventName].splice(index, 1);
      }
    };

    this.events[eventName].unshift(onceListener);
  }
  removeAllListeners(eventName) {
    if (!eventName) {
      delete this.events[eventName];

      return;
    }

    this.events[eventName] = [];
  }
  listenerCount(eventName) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    return this.events[eventName].length;
  }
}

module.exports = {
  MyEventEmitter,
};
