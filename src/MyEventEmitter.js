'use strict';

module.exports = {
  MyEventEmitter: class {
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

    once(eventName, listener) {
      const onceFunction = (...args) => {
        listener(...args);
        this.off(eventName, onceFunction);
      };

      this.on(eventName, onceFunction);

      return this;
    }

    off(eventName, listener) {
      if (this.events[eventName]) {
        this.events[eventName] = this.events[eventName]
          .filter(e => e !== listener);
      }

      return this;
    }

    emit(eventName, ...args) {
      if (this.events[eventName]) {
        this.events[eventName].forEach(f => f(...args));

        return true;
      }

      return false;
    }

    prependListener(eventName, listener) {
      if (this.events[eventName]) {
        this.events[eventName].unshift(listener);
      } else {
        this.on(eventName, listener);
      }

      return this;
    }

    prependOnceListener(eventName, listener) {
      const onceFunction = (...args) => {
        listener(...args);
        this.off(eventName, onceFunction);
      };

      this.prependListener(eventName, onceFunction);

      return this;
    }

    removeAllListeners(eventName) {
      if (this.events[eventName]) {
        delete this.events[eventName];
      }

      return this;
    }

    listenerCount(eventName) {
      return this.events[eventName] ? this.events[eventName].length : 0;
    }
  },
};
