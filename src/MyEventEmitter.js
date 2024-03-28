'use strict';

class MyEventEmitter {
  events = {};

  on(event, listener) {
    this.events[event] = this.events[event]
      ? [...this.events[event], listener]
      : [listener];
  }

  once(event, listener) {
    const isCalled = false;
    const cb = this.getListenerCb(isCalled, listener, event);

    this.on(event, cb);
  }

  off(event, listener) {
    this.events[event] = this.events[event].filter(
      (eventListener) => eventListener !== listener,
    );
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach((listener) => {
        listener(...args);
      });
    }
  }

  prependListener(event, listener) {
    this.events[event] = this.events[event]
      ? [listener, ...this.events[event]]
      : [listener];
  }

  prependOnceListener(event, listener) {
    const isCalled = false;
    const cb = this.getListenerCb(isCalled, listener, event);

    this.prependListener(event, cb);
  }

  removeAllListeners(event) {
    if (!event) {
      this.events = {};
    } else {
      this.events[event] = [];
    }
  }

  listenerCount(event) {
    if (!this.events[event]) {
      return 0;
    }

    return this.events[event].length;
  }

  getListenerCb(called, listener, event) {
    let isCalled = called;
    const cb = (...args) => {
      if (!isCalled) {
        isCalled = true;
        listener(...args);

        this.off(event, cb);
      }
    };

    return cb;
  }
}

module.exports = MyEventEmitter;
