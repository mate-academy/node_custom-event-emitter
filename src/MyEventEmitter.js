'use strict';

class MyEventEmitter {
  #events = {};

  on(eName, cb) {
    if (!this.#events.hasOwnProperty(eName)) {
      this.#events[eName] = [{ cb, permanent: true }];
    } else {
      this.#events[eName].push({ cb, permanent: true });
    }
  }
  once(eName, cb) {
    if (!this.#events.hasOwnProperty(eName)) {
      this.#events[eName] = [{ cb, permanent: false }];
    } else {
      this.#events[eName].push({ cb, permanent: false });
    }
  }
  off(eName, cb) {
    if (!this.#events.hasOwnProperty(eName)) {
      return;
    }

    this.#events[eName] = this.#events[eName].filter((e) => e.cb !== cb);
  }
  emit(eName, ...args) {
    if (!this.#events.hasOwnProperty(eName)) {
      return;
    }

    const copy = [...this.#events[eName]];

    this.#events[eName] = this.#events[eName].filter((e) => e.permanent);
    copy.forEach((e) => e.cb(...args));
  }
  prependListener(eName, cb) {
    if (!this.#events.hasOwnProperty(eName)) {
      this.#events[eName] = [{ cb, permanent: true }];
    } else {
      this.#events[eName].unshift({ cb, permanent: true });
    }
  }
  prependOnceListener(eName, cb) {
    if (!this.#events.hasOwnProperty(eName)) {
      this.#events[eName] = [{ cb, permanent: false }];
    } else {
      this.#events[eName].unshift({ cb, permanent: false });
    }
  }
  removeAllListeners(eName) {
    if (eName) {
      this.#events[eName] = [];
    } else {
      this.#events = {};
    }
  }
  listenerCount(eName) {
    return this.#events[eName] ? this.#events[eName].length : 0;
  }
}

module.exports = MyEventEmitter;
