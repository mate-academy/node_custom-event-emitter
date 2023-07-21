'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
    this.onceListenerBuff = [];
  }

  on(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName].push(callback);
    } else {
      this.events[eventName] = [callback];
    }
  }
  once(eventName, callback) {
    this.on(eventName, callback);
    this.onceListenerBuff.push(callback);
  }
  off(eventName, callback) {
    if (!this.events[eventName].length) {
      delete this.events[eventName];
    } else {
      this.events[eventName]
        = this.events[eventName].filter(eCallback => eCallback !== callback);
    }
  }
  emit(eventName, ...args) {
    this.events[eventName].forEach(evCallback => {
      evCallback(...args);

      if (this.onceListenerBuff.includes(evCallback)) {
        this.onceListenerBuff
          = this.onceListenerBuff.filter(cb => cb !== evCallback);

        this.off(eventName, evCallback);
      };
    });
  }
  prependListener(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName].unshift(callback);
    } else {
      this.events[eventName] = [callback];
    }
  }
  prependOnceListener(eventName, callback) {
    this.prependListener(eventName, callback);
    this.onceListenerBuff.push(callback);
  }
  removeAllListeners(eventName) {
    if (this.events[eventName].length) {
      delete this.events[eventName];
    }
  }
  listenerCount(eventName) {
    if (this.events[eventName]) {
      return this.events[eventName].length;
    } else {
      return null;
    }
  }
}

module.exports = { MyEventEmitter };
