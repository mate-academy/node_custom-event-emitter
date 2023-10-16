'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, eventBody) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(eventBody);
  }

  once(eventName, eventBody) {
    const onceWrapper = (...args) => {
      eventBody(...args);
      this.off(eventName, onceWrapper);
    };

    this.on(eventName, onceWrapper);
  }

  off(eventName, eventBody) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName]
        .filter(event => eventBody.toString() !== event.toString());
    }
  }

  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(element => {
        element(...args);
      });
    }
  }

  prependListener(eventName, eventBody) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].unshift(eventBody);
  }

  prependOnceListener(eventName, eventBody) {
    const onceWrapper = (...args) => {
      eventBody(...args);
      this.off(eventName, onceWrapper);
    };

    this.prependListener(eventName, onceWrapper);
  }

  removeAllListeners(eventName) {
    if (eventName) {
      delete this.events[eventName];

      return;
    }

    this.events = {};
  }
  listenerCount(eventName) {
    if (this.events[eventName]) {
      return this.events[eventName].length;
    }

    return 0;
  }
}

module.exports = { MyEventEmitter };
