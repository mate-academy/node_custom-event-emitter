'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  checkListenerType(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Listener must be a function');
    }
  }

  checkEventNameType(eventName) {
    if (typeof eventName !== 'string') {
      throw new Error('Event name must be a string');
    }
  }

  on(eventName, listener) {
    this.checkListenerType(listener);
    this.checkEventNameType(eventName);

    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(listener);
  }

  once(eventName, listener) {
    this.checkListenerType(listener);
    this.checkEventNameType(eventName);

    const onceWrapper = (...args) => {
      listener(...args);

      this.off(eventName, onceWrapper);
    };

    this.on(eventName, onceWrapper);
  }

  off(eventName, listenerForRemove) {
    this.checkListenerType(listenerForRemove);
    this.checkEventNameType(eventName);

    if (!this.events[eventName]) {
      throw new Error('This event name does not exist');
    }

    if (!(this.events[eventName].includes(listenerForRemove))) {
      throw new Error('This listener does not exist');
    }

    this.events[eventName] = this.events[eventName]
      .filter(listener => listener !== listenerForRemove);
  }

  emit(eventName, data) {
    this.checkEventNameType(eventName);

    if (this.events[eventName]) {
      this.events[eventName].forEach(listener => listener(data));
    }
  }

  prependListener(eventName, listener) {
    this.checkListenerType(listener);
    this.checkEventNameType(eventName);

    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(listener);
  }

  prependOnceListener(eventName, listener) {
    this.checkListenerType(listener);
    this.checkEventNameType(eventName);

    const onceWrapper = (...args) => {
      listener(...args);

      this.off(eventName, onceWrapper);
    };

    this.prependListener(eventName, onceWrapper);
  }

  removeAllListeners(eventName) {
    this.checkEventNameType(eventName);

    delete this.events[eventName];
  }

  listenerCount(eventName) {
    this.checkEventNameType(eventName);

    return this.events[eventName].length || 0;
  }
}

module.exports = { MyEventEmitter };
