'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = [];
  }

  on(eventName, listener) {
    this.listeners.push({ eventName, listener });
  }

  once(eventName, listener) {
    const onceListener = (...args) => {
      listener(...args);
      this.off(eventName, onceListener);
    };

    this.on(eventName, onceListener);
  }

  off(eventName, listener = null) {
    if (listener) {
      this.listeners = this.listeners.filter(
        (listenerObj) =>
          listenerObj.eventName !== eventName ||
          listenerObj.listener !== listener,
      );
    } else {
      this.listeners = this.listeners.filter(
        (listenerObj) => listenerObj.eventName !== eventName,
      );
    }
  }

  emit(eventName, ...args) {
    this.listeners.forEach((listenerObj) => {
      if (listenerObj.eventName === eventName) {
        listenerObj.listener(...args);
      }
    });
  }

  prependListener(eventName, listener) {
    this.listeners.unshift({ eventName, listener });
  }
  prependOnceListener(eventName, listener) {
    const onceListener = (...args) => {
      listener(...args);
      this.off(eventName, onceListener);
    };

    this.prependListener(eventName, onceListener);
  }
  removeAllListeners(eventName = null) {
    if (eventName) {
      this.off(eventName);
    } else {
      this.listeners = [];
    }
  }
  listenerCount(eventName) {
    const countLisener = this.listeners.filter(
      (item) => item.eventName === eventName,
    );

    return countLisener.length;
  }
}

module.exports = MyEventEmitter;
