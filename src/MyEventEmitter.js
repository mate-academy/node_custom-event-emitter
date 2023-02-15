export class MyEventEmitter {
  constructor() {
    this._events = {};
  }

  on(name, listener) {
    if (!this._events[name]) {
      this._events[name] = [];
    }

    this._events[name].push(listener);
  }

  once(name, listener) {
    const onceListener = (...args) => {
      listener(...args);
      this.off(name, onceListener);
    };

    this.on(name, onceListener);
  }

  off(name, listener) {
    if (this._events[name]) {
      this._events[name] = this._events[name].filter((fn) => fn !== listener);
    }
  }

  emit(name, ...args) {
    if (this._events[name]) {
      this._events[name].forEach((fn) => fn(...args));
    }
  }

  prependListener(name, listener) {
    if (!this._events[name]) {
      this._events[name] = [];
    }

    this._events[name].unshift(listener);
  }

  prependOnceListener(name, listener) {
    const onceListener = (...args) => {
      listener(...args);
      this.off(name, onceListener);
    };

    this.prependListener(name, onceListener);
  }

  removeAllListeners([names]) {
    if (names) {
      names.forEach((name) => delete this._events[name]);
    } else {
      this._events = {};
    }
  }

  listenerCount(name) {
    return this._events[name] ? this._events[name].length : 0;
  }
}

