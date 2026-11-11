'use strict';

class MyEventEmitter {
  events = {};

  on(eventName, eventAction) {
    const pushEvent = ['always', eventAction];

    if (Object.hasOwn(this.events, eventName)) {
      this.events[eventName].push(pushEvent);

      return this;
    }

    this.events[eventName] = [pushEvent];

    return this;
  }

  once(eventName, eventAction) {
    const pushEvent = ['once', eventAction];

    if (Object.hasOwn(this.events, eventName)) {
      this.events[eventName].push(pushEvent);

      return this;
    }

    this.events[eventName] = [pushEvent];

    return this;
  }

  off(eventName, eventAction) {
    if (Object.hasOwn(this.events, eventName)) {
      this.events[eventName] = this.events[eventName].filter(
        (listener) => listener[1] !== eventAction,
      );
    }

    return this;
  }

  emit(eventName, ...args) {
    this.events[eventName].forEach((listener) => {
      listener[1](...args);
    });

    this.events[eventName] = this.events[eventName].filter(
      (listener) => listener[0] !== 'once',
    );
  }

  prependListener(eventName, eventAction) {
    const pushEvent = ['always', eventAction];

    if (Object.hasOwn(this.events, eventName)) {
      this.events[eventName].unshift(pushEvent);

      return this;
    }

    this.events[eventName] = [pushEvent];

    return this;
  }

  prependOnceListener(eventName, eventAction) {
    const pushEvent = ['once', eventAction];

    if (Object.hasOwn(this.events, eventName)) {
      this.events[eventName].unshift(pushEvent);

      return this;
    }

    this.events[eventName] = [pushEvent];

    return this;
  }

  removeAllListeners(eventName) {
    if (!eventName) {
      this.events = {};
    } else {
      this.events[eventName] = [];
    }
  }

  listenerCount(eventName) {
    if (Object.hasOwn(this.events, eventName)) {
      return this.events[eventName].length;
    }

    return 0;
  }
}

module.exports = MyEventEmitter;
