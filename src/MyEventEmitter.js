'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  /**
   * @param {String} eventName
   * @param {Function} listener
   * @param {Number} start */
  on(
    eventName,
    listener,
    start = Number.MAX_SAFE_INTEGER,
  ) {
    addListener.call(
      this,
      eventName,
      listener,
      start,
    );
  }

  /**
   * @param {String} eventName
   * @param {Function} listener
   * @param {Number} start */
  once(
    eventName,
    listener,
    start = Number.MAX_SAFE_INTEGER,
  ) {
    const onceListener = (...args) => {
      listener(...args);
      this.off(eventName, onceListener);
    };

    addListener.call(
      this,
      eventName,
      onceListener,
      start,
    );
  }

  /**
   * @param {String} eventName
   * @param {Function} listener */
  off(eventName, listener) {
    if (!(eventName in this.listeners)) {
      return;
    }

    this.listeners[eventName]
      = this.listeners[eventName]
        .filter(item => item.listener !== listener);
  }

  /**
   * @param {String} eventName
   * @param {any[]} args */
  emit(eventName, ...args) {
    if (!(eventName in this.listeners)) {
      return;
    }

    this.listeners[eventName].forEach(({ listener }) => {
      listener(...args);
    });
  }

  /**
 * @param {String} eventName
 * @param {Function} listener */
  prependListener(eventName, listener) {
    this.on(eventName, listener, 0);
  }

  /**
* @param {String} eventName
* @param {Function} listener */
  prependOnceListener(eventName, listener) {
    this.once(eventName, listener, 0);
  }

  /** @param {String} eventName */
  removeAllListeners(eventName) {
    if (eventName === undefined) {
      this.listeners = {};
    }

    if (eventName in this.listeners) {
      delete this.listeners[eventName];
    }
  }

  /** @param {String} eventName */
  listenerCount(eventName) {
    return eventName in this.listeners
      ? this.listeners[eventName].length
      : 0;
  }
};

module.exports = MyEventEmitter;

function addListener(// pulled out so as not to spoil the class interface
  eventName,
  listener,
  start,
) {
  if (typeof eventName !== 'string'
    && typeof listener !== 'function'
    && typeof start !== 'number') {
    return;
  }

  if (!this.listeners[eventName]) {
    this.listeners[eventName] = [];
  }

  this.listeners[eventName]
    .splice(start, 0, {
      listener,
    });
}
