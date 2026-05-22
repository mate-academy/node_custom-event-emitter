'use strict';

class MyEventEmitter {
  constructor() {
    this._events = {};
  }

  // ─── Private Helpers ──────────────────────────────────────────────────────

  /**
   * Returns the listener array for an event, or an empty array if none exist.
   */
  _getListeners(event) {
    return this._events[event] ?? [];
  }

  /**
   * Wraps a listener in a one-time-use function.
   * Stores a reference to the original so `off` can match against it.
   */
  _wrapOnce(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };

    wrapper._original = listener;

    return wrapper;
  }

  /**
   * Guards that every listener supplied is actually a function.
   */
  _assertFunction(listener, event) {
    if (typeof listener !== 'function') {
      throw new TypeError(`Listener for "${event}" must be a function`);
    }
  }

  // ─── Core API ─────────────────────────────────────────────────────────────

  on(event, listener) {
    this._assertFunction(listener, event);
    (this._events[event] ??= []).push(listener);

    return this;
  }

  prependListener(event, listener) {
    this._assertFunction(listener, event);
    (this._events[event] ??= []).unshift(listener);

    return this;
  }

  once(event, listener) {
    this._assertFunction(listener, event);

    return this.on(event, this._wrapOnce(event, listener));
  }

  prependOnceListener(event, listener) {
    this._assertFunction(listener, event);

    return this.prependListener(event, this._wrapOnce(event, listener));
  }

  off(event, listener) {
    if (!this._events[event]) {
      return this;
    }

    let removed = false;

    this._events[event] = this._events[event].filter((fn) => {
      if (!removed && (fn === listener || fn._original === listener)) {
        removed = true;

        return false; // drop only the first match
      }

      return true;
    });

    if (this._events[event].length === 0) {
      delete this._events[event];
    }

    return this;
  }

  emit(event, ...args) {
    const listeners = this._getListeners(event);

    if (listeners.length === 0) {
      return false;
    }

    // Snapshot the array so mutations during iteration (e.g. `once` removal)
    // do not affect the current emission.
    [...listeners].forEach((fn) => fn(...args));

    return true;
  }

  removeAllListeners(event) {
    if (event === undefined) {
      this._events = {};
    } else {
      delete this._events[event];
    }

    return this;
  }

  listenerCount(event) {
    return this._getListeners(event).length;
  }
}

module.exports = MyEventEmitter;
