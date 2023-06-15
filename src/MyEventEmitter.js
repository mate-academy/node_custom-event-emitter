'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
    this.countEvents = 0;
  }

  on(eventName, foo) {
    if (eventName in this.events) {
      this.events[eventName].push(foo);

      return;
    }

    this.events[eventName] = [foo];
    this.countEvents++;
  }
  once(eventName, foo) {
    const onceWrapper = (...args) => {
      foo(...args);

      this.off(eventName, onceWrapper);
    };

    this.on(eventName, onceWrapper);
  }
  off(eventName, foo) {
    if (!(eventName in this.events)) {
      return;
    }

    this.events[eventName] = this.events[eventName]
      .filter(handler => handler !== foo);

    if (this.events[eventName].length === 0) {
      delete this.events[eventName];

      this.countEvents--;
    }
  }
  emit(eventName, ...args) {
    if (eventName in this.events) {
      this.events[eventName].forEach(foo => {
        foo(...args);
      });
    }
  }
  prependListener(eventName, foo) {
    if (eventName in this.events) {
      this.events[eventName].unshift(foo);

      return;
    }

    this.events[eventName] = [foo];
    this.countEvents++;
  }
  prependOnceListener(eventName, foo) {
    const onceWrapper = (...args) => {
      foo(...args);

      this.off(eventName, onceWrapper);
    };

    this.prependListener(eventName, onceWrapper);
  }
  removeAllListeners() {
    this.events = {};
    this.countEvents = 0;
  }
  listenerCount() {
    return this.countEvents;
  }
};

module.exports = {
  MyEventEmitter,
};
