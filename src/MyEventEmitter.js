'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  validateListener(fn) {
    if (typeof fn !== 'function') {
      throw new Error('invalid type of listener');
    }
  }

  validateEventName(event) {
    if (typeof event !== 'string') {
      throw new Error('invalid type of event name');
    }
  }

  addListener(event, fn) {
    this.validateEventName(event);
    this.validateListener(fn);

    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);

    return this;
  }

  on(event, fn) {
    this.validateEventName(event);
    this.validateListener(fn);

    this.addListener(event, fn);

    return this;
  }

  removeAllListeners(event, fn) {
    this.validateEventName(event);
    this.validateListener(fn);

    const lis = this.listeners[event];

    if (!lis) {
      return this;
    }

    for (let i = lis.length; i > 0; i--) {
      lis.splice(i, 1);
    }

    return this;
  }

  off(event, fn) {
    this.validateEventName(event);
    this.validateListener(fn);

    return this.removeAllListeners(event, fn);
  }

  once(event, fn) {
    this.validateEventName(event);
    this.validateListener(fn);

    this.listeners[event] = this.listeners[event] || [];

    const onceWrapper = () => {
      fn();

      this.off(event, fn);
    };

    this.listeners[event].push(onceWrapper);

    return this;
  }

  emit(event, ...args) {
    this.validateEventName(event);

    const fns = this.listeners[event];

    if (!fns) {
      return false;
    }

    fns.forEach(f => {
      f(...args);
    });

    return true;
  }

  prependListener(event, fn) {
    this.validateEventName(event);
    this.validateListener(fn);

    const fns = this.listeners[event] || [];

    fns.unshift(event);

    return this;
  }

  prependOnceListener(event, fn) {
    this.validateEventName(event);
    this.validateListener(fn);

    const onceWrapper = () => {
      fn();
      this.off(event, onceWrapper);
    };

    this.listeners[event].unshifit(onceWrapper);

    return this;
  }

  listenerCount(event) {
    this.validateEventName(event);

    if (!event) {
      throw new Error('missing event name');
    }

    const fns = this.listeners[event] || [];

    return fns.length;
  }
}

module.exports = {
  MyEventEmitter,
};
