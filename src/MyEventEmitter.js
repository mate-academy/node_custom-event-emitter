'use strict';

module.exports = class MyEventEmitter {
  constructor() {
    this.eventListeners = {};
  }

  isEventNameValid(eventName) {
    return typeof eventName === 'string';
  }

  isEventHandlerValid(eventHandler) {
    return typeof eventHandler === 'function';
  }

  on(eventName, eventHandler) {
    const { eventListeners, isEventNameValid, isEventHandlerValid } = this;

    if (!isEventNameValid(eventName)) {
      throw new Error('Wrong event name');
    }

    if (!isEventHandlerValid(eventHandler)) {
      throw new Error('Wrong event handler');
    }

    if (!(eventName in eventListeners)) {
      eventListeners[eventName] = [];
    }

    eventListeners[eventName].push(eventHandler);
  }

  once(eventName, eventHandler) {
    const {
      eventListeners, isEventNameValid, isEventHandlerValid,
    } = this;

    if (!isEventNameValid(eventName)) {
      throw new Error('Wrong event name');
    }

    if (!isEventHandlerValid(eventHandler)) {
      throw new Error('Wrong event handler');
    }

    const oneTimeHandler = (...args) => {
      eventHandler(...args);
      this.off(eventName, oneTimeHandler);
    };

    if (!(eventName in eventListeners)) {
      eventListeners[eventName] = [];
    }

    eventListeners[eventName].push(oneTimeHandler);
  }

  off(eventName, eventHandler) {
    const { eventListeners } = this;

    if (eventName in eventListeners) {
      eventListeners[eventName] = eventListeners[eventName]
        .filter(handler => handler !== eventHandler);
    }
  }

  emit(eventName, ...args) {
    const { eventListeners } = this;

    if (eventName in eventListeners) {
      eventListeners[eventName].forEach(handler => handler(...args));
    }
  }

  prependListener(eventName, eventHandler) {
    const { eventListeners, isEventNameValid, isEventHandlerValid } = this;

    if (!isEventNameValid(eventName)) {
      throw new Error('Wrong event name');
    }

    if (!isEventHandlerValid(eventHandler)) {
      throw new Error('Wrong event handler');
    }

    if (!(eventName in eventListeners)) {
      eventListeners[eventName] = [];
    }

    eventListeners[eventName].unshift(eventHandler);
  }

  prependOnceListener(eventName, eventHandler) {
    const {
      eventListeners, isEventNameValid, isEventHandlerValid,
    } = this;

    if (!isEventNameValid(eventName)) {
      throw new Error('Wrong event name');
    }

    if (!isEventHandlerValid(eventHandler)) {
      throw new Error('Wrong event handler');
    }

    const oneTimeHandler = (...args) => {
      eventHandler(...args);
      this.off(eventName, oneTimeHandler);
    };

    if (!(eventName in eventListeners)) {
      eventListeners[eventName] = [];
    }

    eventListeners[eventName].unshift(oneTimeHandler);
  }

  removeAllListeners(eventName) {
    delete this.eventListeners[eventName];
  }

  listenerCount(eventName) {
    if (eventName in this.eventListeners) {
      return this.eventListeners[eventName].length;
    }

    return 0;
  }
};
