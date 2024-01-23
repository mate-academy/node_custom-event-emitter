'use strict';

class MyEventEmitter {
  listeners = {};

  #addListeners(eventName, obj, method) {
    if (!(eventName in this.listeners)) {
      this.listeners[eventName] = [obj];
    } else {
      this.listeners[eventName][method](obj);
    }
  }

  on(eventName, listener) {
    this.#addListeners(eventName, {callback: listener, once: false}, 'push');
    return this;
  }

  off(eventName, listener) {
    if (eventName in this.listeners) {
      delete this.listeners[eventName];
    }

    return this;
  }

  once(eventName, listener) {
    this.#addListeners(eventName, {callback: listener, once: true}, 'push');

    return this;
  }

  emit(eventName, ...args) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach(lis => {
        lis.callback(...args);
        if (lis.once === true) {
          this.off(eventName, lis.callback)
        }
      });

      return true;
    }

    return false;
  }

  prependListener(eventName, listener) {
    this.#addListeners(eventName, {callback: listener, once: false}, 'unshift');

    return this;
  }

  prependOnceListener(eventName, listener) {
    this.#addListeners(eventName, {callback: listener, once: true}, 'unshift');

    return this;
  }

  removeAllListeners(...eventNames) {
    if (eventNames.length) {
      eventNames.forEach(eventName => delete this.listeners[eventName]);
    } else {
      this.listeners = {};
    }

    return this;
  }

  listenerCount(eventName, listener) {
    if (!listener) {
      if (this.listeners[eventName]) {
        return this.listeners[eventName].length;
      } else {
        return 0;
      }
    }

    return this.listeners[eventName]
      .filter(callback => callback === listener).length || 0;
  }
}

module.exports = {
  MyEventEmitter,
};
