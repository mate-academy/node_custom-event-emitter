class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    const listeners = this.events[eventName];

    if (listeners) {
      listeners.push(callback);
    } else {
      this.events[eventName] = [callback];
    }

    return this;
  }
  once(eventName, callback) {
    const listeners = this.events[eventName];

    const onceCallback = () => {
      callback();
      this.off(eventName, onceCallback);
    };

    if (listeners) {
      listeners.push(onceCallback);
    } else {
      this.events[eventName] = [onceCallback];
    }

    return this;
  }
  off(eventName, callback) {
    const listenerIndex = this.events[eventName].indexOf(callback);

    if (listenerIndex >= 0) {
      this.events[eventName].splice(listenerIndex, 1);
    }

    return this;
  }
  emit(eventName, ...args) {
    const listeners = this.events[eventName];

    if (listeners) {
      listeners.forEach((listener) => listener(...args));
    }

    return this;
  }
  prependListener(eventName, callback) {
    const listeners = this.events[eventName];

    if (listeners) {
      listeners.unshift(callback);
    } else {
      this.events[eventName] = [callback];
    }

    return this;
  }
  prependOnceListener(eventName, callback) {
    const listeners = this.events[eventName];

    const onceCallback = () => {
      callback();
      this.off(eventName, onceCallback);
    };

    if (listeners) {
      listeners.unshift(onceCallback);
    } else {
      this.events[eventName] = [onceCallback];
    }

    return this;
  }
  removeAllListeners(eventName) {
    delete this.events[eventName];

    return this;
  }
  listenerCount(eventName) {
    return this.events[eventName].length;
  }
}

module.exports = {
  MyEventEmitter,
};
