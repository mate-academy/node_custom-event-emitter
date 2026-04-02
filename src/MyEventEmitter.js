'use strict';

class MyEventEmitter {
  events = {};

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [{ fn: listener, once: false }];
    } else {
      this.events[event].push({ fn: listener, once: false });
    }

    return this;
  }

  once(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [{ fn: listener, once: true }];
    } else {
      this.events[event].push({ fn: listener, once: true });
    }

    return this;
  }

  off(event, listener) {
    if (!this.events[event]) {
      return;
    }

    this.events[event] = this.events[event].filter(
      (item) => item.fn !== listener,
    );

    if (this.events[event].length === 0) {
      delete this.events[event];
    }

    return this;
  }

  emit(event, ...args) {
    const listeners = (this.events[event] || []).slice();

    if (listeners.length === 0) {
      return;
    }

    for (const listener of listeners) {
      listener.fn(...args);

      if (this.events[event] && listener.once) {
        this.events[event] = this.events[event].filter(
          (item) => item !== listener,
        );
      }

      if (this.events[event] && this.events[event].length === 0) {
        delete this.events[event];
      }
    }
  }

  prependListener(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [{ fn: listener, once: false }];
    } else {
      this.events[event].unshift({ fn: listener, once: false });
    }

    return this;
  }

  prependOnceListener(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [{ fn: listener, once: true }];
    } else {
      this.events[event].unshift({ fn: listener, once: true });
    }

    return this;
  }

  removeAllListeners(event) {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {};
    }

    return this;
  }

  listenerCount(event) {
    return (this.events[event] || []).length;
  }
}

module.exports = MyEventEmitter;
