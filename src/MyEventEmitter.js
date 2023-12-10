'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  static onceWrapper(eventName, listener, offMethod) {
    const wrappedListener = (...args) => {
      listener(...args);
      offMethod(eventName, wrappedListener);
    };

    return wrappedListener;
  }

  on(eventName, listener) {
    const existingListeners = this.listeners.get(eventName) || [];

    existingListeners.push(listener);
    this.listeners.set(eventName, existingListeners);
  }

  once(eventName, listener) {
    const wrapper = MyEventEmitter.onceWrapper(
      eventName,
      listener,
      this.off.bind(this) // Передаємо метод off як параметр
    );

    this.on(eventName, wrapper);
  }

  off(eventName, listener) {
    const existingListeners = this.listeners.get(eventName);

    if (existingListeners) {
      const index = existingListeners.indexOf(listener);

      if (index !== -1) {
        existingListeners.splice(index, 1);
      }
    }
  }

  emit(eventName, ...args) {
    const existingListeners = this.listeners.get(eventName);

    if (existingListeners) {
      existingListeners.forEach((listener) => {
        listener(...args);
      });
    }
  }

  prependListener(eventName, listener) {
    this.listeners.set(eventName, [
      listener,
      ...(this.listeners.get(eventName) || []),
    ]);
  }

  prependOnceListener(eventName, listener) {
    this.prependListener(
      eventName,
      MyEventEmitter.onceWrapper(
        eventName,
        listener,
        this.off.bind(this)
      )
    );
  }

  removeAllListeners(...eventName) {
    if (!eventName.length) {
      this.listeners.clear();
    } else {
      for (const name of eventName) {
        this.listeners.delete(name);
      }
    }
  }

  listenerCount(eventName) {
    return this.listeners.get(eventName).length || 0;
  }
}

module.exports = { MyEventEmitter };
