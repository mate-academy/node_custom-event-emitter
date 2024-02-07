'use strict';

class Event {
  constructor(name) {
    this.name = name;
    this.listeners = [];
  }
}

class MyEventEmitter {
  constructor() {
    this._events = [];
  }

  _addListener(eventName, callback, payload = {}) {
    let event = this._events.find(ev => ev.name === eventName);

    if (!event) {
      event = new Event(eventName);
      this._events.push(event);
    }

    if (payload.once) {
      callback.once = true;
    }

    if (payload.prepend) {
      event.listeners.unshift(callback);
    } else {
      event.listeners.push(callback);
    }
  }

  on(eventName, callback) {
    this._addListener(eventName, callback);
  }
  once(eventName, callback) {
    this._addListener(eventName, callback, { once: true });
  }
  off(eventName, callback) {
    const event = this._events.find(ev => ev.name === eventName);

    if (event) {
      const callbackIndex = event.listeners.indexOf(callback);

      if (callbackIndex !== -1) {
        event.listeners.splice(callbackIndex, 1);
      }
    }
  }
  emit(eventName, ...args) {
    const event = this._events.find(ev => ev.name === eventName);

    if (event) {
      event.listeners.forEach((listener) => {
        listener(...args);
      });

      event.listeners = event.listeners.filter(listener => !listener.once);
    }
  }
  prependListener(eventName, callback) {
    this._addListener(eventName, callback, { prepend: true });
  }
  prependOnceListener(eventName, callback) {
    this._addListener(eventName, callback, {
      once: true,
      prepend: true,
    });
  }
  removeAllListeners(eventName) {
    const event = this._events.find(ev => ev.name === eventName);

    if (eventName && event) {
      event.listeners = [];
    } else if (!eventName) {
      this.eventNames = [];
      this._events = [];
    }
  }
  listenerCount(eventName) {
    const event = this._events.find(ev => ev.name === eventName);

    return event ? event.listeners.length : 0;
  }
}

module.exports = MyEventEmitter;
