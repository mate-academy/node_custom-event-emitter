'use strict';
class MyEventEmitter {
  #eventsMap = new Map();

  #addListener(add, eventName, listener, once = false) {
    const eventsMap = this.#eventsMap;
    const listenerItem = new ListenerItem(listener, once);

    if (eventsMap.has(eventName)) {
      eventsMap.get(eventName)[add](listenerItem);
    } else {
      eventsMap.set(eventName, [listenerItem]);
    }
  }

  #countListeners(eventName) {
    return this.#eventsMap.get(eventName)?.length ?? 0;
  }

  #countSpecificListeners(eventName, listener) {
    const listeners = this.#eventsMap.get(eventName);

    return listeners?.filter(cb => cb === listener).length ?? 0;
  }

  on(eventName, listener) {
    this.#addListener('push', eventName, listener);

    return this;
  }

  once(eventName, listener) {
    this.#addListener('push', eventName, listener, true);

    return this;
  }

  off(eventName, listenerToOff) {
    const firstListenerToOff = ({ listener }) => listener === listenerToOff;
    const listeners = this.#eventsMap.get(eventName);
    const listenerIndex = listeners?.findIndex(firstListenerToOff);

    if (listeners && listenerIndex !== -1) {
      listeners.splice(listenerIndex, 1);
    }

    return this;
  }

  emit(eventName, ...args) {
    const listenerItems = this.#eventsMap.get(eventName);

    if (!listenerItems) {
      return false;
    }

    listenerItems.forEach(({ listener }) => listener(...args));
    this.#eventsMap.set(eventName, listenerItems.filter(({ once }) => !once));

    return true;
  }

  prependListener(eventName, listener) {
    this.#addListener('unshift', eventName, listener);

    return this;
  }

  prependOnceListener(eventName, listener) {
    this.#addListener('unshift', eventName, listener, true);

    return this;
  }

  removeAllListeners(eventName) {
    this.#eventsMap.delete(eventName);

    return this;
  }

  listenerCount(eventName, listener) {
    if (listener) {
      return this.#countSpecificListeners(eventName, listener);
    }

    return this.#countListeners(eventName);
  }
}

class ListenerItem {
  constructor(listener, once) {
    this.listener = listener;
    this.once = once;
  }
}

module.exports = MyEventEmitter;
