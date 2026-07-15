'use strict';

class MyEventEmitter {
  #prependEvents = {};
  #events = {};

  #addToEvents(events, eventName, eventHandler) {
    if (!events[eventName]) {
      events[eventName] = [];
    }

    events[eventName].push(eventHandler);
  }

  #prependToEvents(events, eventName, eventHandler) {
    if (!events[eventName]) {
      events[eventName] = [];
    }

    events[eventName].unshift(eventHandler);
  }

  on(eventName, eventHandler) {
    this.#addToEvents(this.#events, eventName, eventHandler);
  }

  once(eventName, eventHandler) {
    this.#addToEvents(this.#events, eventName, [eventHandler]);
  }

  off(eventName, eventHandler) {
    [this.#events, this.#prependEvents].forEach((events) => {
      if (events[eventName]) {
        const filtered = events[eventName].filter((handler) => {
          if (Array.isArray(handler)) {
            return eventHandler !== handler[0];
          }

          return handler !== eventHandler;
        });

        events[eventName] = filtered;
      }
    });
  }

  emit(eventName, ...args) {
    [this.#prependEvents, this.#events].forEach((events) => {
      if (events[eventName]) {
        for (const handler of events[eventName]) {
          if (Array.isArray(handler)) {
            handler[0](...args);
          } else {
            handler(...args);
          }
        }

        events[eventName] = events[eventName].filter(
          (handler) => !Array.isArray(handler),
        );

        if (events[eventName].length === 0) {
          delete events[eventName];
        }
      }
    });
  }

  prependListener(eventName, eventHandler) {
    this.#prependToEvents(this.#prependEvents, eventName, eventHandler);
  }

  prependOnceListener(eventName, eventHandler) {
    this.#prependToEvents(this.#prependEvents, eventName, [eventHandler]);
  }

  removeAllListeners(eventName) {
    if (eventName) {
      delete this.#prependEvents[eventName];
      delete this.#events[eventName];
    } else {
      this.#prependEvents = {};
      this.#events = {};
    }
  }

  listenerCount(eventName) {
    return [this.#prependEvents, this.#events].reduce((acc, events) => {
      return acc + (events[eventName] ? events[eventName].length : 0);
    }, 0);
  }
}

module.exports = MyEventEmitter;
