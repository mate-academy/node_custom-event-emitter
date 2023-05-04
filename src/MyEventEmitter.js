'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  addEvent(name, callback, repeat, prepend) {
    if (!Object.hasOwnProperty.call(this.events, name)) {
      this.events[name] = [
        {
          repeat,
          callback,
        },
      ];

      return;
    }

    if (prepend) {
      this.events[name].unshift({
        repeat,
        callback,
      });
    } else {
      this.events[name].push({
        repeat,
        callback,
      });
    }
  }

  on(name, callback) {
    this.addEvent(name, callback, true, false);
  }

  once(name, callback) {
    this.addEvent(name, callback, false, false);
  }

  prependListener(name, callback) {
    this.addEvent(name, callback, true, true);
  }

  prependOnceListener(name, callback) {
    this.addEvent(name, callback, false, true);
  }

  off(name, listener) {
    if (!Object.hasOwnProperty.call(this.events, name)) {
      return;
    }

    const callbackIndex = this.events[name].findIndex(
      ({ callback }) => callback === listener
    );

    if (callbackIndex !== -1) {
      if (this.events[name].length === 1) {
        delete this.events[name];
      } else {
        this.events[name].splice(callbackIndex, 1);
      }
    }
  }

  emit(name, ...args) {
    if (!Object.hasOwnProperty.call(this.events, name)) {
      return;
    }

    const callbacks = this.events[name];

    callbacks.forEach(({ callback }) => {
      callback(args);
    });
    this.events[name] = callbacks.filter(({ repeat }) => repeat);
  }

  removeAllListeners(name) {
    delete this.events[name];
  }

  listenerCount(name) {
    if (Object.hasOwnProperty.call(this.events, name)) {
      return this.events[name].length;
    }

    return 0;
  }
}

module.exports = MyEventEmitter;
