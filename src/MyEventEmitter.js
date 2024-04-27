'use strict';

class MyEventEmitter {
  constructor() {
    this.eventList = [];
  }
  on(name, callback) {
    this.eventList.push({
      name, callback,
    });
  }
  once(name, callback) {
    this.eventList.push({
      name, callback, once: true,
    });
  }
  off(name, callback) {
    this.eventList = this.eventList.filter(listener => {
      return !(name === listener.name && callback === listener.callback);
    });
  }
  emit(event, ...args) {
    this.eventList = this.eventList.filter(({ name, callback, once }) => {
      if (name === event) {
        callback(...args);

        return !once;
      }

      return true;
    });
  }
  prependListener(name, callback) {
    this.eventList.unshift({
      name, callback,
    });
  }
  prependOnceListener(name, callback) {
    this.eventList.unshift({
      name, callback, once: true,
    });
  }
  removeAllListeners(name) {
    this.eventList = this.eventList.filter(({ name: eventName }) => {
      return name !== eventName;
    });
  }
  listenerCount(name) {
    return this.eventList.filter(listener => listener.name === name).length;
  }
}

module.exports = MyEventEmitter;
