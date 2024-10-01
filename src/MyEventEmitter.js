'use strict';

class MyEventEmitter {
  events = {};

  addListener(event, callback, once = false, needToPrepend = false) {
    const listener = {
      callback,
      once,
      prepend: needToPrepend,
    };

    if (this.events[event]) {
      // eslint-disable-next-line no-unused-expressions
      needToPrepend
        ? this.events[event].unshift(listener)
        : this.events[event].push(listener);
    } else {
      this.events[event] = [listener];
    }
  }

  on(event, callback) {
    this.addListener(event, callback);
  }
  off(event, callback) {
    const listeners = this.events[event];
    const filteredListeners = listeners.filter(
      (listener) => listener.callback !== callback,
    );

    this.events[event] = filteredListeners;
  }
  once(event, callback) {
    this.addListener(event, callback, true);
  }
  emit(event, ...args) {
    const listeners = this.events[event];

    listeners.forEach((listener) => listener.callback(...args));
    this.events[event] = listeners.filter((listener) => !listener.once);
  }
  prependListener(event, callback) {
    this.addListener(event, callback, false, true);
  }
  prependOnceListener(event, callback) {
    this.addListener(event, callback, true, true);
  }
  removeAllListeners(event) {
    this.events[event] = [];
  }
  listenerCount(event) {
    const listener = this.events[event];

    return listener ? listener.length : 0;
  }
}
module.exports = MyEventEmitter;
