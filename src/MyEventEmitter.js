'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = [];
  }

  on(name, callback) {
    if (
      typeof callback === 'function'
      && typeof name === 'string'
    ) {
      this.listeners.push({
        name, callback,
      });
    }
  }

  once(eventName, callback) {
    function onceFn(data) {
      this.off(eventName, callback);
      callback(data);
    }
    this.on(eventName, onceFn);
  }

  off(eventName, callback) {
    this.listeners = this.listeners.filter(
      listener => !(listener.name === eventName
        && listener.callback === callback)
    );
  }

  emit(eventName, data) {
    this.listeners
      .filter(({ name }) => name === eventName)
      .forEach(
        ({ callback }) => callback.apply(this, [this, ...data]));
  }
  prependListener(name, callback) {
    if (
      typeof callback === 'function'
      && typeof name === 'string'
    ) {
      this.listeners.unshift({
        name, callback,
      });
    }
  }

  prependOnceListener(eventName, callback) {
    function onceFn(data) {
      this.off(eventName, callback);
      callback(data);
    }
    this.prependListener(eventName, onceFn);
  }

  removeAllListeners() {
    this.listener.length = 0;
  }

  listenerCount() {
    return this.listener.length;
  }
}

module.exports = {
  MyEventEmitter,
};
