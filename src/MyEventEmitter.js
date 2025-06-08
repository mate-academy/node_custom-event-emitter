'use strict';

class MyEventEmitter {
  constructor() {
    // Store listeners as an object,
    // where the key is the event and the
    // value is an array of listener functions
    this.listeners = {};
  }

  /**
   * Adds a listener to the end of the
   * listener array for the given event.
   * @param { string } event - Event name.
   * @param { function } listener - Listener function.
   * @returns { MyEventEmitter } This instance for chaining calls.
   */
  on(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);

    return this;
  }

  /**
   * Adds a one-time listener for the event,
   * which is deleted after the first call.
   * @param { string } event - Event name.
   * @param { function } listener - Listener function.
   * @returns { MyEventEmitter } This instance for chaining calls.
   */
  once(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    const onceWrapper = (...args) => {
      this.off(event, onceWrapper);
      listener(...args);
    };

    return this.on(event, onceWrapper);
  }

  /**
   * Removes the specified listener from
   * the listener array for the specified event.
   * @param { string } event - Event name.
   * @param { function } listener - The listener function to delete.
   * @returns { MyEventEmitter } This instance for chaining calls.
   */
  off(event, listener) {
    if (!this.listeners[event]) {
      return this;
    }
    this.listeners[event] = this.listeners[event].filter((l) => l !== listener);

    if (this.listeners[event].length === 0) {
      delete this.listeners[event];
    }

    return this;
  }

  /**
   * Synchronously calls all listeners for a
   * given event in the order they are registered.
   * @param { string } event - Event name.
   * @param { ...* } args - Arguments passed to listeners.
   * @returns { boolean } true if at least one
   * listener is called, otherwise false.
   */
  emit(event, ...args) {
    if (!this.listeners[event]) {
      return false;
    }
    this.listeners[event].forEach((listener) => listener(...args));

    return true;
  }

  /**
   * Adds a listener to the beginning of
   * the listener array for the given event.
   * @param { string } event - Event name.
   * @param { function } listener - Listener function.
   * @returns { MyEventEmitter } This instance for chaining calls.
   */
  prependListener(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].unshift(listener);

    return this;
  }

  /**
   * Adds a one-time listener to the beginning
   * of the listener array for the given event.
   * @param { string } event - Event name.
   * @param { function } listener - Listener function.
   * @returns { MyEventEmitter } This instance for chaining calls.
   */
  prependOnceListener(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    const onceWrapper = (...args) => {
      this.off(event, onceWrapper);
      listener(...args);
    };

    return this.prependListener(event, onceWrapper);
  }

  /**
   * Removes all listeners for a given event or all events,
   * if the event is not specified.
   * @param { string } [event] - Event name (optional).
   * @returns { MyEventEmitter } This instance for chaining calls.
   */
  removeAllListeners(event) {
    if (event) {
      delete this.listeners[event];
    } else {
      this.listeners = {};
    }

    return this;
  }

  /**
   * Returns the number of listeners for the given event.
   * @param { string } event - Event name.
   * @returns { number } Number of listeners.
   */
  listenerCount(event) {
    return this.listeners[event] ? this.listeners[event].length : 0;
  }
}

module.exports = MyEventEmitter;
