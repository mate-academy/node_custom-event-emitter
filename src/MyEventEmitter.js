'use strict';

class MyEventEmitter {
  listeners = [];

  on(eventName, listener) {
    this.listeners.push([eventName, listener, false, this.listeners.length]);

    return this;
  }
  once(eventName, listener) {
    this.listeners.push([eventName, listener, true, this.listeners.length]);

    return this;
  }
  off(eventName, listener) {
    this.listeners.splice(
      this.listeners.findIndex(
        ([name, curListener]) =>
          name === eventName && curListener.toString() === listener.toString(),
      ),
      1,
    );

    return this;
  }
  emit(eventName, ...args) {
    const onceListeners = [];
    let foundListener = false;

    for (let i = 0; i < this.listeners.length; i++) {
      const [name, listener, isOnce, id] = this.listeners[i];

      if (name === eventName) {
        listener(...args);
        foundListener = true;

        if (isOnce) {
          onceListeners.push(id);
        }
      }
    }

    this.listeners = this.listeners.filter(
      ([, , , id]) => !onceListeners.includes(id),
    );

    return foundListener;
  }
  prependListener(eventName, listener) {
    this.listeners.unshift([eventName, listener, false, this.listeners.length]);

    return this;
  }
  prependOnceListener(eventName, listener) {
    this.listeners.unshift([eventName, listener, true, this.listeners.length]);

    return this;
  }
  removeAllListeners(eventName) {
    this.listeners = this.listeners.filter(([name]) => name !== eventName);

    return this;
  }
  listenerCount(eventName) {
    return this.listeners.filter(([name]) => name === eventName).length;
  }
}

module.exports = MyEventEmitter;
