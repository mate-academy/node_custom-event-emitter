'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (this.events[eventName]) {
      this.events[eventName].listeners.push({ listener });
    } else {
      this.events[eventName] = {
        listeners: [{ listener }],
      };
    }

    return this;
  }
  once(eventName, listener) {
    if (this.events[eventName]) {
      this.events[eventName].listeners.push({
        listener, triggerOnce: true,
      });
    } else {
      this.events[eventName] = {
        listeners: [{
          listener, triggerOnce: true,
        }],
      };
    }

    return this;
  }
  off(eventName, listener) {
    if (this.events[eventName]) {
      const listenersArr = this.events[eventName].listeners;

      this.events[eventName].listeners = listenersArr
        .filter((item) => item !== listener);
    }
  }
  emit(eventName, ...args) {
    const event = this.events[eventName];

    if (event) {
      event.listeners.forEach((item) => {
        item.listener(...args);

        if (item.triggerOnce) {
          this.off(eventName, item);
        }
      });
    }

    return this;
  }
  prependListener(eventName, listener) {
    if (this.events[eventName]) {
      this.events[eventName].listeners.unshift({ listener });
    } else {
      this.events[eventName] = {
        listeners: [{ listener }],
      };
    }

    return this;
  }
  prependOnceListener(eventName, listener) {
    if (this.events[eventName]) {
      this.events[eventName].listeners.unshift({
        listener, triggerOnce: true,
      });
    } else {
      this.events[eventName] = {
        listeners: [{
          listener, triggerOnce: true,
        }],
      };
    }

    return this;
  }
  removeAllListeners(eventName) {
    if (eventName) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }

    return this;
  }
  listenerCount(eventName) {
    const event = this.events[eventName];

    if (event) {
      return event.listeners.length;
    }

    return 0;
  }
}

module.exports = {
  MyEventEmitter,
};
