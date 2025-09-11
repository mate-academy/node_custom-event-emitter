'use strict';

class MyEventEmitter {
  listeners = [];
  nextId = 0;

  on(eventName, listener) {
    this.listeners.push([eventName, listener, false, this.nextId++]);

    return this;
  }
  once(eventName, listener) {
    this.listeners.push([eventName, listener, true, this.nextId++]);

    return this;
  }
  off(eventName, listener) {
    const index = this.listeners.findIndex(
      ([name, curListener]) => name === eventName && curListener === listener,
    );

    if (index >= 0) {
      this.listeners.splice(index, 1);
    }

    return this;
  }
  emit(eventName, ...args) {
    const snapshot = this.listeners.slice();
    const onceListeners = [];
    let foundListener = false;

    for (let i = 0; i < snapshot.length; i++) {
      const [name, listener, isOnce, id] = snapshot[i];

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
    this.listeners.unshift([eventName, listener, false, this.nextId++]);

    return this;
  }
  prependOnceListener(eventName, listener) {
    this.listeners.unshift([eventName, listener, true, this.nextId++]);

    return this;
  }
  removeAllListeners(eventName) {
    if (eventName) {
      this.listeners = this.listeners.filter(([name]) => name !== eventName);
    } else {
      this.listeners = [];
    }

    return this;
  }
  listenerCount(eventName) {
    return this.listeners.filter(([name]) => name === eventName).length;
  }
}

module.exports = MyEventEmitter;
