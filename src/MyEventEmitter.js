'use strict';

class MyEventEmitter {
  listeners = {};

  on(eventName, func) {
    if (!(eventName in this.listeners)) {
      this.listeners[eventName] = [func];
    } else {
      this.listeners[eventName].push(func);
    }
  }

  once(eventName, func) {
    const onceFunc = (...args) => {
      func(...args);
      this.off(eventName, onceFunc);
    };

    this.on(eventName, onceFunc);

    return this;
  }

  off(eventName, func) {
    if (this.listeners[eventName]) {
      const index = this.listeners[eventName].indexOf(func);

      if (index !== -1) {
        this.listeners[eventName].splice(index, 1);
      }
    }

    return this;
  }

  emit(eventName, ...args) {
    if (!this.listeners[eventName]) {
      return;
    }

    const listenersToCall = [...this.listeners[eventName]];

    listenersToCall.forEach((func) => {
      func(...args);
    });
  }

  prependListener(eventName, func) {
    if (!(eventName in this.listeners)) {
      this.listeners[eventName] = [func];
    } else {
      this.listeners[eventName].unshift(func);
    }
  }

  prependOnceListener(eventName, func) {
    const onceFunc = (...args) => {
      func(...args);
      this.off(eventName, onceFunc);
    };

    this.prependListener(eventName, onceFunc);

    return this;
  }

  removeAllListeners(eventName) {
    if (!eventName) {
      this.listeners = {};
    } else {
      delete this.listeners[eventName];
    }

    return this;
  }

  listenerCount(eventName) {
    if (this.listeners[eventName]) {
      return this.listeners[eventName].length;
    } else {
      return 0;
    }
  }
}

module.exports = MyEventEmitter;
