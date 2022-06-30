
export class MyEventEmitter {
  constructor() {
    this._events = {};
  }

  on(name, listener) {
    if (typeof listener !== 'function') {
      throw new Error('Listener must be a function!');
    }

    this._events[name] = this._events[name] || [];

    this._events[name].push(listener);

    return this;
  }

  off(name, listenerToRemve) {
    if (!this._events[name]) {
      const text = `Can't remove a listener. Event "${name}" doesn't exits.`;

      throw new Error(text);
    }

    const filterListeners = (listener) => listener !== listenerToRemve;

    this._events[name] = this._events[name].filter(filterListeners);

    return this;
  }

  emit(name, ...args) {
    if (!this._events[name]) {
      return false;
    }

    const callCallbacks = (callback) => callback(...args);

    this._events[name].forEach(callCallbacks);

    return true;
  }

  listenerCount(name) {
    const listeners = this.events[name] || [];

    return listeners.length;
  }

  removeAllListeners(name) {
    if (name) {
      this._events[name] = [];
    } else {
      this._events = {};
    }

    return this;
  }

  once(name, listener) {
    this._events[name] = this._events[name] || [];

    const oneCallWrap = (...args) => {
      listener(...args);
      this.off(name, oneCallWrap);
    };

    this._events[name].push(oneCallWrap);

    return this;
  }

  prependOnceListener(name, listener) {
    this._events[name] = this._events[name] || [];

    const oneCallWrap = (...args) => {
      listener(...args);
      this.off(name, oneCallWrap);
    };

    this._events[name].unsift(oneCallWrap);

    return this;
  }

  prependListener(name, listener) {
    if (typeof listener !== 'function') {
      throw new Error('Listener must be a function!');
    }

    this._events[name] = this._events[name] || [];

    this._events[name].unsift(listener);

    return this;
  }
}
