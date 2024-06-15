'use strict';

class MyEventEmitter {
  listeners = {};
  addListener(name, cb, type = 'all', atStart = false) {
    if (name in this.listeners) {
      this.listeners[name][atStart ? 'unshift' : 'push']({
        cb,
        type,
      });
    } else {
      this.listeners[name] = [
        {
          cb,
          type,
        },
      ];
    }
  }
  removeListener(name, cb = -1) {
    if (cb === -1) {
      delete this.listeners[name];
    } else if (name in this.listeners) {
      const targetI = this.listeners[name].findIndex(
        (listener) => listener.cb === cb,
      );

      if (targetI !== -1) {
        this.listeners[name] = [...this.listeners[name]].filter(
          (_, i) => i !== targetI,
        );
      }
    }
  }
  on(name, cb) {
    this.addListener(name, cb);
  }
  once(name, cb) {
    this.addListener(name, cb, 'once');
  }
  off(name, cb) {
    this.removeListener(name, cb);
  }
  emit(name, ...args) {
    if (name in this.listeners) {
      this.listeners[name].forEach((listener) => {
        listener.cb(...args);
      });

      this.listeners[name] = this.listeners[name].filter(
        (listener) => listener.type !== 'once',
      );
    }
  }
  prependListener(name, cb) {
    this.addListener(name, cb, undefined, true);
  }
  prependOnceListener(name, cb) {
    this.addListener(name, cb, 'once', true);
  }
  removeAllListeners(name) {
    this.removeListener(name);
  }
  listenerCount(name) {
    if (name in this.listeners) {
      return this.listeners[name].length;
    }

    return 0;
  }
}

module.exports = MyEventEmitter;
