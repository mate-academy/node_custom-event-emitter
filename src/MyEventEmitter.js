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

  on(eventName, listener) {
    this.checkListenerType(listener);

    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(listener);
  }

  once(eventName, listener) {
    this.checkListenerType(listener);

    const onceWrapper = (...args) => {
      listener(...args);

      this.off(eventName, onceWrapper);
    };

    this.on(eventName, onceWrapper);
  }

  off(eventName, listenerForRemove) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName]
        .filter(listener => listener !== listenerForRemove);
    }
  }

  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(listener => listener(data));
    }
  }

  prependListener(eventName, listener) {
    this.checkListenerType(listener);

    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(listener);
  }

  prependOnceListener(eventName, listener) {
    this.checkListenerType(listener);

    const onceWrapper = (...args) => {
      listener(...args);

      this.off(eventName, onceWrapper);
    };

    this.prependListener(eventName, onceWrapper);
  }

  removeAllListeners(eventName) {
    delete this.events[eventName];
  }

  listenerCount(eventName) {
    return this.events[eventName].length || 0;
  }
}

module.exports = { MyEventEmitter };
