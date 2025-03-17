'use strict';
class MyEventEmitter {
  constructor() {
    this.events = {};
  }
  on(name, listener) {
    if (!this.events[name]) {
      this.events[name] = [];
    }
    this.events[name].push(listener);

    return this;
  }
  once(event, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(event, onceWrapper);
    };

    this.on(event, onceWrapper);

    return this;
  }
  off(event, listener) {
    if (!this.events[event]) {
      return this;
    }

    this.events[event] = this.events[event].filter((l) => l !== listener);

    return this;
  }
  emit(name, ...args) {
    if (!this.events[name]) {
      return false;
    }

    this.events[name].forEach((event) => {
      event(...args);
    });

    return true;
  }
  prependListener(name, listener) {
    if (this.events[name]) {
      this.events[name] = [listener, ...this.events[name]];
    } else {
      this.events[name] = [listener];
    }

    return this;
  }
  prependOnceListener(event, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(event, onceWrapper);
    };

    this.prependListener(event, onceWrapper);

    return this;
  }
  removeAllListeners(name) {
    if (name && this.events[name]) {
      delete this.events[name];
    } else {
      this.events = {};
    }
  }
  listenerCount(name, listener) {
    if (this.events[name]) {
      if (listener) {
        return this.events[name].filter((evnt) => evnt === listener).length;
      }

      return this.events[name].length;
    }

    return 0;
  }
}

module.exports = MyEventEmitter;
