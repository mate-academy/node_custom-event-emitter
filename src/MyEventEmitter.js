'use strict';

class MyEventEmitter {
  constructor() {
    // Store events in a Map: event name -> array of listeners
    this.events = new Map();
  }

  /**
   * Adds a listener to the end of the listeners array for the specified event
   */
  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);

    return this;
  }

  /**
   * Adds a one-time listener for the event
   */
  once(event, listener) {
    // Wrapper that removes itself after being called
    const onceWrapper = (...args) => {
      this.off(event, onceWrapper);
      listener.apply(this, args);
    };
    // Staore reference to original listener for removal via off()

    onceWrapper.listener = listener;
    this.on(event, onceWrapper);

    return this;
  }

  /**
   * Removes the specified listener from the listener array
   */
  off(event, listener) {
    if (!this.events.has(event)) {
      return this;
    }

    const listeners = this.events.get(event);
    // Find listener, checking both direct match and wrapped once listaners
    const index = listeners.findIndex(
      (lisn) => lisn === listener || lisn.listener === listener,
    );

    if (index !== -1) {
      listeners.splice(index, 1);
    }

    // Clean up empty event arrays
    if (listeners.length === 0) {
      this.events.delete(event);
    }

    return this;
  }

  /**
   * Synchronously calls each listener registered for the event
   */
  emit(event, ...args) {
    if (!this.events.has(event)) {
      return false;
    }

    // Create a coppy to avoid issues
    // if listeners modify the array during iteration
    const listeners = this.events.get(event).slice();

    listeners.forEach((listener) => {
      listener.apply(this, args);
    });

    return true;
  }

  /**
   * Adds a listener to the beginning of the listeners array
   */
  prependListener(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }

    this.events.get(event).unshift(listener);

    return this;
  }

  /**
   * Adds a one-time listener to the beginning of the listeners array
   */
  prependOnceListener(event, listener) {
    const onceWrapper = (...args) => {
      this.off(event, onceWrapper);
      listener.apply(this, args);
    };

    onceWrapper.listener = listener;
    this.prependListener(event, onceWrapper);

    return this;
  }

  /**
   * Removes all listeners for a specific event,
   *  or all events if no event specified
   */
  removeAllListeners(event) {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }

    return this;
  }

  /**
   * Returns the number of listeners for a given event
   */
  listenerCount(event) {
    return this.events.has(event) ? this.events.get(event).length : 0;
  }
}

module.exports = MyEventEmitter;
