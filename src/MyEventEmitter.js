'use strict';

class MyEvent {
  constructor(eventName, func, once = false) {
    this.eventName = eventName;
    this.func = func;
    this.once = once;
  }
}

class MyEventEmitter {
  constructor() {
    this.listeners = [];
  }

  _valditateEventName(eventName) {
    if (typeof eventName !== 'string') {
      throw new TypeError('eventName must be a string');
    }
  }

  on(eventName, func) {
    this._valditateEventName(eventName);
    this.listeners.push(new MyEvent(eventName, func));
  }

  once(eventName, func) {
    this._valditateEventName(eventName);
    this.listeners.push(new MyEvent(eventName, func, true));
  }

  off(eventName, func) {
    this._valditateEventName(eventName);

    const eventIndex = this.listeners.findIndex(
      (e) => e.eventName === eventName && e.func === func,
    );

    if (eventIndex === -1) {
      throw new Error('Event not found');
    }

    this.listeners.splice(eventIndex, 1);
  }

  emit(eventName, ...args) {
    this._valditateEventName(eventName);

    const events = this.listeners.filter((e) => e.eventName === eventName);

    if (!events.length) {
      return;
    }

    events.forEach((event) => {
      event.func(...args);

      if (event.once) {
        this.off(eventName, event.func);
      }
    });
  }

  prependListener(eventName, func) {
    this._valditateEventName(eventName);
    this.listeners.unshift(new MyEvent(eventName, func));
  }

  prependOnceListener(eventName, func) {
    this._valditateEventName(eventName);
    this.listeners.unshift(new MyEvent(eventName, func, true));
  }

  removeAllListeners(eventName) {
    if (!eventName) {
      this.listeners = [];

      return;
    }

    this._valditateEventName(eventName);
    this.listeners = this.listeners.filter((e) => e.eventName !== eventName);
  }

  listenerCount(eventName) {
    this._valditateEventName(eventName);

    return this.listeners.filter((e) => e.eventName === eventName).length;
  }
}

module.exports = MyEventEmitter;
