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

  once(eventName, listener) {
    const onceWrapper = (...args) => {
      listener.apply(this, args);
      this.off(eventName, onceWrapper);
    };

    this.on(eventName, onceWrapper);
  }

  off(eventName, listener) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName] = this.events[eventName].filter(
      (eventListener) => eventListener !== listener,
    );
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName].forEach((listener) => {
      listener.apply(this, args);
    });
  }

  prependListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(listener);
  }
  prependOnceListener(eventName, listener) {
    const onceWrapper = (...args) => {
      listener.apply(this, args);
      this.off(eventName, onceWrapper);
    };

    this.prependListener(eventName, onceWrapper);
  }
  removeAllListeners(eventName) {
    if (eventName === undefined) {
      this.events = {};
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
