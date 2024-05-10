'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  // once(eventName, listener) {
  //   if (!this.events[eventName]) {
  //     this.events[eventName] = [];
  //   }
  //   this.events[eventName].push({ cb: listener, onetime: true });
  // }

  once(event, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(event, onceWrapper); // Remove the wrapper after the first call
    };
    this.on(event, onceWrapper); // Use the 'on' method to add the wrapper
  }

  off(eventName, listener) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName] = this.events[eventName].filter(
      (list) => list !== listener,
    );
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return;
    }
    for (const listener of this.events[eventName]) {
      // const { cb, onetime } = listener;

      // if (onetime) {
      //   listener = null;
      // }
      listener(...args);
    }
  }

  prependListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].unshift(listener);
  }

  prependOnceListener(eventName, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(eventName, onceWrapper);
    };
    this.prependListener(eventName, onceWrapper);
  }

  removeAllListeners(eventName) {
    if (!eventName) {
      delete this.events[eventName];
    } else {
      this.events[eventName] = [];
    }
  }

  listenerCount(eventName) {
    if (!this.events[eventName]) {
      return 0;
    }

    return this.events[eventName].length;
  }
}

module.exports = MyEventEmitter;
