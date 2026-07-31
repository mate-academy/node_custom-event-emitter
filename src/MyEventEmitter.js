'use strict';

class MyEventEmitter {
  listeners = [];

  on(event, callback) {
    this.listeners.push({ event, callback });
  }

  once(event, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.listeners = this.listeners.filter((e) => e.callback !== wrapper);
    };

    wrapper.originalCallback = callback;

    this.listeners.push({ event, callback: wrapper });
  }

  off(event, callback) {
    this.listeners = this.listeners.filter((e) => {
      if (e.event !== event) {
        return true;
      }

      const isTargetCallback =
        e.callback === callback || e.callback.originalCallback === callback;

      return !isTargetCallback;
    });
  }

  emit(event, ...args) {
    const listeners = this.listeners.filter((e) => e.event === event);

    if (listeners.length === 0) {
      return false;
    }

    listeners.forEach((e) => {
      e.callback(...args);
    });

    return true;
  }

  prependListener(event, callback) {
    this.listeners.unshift({ event, callback });
  }

  prependOnceListener(event, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.listeners = this.listeners.filter((e) => e.callback !== wrapper);
    };

    this.listeners.unshift({ event, callback: wrapper });
  }

  removeAllListeners(event) {
    if (!event) {
      this.listeners = [];
    } else {
      this.listeners = this.listeners.filter((e) => e.event !== event);
    }
  }

  listenerCount(event) {
    return this.listeners.filter((e) => e.event === event).length;
  }
}

module.exports = MyEventEmitter;
