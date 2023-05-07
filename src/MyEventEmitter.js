'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  checkIsEventExists(eventName) {
    if (!this.listeners[eventName]) {
      throw new Error('There is no such event');
    }
  }

  createListenerData(listener, isDisposable) {
    return {
      name: listener.name,
      isDisposable,
      handler: listener,
    };
  }

  on(eventName, listener) {
    const listenerData = this.createListenerData(listener, false);

    if (this.listeners[eventName]) {
      this.listeners[eventName].push(listenerData);
    } else {
      this.listeners[eventName] = [{
        name: listener.name,
        isDisposable: false,
        handler: listener,
      }];
    }
  }

  once(eventName, listener) {
    const listenerData = this.createListenerData(listener, true);

    if (this.listeners[eventName]) {
      this.listeners[eventName].push(listenerData);
    } else {
      this.listeners[eventName] = [listenerData];
    }
  }

  off(eventName, listener) {
    if (!listener.name || listener.name === 'anonymus') {
      throw new Error('You can switch off only named listener');
    }

    this.listeners[eventName] = this.listeners[eventName]
      .filter(oldListener => oldListener.name !== listener.name);
  }

  emit(eventName, ...args) {
    this.checkIsEventExists(eventName);

    if (this.listeners[eventName].length === 0) {
      throw new Error('There no listeners for the event');
    }

    for (let i = 0; i < this.listeners[eventName].length; i++) {
      this.listeners[eventName][i].handler(...args);

      if (this.listeners[eventName][i].isDisposable) {
        this.listeners[eventName] = this.listeners[eventName]
          .filter((listener, index) => index !== i);
        i--;
      }
    }
  }

  prependListener(eventName, listener) {
    this.checkIsEventExists(eventName);

    const listenerData = this.createListenerData(listener, false);

    this.listeners[eventName].unshift(listenerData);
  }

  prependOnceListener(eventName, listener) {
    const listenerData = this.createListenerData(listener, true);

    this.listeners[eventName].unshift(listenerData);
  }

  removeAllListeners(eventName) {
    if (eventName) {
      this.listeners[eventName] = [];
    } else {
      const allProperties = Object.keys(this.listeners);

      for (const property of allProperties) {
        delete this.listeners[property];
      }
    }
  }

  listenerCount(eventName) {
    this.checkIsEventExists(eventName);

    return this.listeners[eventName].length;
  }
}

module.exports = { MyEventEmitter };
