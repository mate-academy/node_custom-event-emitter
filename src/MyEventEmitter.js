'use strict';

class MyEventEmitter {
  listeners = [];
  #nextId = 0;

  #validateEventName(eventName) {
    if (typeof eventName !== 'string' && typeof eventName !== 'symbol') {
      throw new TypeError('eventName must be a string or a symbol');
    }
  }

  #validateListener(listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('listener must be a function');
    }
  }

  on(eventName, listener) {
    this.#validateEventName(eventName);
    this.#validateListener(listener);

    this.listeners.push([eventName, listener, false, this.#nextId++]);

    return this;
  }
  once(eventName, listener) {
    this.#validateEventName(eventName);
    this.#validateListener(listener);

    this.listeners.push([eventName, listener, true, this.#nextId++]);

    return this;
  }
  off(eventName, listener) {
    this.#validateEventName(eventName);
    this.#validateListener(listener);

    const index = this.listeners.findIndex(
      ([name, curListener]) => name === eventName && curListener === listener,
    );

    if (index >= 0) {
      this.listeners.splice(index, 1);
    }

    return this;
  }
  emit(eventName, ...args) {
    this.#validateEventName(eventName);

    const snapshot = this.listeners.slice();
    const onceListeners = [];
    let foundListener = false;

    for (let i = 0; i < snapshot.length; i++) {
      const [name, listener, isOnce, id] = snapshot[i];

      if (
        name === eventName &&
        Boolean(this.listeners.find(([, , , curId]) => curId === id))
      ) {
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
    this.#validateEventName(eventName);
    this.#validateListener(listener);

    this.listeners.unshift([eventName, listener, false, this.#nextId++]);

    return this;
  }
  prependOnceListener(eventName, listener) {
    this.#validateEventName(eventName);
    this.#validateListener(listener);

    this.listeners.unshift([eventName, listener, true, this.#nextId++]);

    return this;
  }
  removeAllListeners(eventName) {
    if (eventName === undefined) {
      this.listeners = [];
    } else {
      this.listeners = this.listeners.filter(([name]) => name !== eventName);
    }

    return this;
  }
  listenerCount(eventName) {
    this.#validateEventName(eventName);

    return this.listeners.filter(([name]) => name === eventName).length;
  }
}

module.exports = MyEventEmitter;
