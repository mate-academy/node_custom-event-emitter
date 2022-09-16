'use strict';

class MyEventEmitter {
  constructor() {
    this._handlers = {};
  }

  on(eventName, handler) {
    this._checkEventName(eventName);
    this._checkEventHandler(handler);

    if (!this._handlers.hasOwnProperty(eventName)) {
      this._handlers[eventName] = [];
    }

    this._handlers[eventName].push({
      handler,
      permanent: true,
    });

    return this;
  }

  once(eventName, handler) {
    this._checkEventName(eventName);
    this._checkEventHandler(handler);

    if (!this._handlers.hasOwnProperty(eventName)) {
      this._handlers[eventName] = [];
    }

    this._handlers[eventName].push({
      handler,
      permanent: false,
    });

    return this;
  }

  off(eventName, handler) {
    this._checkEventName(eventName);
    this._checkEventHandler(handler);

    if (!this._handlers.hasOwnProperty(eventName)) {
      return this;
    }

    this._handlers[eventName] = this._handlers[eventName].filter(
      eventObject => eventObject.handler !== handler,
    );

    if (!this._handlers[eventName].length) {
      delete this._handlers[eventName];
    }

    return this;
  }

  emit(eventName, ...args) {
    this._checkEventName(eventName);

    if (!this._handlers.hasOwnProperty(eventName)) {
      return false;
    }

    const eventsToEmit = [...this._handlers[eventName]];

    eventsToEmit.forEach(eventObject => {
      eventObject.handler(...args);

      if (!eventObject.permanent) {
        this._handlers[eventName] = this._handlers[eventName].filter(
          evObject => evObject.handler !== eventObject.handler,
        );
      }
    });

    return true;
  }

  prependListener(eventName, handler) {
    this._checkEventName(eventName);
    this._checkEventHandler(handler);

    if (!this._handlers.hasOwnProperty(eventName)) {
      this._handlers[eventName] = [];
    }

    this._handlers[eventName].unshift({
      handler,
      permanent: true,
    });

    return this;
  }

  prependOnceListener(eventName, handler) {
    this._checkEventName(eventName);
    this._checkEventHandler(handler);

    if (!this._handlers.hasOwnProperty(eventName)) {
      this._handlers[eventName] = [];
    }

    this._handlers[eventName].unshift({
      handler,
      permanent: false,
    });

    return this;
  }

  removeAllListeners(eventName) {
    if (!eventName) {
      this._handlers = [];

      return this;
    }

    this._checkEventName(eventName);

    if (!this._handlers.hasOwnProperty(eventName)) {
      return this;
    }

    delete this._handlers[eventName];

    return this;
  }

  listenerCount(eventName) {
    if (!this._handlers.hasOwnProperty(eventName)) {
      return 0;
    }

    return this._handlers[eventName].length;
  }

  _checkEventName(eventName) {
    if (!eventName) {
      throw new Error('Event name must be defined!');
    }

    if (typeof eventName !== 'string') {
      throw new Error('Event name must be a string!');
    }
  }

  _checkEventHandler(handler) {
    if (!handler) {
      throw new Error('Event handler must be defined!');
    }

    if (typeof handler !== 'function') {
      throw new Error('Event handler must be a function!');
    }
  }
}

module.exports = { MyEventEmitter };
