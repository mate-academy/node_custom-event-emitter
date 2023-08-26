'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callBack) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callBack);
  }

  once(eventName, callBack) {
    const onceWrapper = (...args) => {
      callBack.apply(this, args);

      this.off(eventName, onceWrapper);
    }

    this.on(eventName, onceWrapper);
  }

  off(eventName, callBack) {
    const eventCallBacks = this.events[eventName];

    if (!eventCallBacks) return;

    if (callBack) {
      this.events[eventName] = eventCallBacks.filter(cb => cb !== callBack);
    } else {
      delete this.events[eventName];
    }
  }

  emit(eventName, ...args) {
    const eventCallBacks = this.events[eventName];

    if (!eventCallBacks) return;

    eventCallBacks.forEach(callBack => {
      callBack.apply(this, args);
    });
  }

  prependListener(eventName, callBack) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(callBack);
  }

  prependOnceListener(eventName, callBack) {
    const prependOnceListenerWrapper = (...args) => {
      callBack.apply(this, args);

      this.off(eventName, prependOnceListenerWrapper);
    }

    this.prependListener(eventName, prependOnceListenerWrapper);
  }

  removeAllListeners(eventName = null) {
    if (eventName !== null) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }
  }

  listenerCount(eventName) {
    const eventCallBacks = this.events[eventName];

    return eventCallBacks ? eventCallBacks.length : 0;
  }
}
