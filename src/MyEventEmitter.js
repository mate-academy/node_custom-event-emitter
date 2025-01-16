'use strict';

class MyEventEmitter {
  constructor() {
    this.storeListeners = new Map();
    this.storeOnce = new Map();
  }

  on(eventName, callback) {
    if (this.storeListeners.has(eventName)) {
      const listeners = this.storeListeners.get(eventName);

      this.storeListeners.set(eventName, [...listeners, callback]);
    } else {
      this.storeListeners.set(eventName, [callback]);
    }
  }
  once(eventName, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(eventName, wrapper);
    };

    this.on(eventName, wrapper);
  }
  off(eventName, callback) {
    if (!this.storeListeners.has(eventName)) {
      return;
    }

    const listeners = this.storeListeners.get(eventName);

    this.storeListeners.set(
      eventName,
      listeners.filter((c) => c !== callback),
    );
  }
  emit(eventName, ...args) {
    if (!this.storeListeners.has(eventName)) {
      return;
    }

    for (const listener of this.storeListeners.get(eventName)) {
      listener(...args);
    }
  }
  prependListener(eventName, callback) {
    if (!this.storeListeners.has(eventName)) {
      this.storeListeners.set(eventName, [callback]);
    } else {
      const listeners = this.storeListeners.get(eventName);

      this.storeListeners.set(eventName, [callback, ...listeners]);
    }
  }
  prependOnceListener(eventName, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(eventName, wrapper);
    };

    this.prependListener(eventName, wrapper);
  }
  removeAllListeners(eventName) {
    if (!this.storeListeners.has(eventName)) {
      return;
    }

    this.storeListeners.set(eventName, []);
  }
  listenerCount(eventName) {
    if (!this.storeListeners.has(eventName)) {
      return 0;
    }

    return this.storeListeners.get(eventName).length;
  }
}

module.exports = MyEventEmitter;
