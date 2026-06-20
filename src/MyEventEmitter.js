'use strict';

class MyEventEmitter {
  constructor(eventName, count) {
    this.eventName = {}; // string
    this.count = [];
  }
  on(event, callback) {
    if (this.eventName[event]) {
      this.eventName[event].push(callback);
    } else {
      this.eventName[event] = [];
      this.eventName[event].push(callback);
    }
  }
  once(event, callback) {
    const funcaoDisfarcada = (...args) => {
      callback(...args);
      this.off(event, funcaoDisfarcada);
    };

    this.on(event, funcaoDisfarcada);
  }
  off(event, callback) {
    if (event in this.eventName) {
      const newArray = this.eventName[event].filter((t) => t !== callback);

      this.eventName[event] = newArray;

      return this.eventName;
    }
  }
  emit(event, ...args) {
    if (event in this.eventName) {
      const e = this.eventName[event].forEach((callback) => callback(...args));

      return e;
    }

    return 0;
  }
  prependListener(event, callback) {
    if (event in this.eventName) {
      this.eventName[event].unshift(callback);
    }
  }
  prependOnceListener(event, callback) {
    const funcaoDisfarcada = (...args) => {
      callback(...args);
      this.off(event, funcaoDisfarcada);
    };

    if (event in this.eventName) {
      this.eventName[event].unshift(funcaoDisfarcada);
    } else {
      this.eventName[event] = [];
      this.eventName[event].unshift(funcaoDisfarcada);
    }
  }
  removeAllListeners(event) {
    if (!event) {
      for (const key in this.eventName) {
        delete this.eventName[key];
      }
    } else {
      delete this.eventName[event];
    }
  }
  listenerCount(event) {
    if (event in this.eventName) {
      return this.eventName[event].length;
    }

    return 0;
  }
}

module.exports = MyEventEmitter;
