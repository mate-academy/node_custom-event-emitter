"use strict";

class MyEventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, callback) {
    const thisEvent = this.events.get(event);
    if (thisEvent) {
      this.events.delete(event);
      this.events.set(event, [...thisEvent, callback]);

      return this;
    }

    this.events.set(event, [callback]);

    return this;
  }

  once(event, callback) {
    const callbackWrapper = () => {
      callback();
      this.off(event, callbackWrapper);
    };
    const thisEvent = this.events.get(event);
    if (thisEvent) {
      this.events.delete(event);
      this.events.set(event, [...thisEvent, callbackWrapper]);

      return this;
    }
    this.events.set(event, [callbackWrapper]);

    return this;
  }

  off(event, callback) {
    const eventList = this.events.get(event).filter((c) => c !== callback);
    this.events.delete(event);

    this.events.set(event, eventList);

    return this;
  }

  emit(event, ...args) {
    if (this.events.get(event)) {
      this.events.get(event).forEach((c) => c(...args));
      return true;
    }
    return false;
  }

  prependListener(event, callback) {
    const thisEvent = this.events.get(event);

    if (thisEvent) {
      this.events.delete(event);
      this.events.set(event, [callback, ...thisEvent]);
    } else {
      this.events.set(event, [callback]);
    }
    return this;
  }

  prependOnceListener(event, callback) {
    const callbackWrapper = () => {
      callback();
      this.off(event, callbackWrapper);
    };

    if (this.events.get(event)) {
      const thisEvent = this.events.get(event);
      this.events.delete(event);
      this.events.set(event, [callbackWrapper, ...thisEvent]);
    } else {
      this.events.set(event, [callbackWrapper]);
    }
    return this;
  }

  removeAllListeners() {
    this.events.clear();
    return this;
  }

  listenerCount(event) {
    const thisEvent = this.events.get(event);
    if (thisEvent) {
      return thisEvent.length;
    }
    return 0;
  }
}

module.exports.MyEventEmitter = MyEventEmitter;
