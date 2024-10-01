'use strict';

function findEvent(listeners, eventName) {
  return listeners.find((listener) =>
    Object.keys(listener).includes(eventName));
}

class MyEventEmitter {
  listeners = [];
  on(event, callback) {
    const possibleEvent = findEvent(this.listeners, event);

    if (possibleEvent) {
      this.listeners = this.listeners.map((listener) => {
        if (Object.keys(listener).includes(event)) {
          return { [event]: [...listener[event], { callback }] };
        }

        return listener;
      });
    }
    this.listeners.push({ [event]: [{ callback }] });
  }
  once(event, callback) {
    const possibleEvent = findEvent(this.listeners, event);

    if (possibleEvent) {
      this.listeners = this.listeners.map((listener) => {
        if (Object.keys(listener).includes(event)) {
          return { [event]: [...listener[event], { callback, once: true }] };
        }

        return listener;
      });

      return;
    }
    this.listeners.push({ [event]: [{ callback, once: true }] });
  }
  off(event, callback) {
    this.listeners = this.listeners.map((listener) => {
      if (Object.keys(listener).includes(event)) {
        const filteredCallbacks = listener[event].filter(
          (callbacks) =>
            callbacks['callback'].toString() !== callback.toString(),
        );

        return { [event]: filteredCallbacks };
      }

      return listener;
    });
  }
  emit(event, ...args) {
    const listeners = this.listeners.filter(
      (elem) =>
        // eslint-disable-next-line comma-dangle
        Object.keys(elem).includes(event),
      // eslint-disable-next-line function-paren-newline
    );

    if (listeners.length) {
      listeners.forEach((listener) =>
        listener[event].forEach((callback) => callback['callback'](...args)));

      this.listeners = this.listeners.map((listener) => {
        if (Object.keys(listener).includes(event)) {
          const filteredCallbacks = listener[event].filter(
            (callback) => !callback['once'],
          );

          return { [event]: filteredCallbacks };
        }

        return listener;
      });
    }
  }
  prependListener(event, callback) {
    this.listeners = this.listeners.map((listener) => {
      if (Object.keys(listener).includes(event)) {
        const prependQueue = listener[event].filter(
          (tempCallback) => tempCallback['type'] === 'prepend',
        );

        return {
          [event]: [
            ...prependQueue,
            { callback, type: 'prepend' },
            ...listener[event].slice(prependQueue.length),
          ],
        };
      }

      return listener;
    });
  }
  prependOnceListener(event, callback) {
    this.listeners = this.listeners.map((listener) => {
      if (Object.keys(listener).includes(event)) {
        return { [event]: [{ callback, once: true }, ...listener[event]] };
      }

      return listener;
    });
  }
  removeAllListeners(event) {
    if (event) {
      this.listeners = this.listeners.filter(
        (listener) => !Object.keys(listener).includes(event),
      );

      return;
    }

    this.listeners = [];
  }
  listenerCount(event) {
    const possibleEvent = this.listeners.find((listener) =>
      Object.keys(listener).includes(event));

    return possibleEvent ? possibleEvent[event].length : 0;
  }
}

module.exports = MyEventEmitter;
