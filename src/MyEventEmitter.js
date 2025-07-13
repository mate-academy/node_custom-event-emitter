'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  listenerCount(eventName) {
    return this.listeners[eventName]?.length || 0;
  }

  on(eventName, listener) {
    this.listeners[eventName] = this.listeners[eventName]
      ? [...this.listeners[eventName], { listener, type: 'on' }]
      : [{ listener, type: 'on' }];
  }

  emit(eventName, ...args) {
    if (this.listeners.hasOwnProperty(eventName)) {
      this.listeners[eventName] = this.listeners[eventName].filter(
        ({ listener, type }) => {
          listener(...args);

          return type !== 'once';
        },
      );
    } else {
      return undefined;
    }
  }

  once(eventName, listener) {
    this.listeners[eventName] = this.listeners[eventName]
      ? [...this.listeners[eventName], { listener, type: 'once' }]
      : [{ listener, type: 'once' }];
  }

  prependListener(eventName, listener) {
    this.listeners[eventName] = this.listeners[eventName]
      ? [{ listener, type: 'on' }, ...this.listeners[eventName]]
      : [{ listener, type: 'on' }];
  }

  prependOnceListener(eventName, listener) {
    this.listeners[eventName] = this.listeners[eventName]
      ? [{ listener, type: 'once' }, ...this.listeners[eventName]]
      : [{ listener, type: 'once' }];
  }

  off(eventName, listenerToRemove) {
    if (!this.listeners[eventName]) {
      return;
    }

    this.listeners[eventName] = this.listeners[eventName].filter(
      ({ listener }) => listener !== listenerToRemove,
    );
  }

  removeAllListeners(eventName) {
    if (eventName) {
      delete this.listeners[eventName];
    } else {
      this.listeners = {};
    }
  }
}

module.exports = MyEventEmitter;
