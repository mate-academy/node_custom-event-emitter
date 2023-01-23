export class MyEventEmitter {
  constructor() {
    this._listeners = {};
  }
  _checkEventName(eventName) {
    if (!eventName) {
      throw new Error('Event name must be defined!');
    }

    if (typeof eventName !== 'string') {
      throw new Error('Event name must be a string!');
    }
  }

  _checkEventListener(listener) {
    if (!listener) {
      throw new Error('Event handler must be defined!');
    }

    if (typeof listener !== 'function') {
      throw new Error('Event handler must be a function!');
    }
  }
  on(name, func) {
    this._checkEventName(name);
    this._checkEventListener(func);

    if (!this._listeners[name]) {
      this._listeners[name] = [];
    }

    this._listeners[name].push(func);

    return this;
  }
  once(name, func) {
    this._checkEventName(name);
    this._checkEventListener(func);

    if (!this._listeners[name]) {
      this._listeners[name] = [];
    }

    const onceWrapper = (...args) => {
      func(...args);
      this.off(name, onceWrapper);
    };

    this._listeners[name].push(onceWrapper);

    return this;
  }
  off(name, func) {
    this._checkEventName(name);
    this._checkEventListener(func);

    if (!this._listeners[name]) {
      return this;
    }

    this._listeners[name] = this._listeners[name]
      .filter(listener => listener !== func);

    if (!this._listeners[name].length) {
      delete this._listeners[name];
    }

    return this;
  }
  emit(name, ...args) {
    this._checkEventName(name);

    const listeners = this._listeners[name];

    if (!listeners) {
      return false;
    }

    for (const listener of listeners) {
      listener(...args);
    }

    return true;
  }
  prependListener(name, func) {
    this._checkEventName(name);
    this._checkEventListener(func);

    if (!this._listeners[name]) {
      this._listeners[name] = [];
    }

    this._listeners[name].unshift(func);

    return this;
  }
  prependOnceListener(name, func) {
    this._checkEventName(name);
    this._checkEventListener(func);

    if (!this._listeners[name]) {
      this._listeners[name] = [];
    }

    const onceWrapper = (...args) => {
      func(...args);
      this.off(name, onceWrapper);
    };

    this._listeners[name].unshift(onceWrapper);

    return this;
  }
  removeAllListeners(name) {
    if (!name) {
      this._listeners = {};

      return this;
    }

    this._checkEventName(name);

    if (!this._listeners[name]) {
      return this;
    }

    delete this._listeners[name];

    return this;
  }
  listenerCount(name) {
    this._checkEventName(name);

    const listener = this._listeners[name] || [];

    return listener.length;
  }
}
