'use strict';

class MyEventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(eventName, callback) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, [callback]);
    } else {
      const subscribers = this.events.get(eventName);

      subscribers.push(callback);
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
    const subscribers = this.events.get(eventName);

    if (!subscribers) {
      return;
    }

    const filteredSubs = subscribers.filter((sub) => sub !== callback);

    this.events.set(eventName, filteredSubs);
  }

  emit(eventName, ...multipleArguments) {
    const subscribers = this.events.get(eventName);

    if (subscribers === undefined) {
      return;
    }

    subscribers.forEach((func) => {
      func(...multipleArguments);
    });
  }

  prependListener(eventName, callback) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, [callback]);
    } else {
      const subscribers = this.events.get(eventName);

      subscribers.unshift(callback);
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
    if (eventName) {
      this.events.delete(eventName);
    } else {
      this.events.clear();
    }
  }

  listenerCount(eventName) {
    return this.events.get(eventName)?.length || 0;
  }
}

module.exports = MyEventEmitter;
