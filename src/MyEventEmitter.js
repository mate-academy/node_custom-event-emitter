'use strict';

class MyEventEmitter {
  queue = {};

  on(eventName, handler) {
    if (eventName && handler && typeof handler === 'function') {
      if (!Array.isArray(this.queue[eventName])) {
        this.queue[eventName] = [];
      }

      this.queue[eventName].push(handler);
    }
  }

  once(eventName, handler) {
    if (eventName && handler && typeof handler === 'function') {
      if (!Array.isArray(this.queue[eventName])) {
        this.queue[eventName] = [];
      }

      const wrapper = (...args) => {
        this.off(eventName, wrapper);
        handler(...args);
      };

      this.queue[eventName].push(wrapper);
      wrapper.listener = handler;
    }
  }

  off(eventName, handler) {
    if (
      eventName &&
      handler &&
      this.queue[eventName] &&
      this.queue[eventName].length
    ) {
      const index = this.queue[eventName].findIndex(
        (item) => item === handler || item.listener === handler,
      );

      if (~index) {
        this.queue[eventName].splice(index, 1);
      }
    }
  }

  emit(eventName, ...args) {
    if (eventName && this.queue[eventName] && this.queue[eventName].length) {
      const handlers = [...this.queue[eventName]];

      handlers.forEach((handler) => handler(...args));
    }
  }

  prependListener(eventName, handler) {
    if (eventName && handler && typeof handler === 'function') {
      if (!Array.isArray(this.queue[eventName])) {
        this.queue[eventName] = [];
      }

      this.queue[eventName].unshift(handler);
    }
  }

  prependOnceListener(eventName, handler) {
    if (eventName && handler && typeof handler === 'function') {
      if (!Array.isArray(this.queue[eventName])) {
        this.queue[eventName] = [];
      }

      const wrapper = (...args) => {
        this.off(eventName, wrapper);
        handler(...args);
      };

      this.queue[eventName].unshift(wrapper);
      wrapper.listener = handler;
    }
  }

  removeAllListeners(eventName) {
    if (!eventName) {
      this.queue = {};
    }

    if (eventName && this.queue[eventName] && this.queue[eventName].length) {
      delete this.queue[eventName];
    }
  }

  listenerCount(eventName) {
    if (eventName && this.queue[eventName]) {
      return this.queue[eventName].length;
    }

    return 0;
  }
}

module.exports = MyEventEmitter;
