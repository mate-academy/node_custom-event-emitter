'use strict';

class MyEventEmitter {
  listeners = {};

  on(eventName, listener) {
    if (!(eventName in this.listeners)) {
      this.listeners[eventName] = [listener];
    } else {
      this.listeners[eventName].push(listener);
    }

    return this;
  }

  off(eventName, listener) {
    if (eventName in this.listeners && this.listeners[eventName].includes(listener)) {
      this.listeners[eventName] = this.listeners[eventName]
        .filter(callback => callback !== listener);
    }

    if (!this.listeners[eventName].length) {
      delete this.listeners[eventName];
    }

    return this;
  }

  once(eventName, listener) {
    const useOnce = (...args) => {
      listener(...args)
      this.off(eventName, useOnce);
    }

    this.on(eventName, useOnce)
    // this.on(eventName, listener(() => this.off(eventName, listener)))

    // if (this.listeners[eventName]) {
    //   delete this.listeners[eventName];
    // }

    return this;
  }

  emit(eventName, ...args) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach(callback => callback(...args));

      return true;
    }

    return false;
  }

  prependListener(eventName, listener) {
    if (!(eventName in this.listeners)) {
      this.listeners[eventName] = [listener];
    } else {
      this.listeners[eventName].unshift(listener);
    }

    return this;
  }

  prependOnceListener(eventName, listener) {
    this.prependListener(eventName, (...args) => {
      listener(args);
      this.off(eventName, listener);
    });
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

const t = new MyEventEmitter();

function a() {}
function b() {}
function c() {}

console.log(t)
t.on('a', a);
t.on('a', c);
t.on('b', a);
t.once('c', a);

// t.off('b', a);
// t.emit('c');
t.prependListener('a', b)
// t.removeAllListeners();
// console.log(t.on('c', () => console.log(hi)))
console.log(t)
// console.log(t.listenerCount('a'))


module.exports = {
  MyEventEmitter,
};
