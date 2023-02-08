'use strict';

class Listener {
  eventName;
  callback;
  once;

  constructor(
    eventName,
    callback,
    once = false,
  ) {
    this.eventName = eventName;
    this.callback = callback;
    this.once = once;
  }
}

export class MyEventEmitter {
  listenersMap = new Map();

  on(eventName, callback) {
    this.addListener({ eventName, callback });

    return this;
  }

  once(eventName, callback) {
    this.addListener({
      eventName,
      callback,
      once: true,
    });

    return this;
  }

  prependListener(eventName, callback) {
    this.addListener({
      eventName,
      callback,
      prepend: true,
    });

    return this;
  }

  prependOnceListener(eventName, callback) {
    this.addListener({
      eventName,
      callback,
      prepend: true,
      once: true,
    });

    return this;
  }

  addListener({
    eventName,
    callback,
    prepend = false,
    once = false,
  }) {
    const newListener = new Listener(eventName, callback, once);

    const eventListeners = this.listenersMap.get(eventName);

    if (eventListeners) {
      if (prepend) {
        eventListeners.unshift(newListener);
      } else {
        eventListeners.push(newListener);
      }
    } else {
      this.listenersMap.set(eventName, [newListener]);
    }
  }

  emit(eventName, ...args) {
    const eventListeners = this.listenersMap.get(eventName);

    if (eventListeners) {
      const listenersToDelete = [];

      eventListeners.forEach((listener) => {
        const { once, callback } = listener;

        if (once) {
          listenersToDelete.push(listener);
        }

        callback(...args);
      });

      this.cleanupEventListeners({ eventName, listenersToDelete });

      return true;
    }

    return false;
  }

  cleanupEventListeners({
    eventName,
    listenersToDelete,
  }) {
    const eventListeners = this.listenersMap.get(eventName);

    if (eventListeners) {
      const listenersToKeep = eventListeners
        .filter(listener => !listenersToDelete.includes(listener));

      if (listenersToKeep.length) {
        this.listenersMap.set(eventName, listenersToKeep);
      } else {
        this.listenersMap.delete(eventName);
      }
    }
  }

  off(eventName, callback) {
    const eventListeners = this.listenersMap.get(eventName);

    if (eventListeners) {
      const listenerToDelete = [...eventListeners]
        .reverse()
        .find((listener) => callback === listener.callback);

      if (listenerToDelete) {
        setTimeout(this.cleanupEventListeners, 0, {
          eventName,
          listenersToDelete: [listenerToDelete],
        });
      }
    }

    return this;
  }

  removeAllListeners(eventName) {
    this.listenersMap.delete(eventName);

    return this;
  }

  listenerCount(eventName) {
    return this.listenersMap.get(eventName)?.length || 0;
  }
}
