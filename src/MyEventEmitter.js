'use strict';

class MyEventEmitter {
  constructor() {
    this.events = [];
  }

  on(eventName, listener) {
    this.events.push({
      eventName,
      listener,
    });
  }

  once(eventName, listener) {
    this.events.push({
      eventName,
      listener,
      once: true,
    });
  }

  off(eventName, listener) {
    this.events = this.events.filter(
      (events) =>
        !(eventName === events.eventName && listener === events.listener),
    );
  }

  emit(event, ...args) {
    this.events = this.events.filter(({ eventName, listener, once }) => {
      if (event === eventName) {
        listener(...args);

        return !once;
      }

      return true;
    });
  }

  prependListener(eventName, listener) {
    this.events.unshift({
      eventName,
      listener,
    });
  }

  prependOnceListener(eventName, listener) {
    this.events.unshift({
      eventName,
      listener,
      once: true,
    });
  }

  removeAllListeners(event) {
    this.events = this.events.filter(({ eventName }) => event !== eventName);
  }

  listenerCount(eventName) {
    return this.events.filter((listener) => listener.eventName === eventName)
      .length;
  }
}

module.exports = MyEventEmitter;
