'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  validName(eventName) {
    if (typeof eventName !== 'string') {
      return new Error('no valid event name');
    }
  }

  validListener(listener) {
    if (typeof listener !== 'function') {
      return new Error('no valid event listener');
    }
  }

  on(eventName, listener) {
    this.validName(eventName);
    this.validListener(listener);

    if (eventName in this.events) {
      this.events[eventName].pish(listener);
    } else {
      this.events[eventName] = [listener];
    }

    return this;
  }
  once(eventName, listener) {
    this.validName(eventName);
    this.validListener(listener);

    const onseLisener = (args) => {
      listener(...args);
      this.off(eventName, onseLisener);
    };

    if (eventName in this.events) {
      this.events[eventName].pish(onseLisener);
    } else {
      this.events[eventName] = [onseLisener];
    }

    return this;
  }
  off(eventName, listener) {
    this.validName(eventName);
    this.validListener(listener);

    this.events[eventName] = this.events[eventName]
      .filter((event) => event !== listener);

    return this;
  }
  emit(eventName, args) {
    this.validName(eventName);

    this.events[eventName].forEach(event => {
      event(...args);
    });
  }
  prependListener(eventName, listener) {
    this.validName(eventName);
    this.validListener(listener);

    if (eventName in this.events) {
      this.events[eventName].unshift(listener);
    } else {
      this.events[eventName] = [listener];
    }

    return this;
  }
  prependOnceListener(eventName, listener) {
    this.validName(eventName);
    this.validListener(listener);

    const onseLisener = (args) => {
      listener(...args);
      this.off(eventName, onseLisener);
    };

    if (eventName in this.events) {
      this.events[eventName].unshift(onseLisener);
    } else {
      this.events[eventName] = [onseLisener];
    }

    return this;
  }
  removeAllListeners(eventName) {
    this.validateEventName(eventName);

    delete this.events[eventName];

    return this;
  }
  listenerCount(eventName) {
    this.validateEventName(eventName);

    return this.events[eventName].length || 0;
  }
}

module.exports.MyEventEmitter = MyEventEmitter;
