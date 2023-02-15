'use strict';

const { checkForErrors } = require('./checkForErrors');

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    checkForErrors(eventName, listener);

    const { events } = this;

    if (events[eventName]) {
      events[eventName].push(listener);
    } else {
      events[eventName] = [listener];
    }

    return this;
  }

  once(eventName, listener) {
    checkForErrors(eventName, listener);

    const { events } = this;

    const onceListener = (...args) => {
      listener(...args);
      this.off(eventName, onceListener);
    };

    if (events[eventName]) {
      events[eventName].push(onceListener);
    } else {
      events[eventName] = [onceListener];
    }

    return this;
  }

  off(eventName, listener) {
    checkForErrors(eventName, listener);

    const { events } = this;

    events[eventName] = events[eventName].filter(func => func !== listener);

    return this;
  }

  emit(eventName, ...args) {
    checkForErrors(eventName);

    const { events } = this;

    events[eventName].forEach(listener => {
      listener(...args);
    });

    return this;
  }

  prependListener(eventName, listener) {
    checkForErrors(eventName, listener);

    const { events } = this;

    if (events[eventName]) {
      events[eventName].unshift(listener);
    } else {
      events[eventName] = [listener];
    }

    return this;
  }

  prependOnceListener(eventName, listener) {
    checkForErrors(eventName, listener);

    const { events } = this;

    const onceListener = (...args) => {
      listener(...args);
      this.off(eventName, onceListener);
    };

    if (events[eventName]) {
      events[eventName].unshift(onceListener);
    } else {
      events[eventName] = [onceListener];
    }

    return this;
  }

  removeAllListeners(eventName) {
    checkForErrors(eventName, () => {});

    const { events } = this;

    delete events[eventName];

    return this;
  }

  listenerCount(eventName) {
    checkForErrors(eventName, () => {});

    const { events } = this;

    return events[eventName].length || 0;
  }
}
module.exports.MyEventEmitter = MyEventEmitter;
