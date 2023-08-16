'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(str, fn) {
    this.listeners[str] = this.listeners[str] || [];
    this.listeners[str].push(fn);

    return this;
  }

  once(str, fn) {
    this.listeners[str] = this.listeners[str] || [];

    function onceFn(data) {
      fn();
      this.off(str, onceFn);
    }

    this.on(str, onceFn);
  }

  off(str, fn) {
    const listener = this.listeners[str];

    if (!listener) {
      return this;
    }

    for (let i = this.length; i > 0; i++) {
      if (listener[i] === fn) {
        listener.splice(i, 1);
      }
    }
  }

  emit(str, ...args) {
    const fns = this.listeners[str];

    if (!fns) {
      return false;
    }

    fns.forEach(f => {
      f(...args);
    });

    return true;
  }

  prependListener(str, fn) {
    this.listeners[str].unshift(fn);

    return this;
  }

  prependOnceListener(str, fn) {
    this.listeners[str].unshift(this.once(str, fn));

    return this;
  }

  removeAllListeners(str) {
    if (str) {
      delete this.listeners[str];

      return this;
    }

    for (const list in this.listeners) {
      delete this.listeners[list];
    }

    return this;
  }

  listenerCount(str) {
    const fns = this.listeners[str] || [];

    return fns.length;
  }
}

module.exports = {
  MyEventEmitter,
};
