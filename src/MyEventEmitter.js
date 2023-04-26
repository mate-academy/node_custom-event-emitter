'use strict';

const { validateEventName, validateCallback } = require("./decorators");

class MyEventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  #getOneTimeCallback(event, listener) {
    const oneTimeCallback = (...args) => {
      listener(...args);

      this.off(event, oneTimeCallback);
    };

    return oneTimeCallback;
  }

  @validateEventName
  @validateCallback
  on(event, listener) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).push(listener);
    } else {
      this.listeners.set(event, [listener]);
    }

    return this;
  }

  @validateEventName
  @validateCallback
  once(event, listener) {
    this.on(
      event,
      this.#getOneTimeCallback(event, listener)
    );

    return this;
  }

  @validateEventName
  @validateCallback
  off(event, listener) {
    this.listeners.set(event, this.listeners.get(event).filter(
      (cb) => cb !== listener
    ));

    return this;
  }

  @validateEventName
  emit(event, ...args) {
    if (this.listeners.get(event)) {
      this.listeners.get(event).forEach((listener) => {
        listener(...args);
      });
    }

    return this;
  }

  @validateEventName
  @validateCallback
  prependListener(event, listener) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).unshift(listener);
    } else {
      this.listeners.set(event, [listener]);
    }

    return this;
  }

  @validateEventName
  @validateCallback
  prependOnceListener(event, listener) {
    this.prependListener(
      event,
      this.#getOneTimeCallback(event, listener)
    );

    return this;
  }

  @validateEventName
  removeAllListeners(event) {
    this.listeners.delete(event);
  }

  @validateEventName
  listenerCount(event) {
    return this.listeners.get(event).length || 0;
  }
}
