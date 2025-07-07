class MyEventEmitter {
  constructor() {
    this.listenersMap = {};
  }

  _addListener(event, listener, once, prepend) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    if (!this.listenersMap[event]) {
      this.listenersMap[event] = [];
    }

    const listenerObj = { listener, once };

    if (prepend) {
      this.listenersMap[event].unshift(listenerObj);
    } else {
      this.listenersMap[event].push(listenerObj);
    }
  }

  on(event, listener) {
    this._addListener(event, listener, false, false);
  }

  once(event, listener) {
    this._addListener(event, listener, true, false);
  }

  prependListener(event, listener) {
    this._addListener(event, listener, false, true);
  }

  prependOnceListener(event, listener) {
    this._addListener(event, listener, true, true);
  }

  emit(event, ...args) {
    const listeners = this.listenersMap[event];

    if (!listeners || listeners.length === 0) {
      return false;
    }

    for (const listenerObj of [...listeners]) {
      listenerObj.listener(...args);

      if (listenerObj.once) {
        this.off(event, listenerObj.listener);
      }
    }

    return true;
  }

  off(event, listener) {
    const listeners = this.listenersMap[event];

    if (!listeners) {
      return;
    }

    this.listenersMap[event] = listeners.filter((l) => l.listener !== listener);
  }

  removeAllListeners(event) {
    if (event) {
      delete this.listenersMap[event];
    } else {
      this.listenersMap = {};
    }
  }

  listenerCount(event) {
    return this.listenersMap[event]?.length || 0;
  }
}

module.exports = MyEventEmitter;
