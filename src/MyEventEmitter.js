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
      let removedOnce = false;

      this.events[eventName] = this.events[eventName].filter((listener) => {
        if (listener[1] === eventAction && !removedOnce) {
          removedOnce = true;

          return false;
        }

        return true;
      });
    }

    return this;
  }

  emit(eventName, ...args) {
    if (Object.hasOwn(this.events, eventName)) {
      const currentEvent = [...this.events[eventName]];

      this.events[eventName] = this.events[eventName].filter(
        (listener) => listener[0] !== 'once',
      );

      currentEvent.forEach((listener) => {
        listener[1](...args);
      });
    }
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
    if (eventName === undefined) {
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
