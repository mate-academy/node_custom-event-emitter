'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  addEvent(eventName, listener, once = false, prepend = false) {
    const wrappedListener = { listener, once };

    if (!this.events[eventName]) {
      this.events[eventName] = [wrappedListener];
    } else if (!prepend) {
      this.events[eventName].push(wrappedListener);
    } else {
      this.events[eventName].unshift(wrappedListener);
    }
  }

  on(eventName, listener) {
    this.addEvent(eventName, listener);

    return this;
  }

  once(eventName, listener) {
    this.addEvent(eventName, listener, true);

    return this;
  }

  off(eventName, listener) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName] = this.events[eventName].filter(
      (wrappedListener) => wrappedListener.listener !== listener,
    );

    return this;
  }

  emit(eventName, ...arg) {
    if (!this.events.hasOwnProperty(eventName)) {
      return false;
    }

    const listeners = [...this.events[eventName]];

    for (const { listener, once } of listeners) {
      listener(...arg);

      if (once) {
        this.off(eventName, listener);
      }
    }

    return true;
  }

  prependListener(eventName, listener) {
    this.addEvent(eventName, listener, false, true);

    return this;
  }

  prependOnceListener(eventName, listener) {
    this.addEvent(eventName, listener, true, true);

    return this;
  }

  removeAllListeners(eventName) {
    const listeners = [...this.events[eventName]];

    for (const { listener } of listeners) {
      this.off(eventName, listener);
    }

    return this;
  }

  listenerCount(eventName) {
    if (!this.events.hasOwnProperty(eventName)) {
      return 0;
    }

    return this.events[eventName].length;
  }
}

module.exports = MyEventEmitter;
