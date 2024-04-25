'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }
  on(name, handler) {
    if (!this.events.hasOwnProperty(name)) {
      this.events[name] = [];
    }
    this.events[name].push(handler);
  }
  once(name, handler) {
    const cbWrapper = (...args) => {
      handler(...args);
      this.off(name, cbWrapper);
    };

    this.on(name, cbWrapper);
  }
  off(name, handler) {
    if (this.events.hasOwnProperty(name)) {
      this.events[name] = this.events[name].filter((item) => item !== handler);
    }
  }
  emit(name, ...args) {
    if (this.events.hasOwnProperty(name)) {
      this.events[name].forEach((handler) => {
        handler(...args);
      });
    }
  }
  prependListener(name, handler) {
    if (this.events.hasOwnProperty(name)) {
      this.events[name].unshift(handler);
    } else {
      this.events[name] = [handler];
    }
  }
  prependOnceListener(name, handler) {
    const handlerWrapper = (...args) => {
      handler(...args);
      this.off(name, handlerWrapper);
    };

    this.prependListener(name, handlerWrapper);
  }
  removeAllListeners(name) {
    if (name) {
      this.events[name] = [];
    } else {
      this.events = {};
    }
  }
  listenerCount(name) {
    return this.events[name] ? this.events[name].length : 0;
  }
}

module.exports = MyEventEmitter;
