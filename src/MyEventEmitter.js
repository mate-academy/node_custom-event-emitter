'use strict';

class Listener {
  constructor(func, once = false) {
    this.func = func;
    this.isOnce = once;
  }
}

class MyEventEmitter {
  events = {}; // {'error': [Listener, Listener]}

  on(event, func) {
    if (Array.isArray(this.events[event])) {
      this.events[event].push(new Listener(func));
    } else {
      this.events[event] = [new Listener(func)];
    }
  }

  once(event, func) {
    if (Array.isArray(this.events[event])) {
      this.events[event].push(new Listener(func, true));
    } else {
      this.events[event] = [new Listener(func, true)];
    }
  }

  off(event, funcToRemove) {
    if (Array.isArray(this.events[event])) {
      this.events[event] = this.events[event].filter(
        (listener) => listener.func !== funcToRemove,
      );
    }
  }

  emit(event, ...args) {
    if (Array.isArray(this.events[event])) {
      [...this.events[event]].forEach((listener) => {
        listener.func.call(this, ...args);

        if (listener.isOnce) {
          this.off(event, listener.func);
        }
      });
    }
  }

  prependListener(event, func) {
    if (Array.isArray(this.events[event])) {
      this.events[event].unshift(new Listener(func));
    } else {
      this.events[event] = [new Listener(func)];
    }
  }

  prependOnceListener(event, func) {
    if (Array.isArray(this.events[event])) {
      this.events[event].unshift(new Listener(func, true));
    } else {
      this.events[event] = [new Listener(func, true)];
    }
  }

  removeAllListeners(event) {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {};
    }
  }

  listenerCount(event) {
    if (Array.isArray(this.events[event])) {
      return this.events[event].length;
    }

    return 0;
  }
}

module.exports = MyEventEmitter;
