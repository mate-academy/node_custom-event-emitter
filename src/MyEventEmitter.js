'use strict';

class MyEventEmitter {
  constructor() {
    this.events = [];
  }

  on(eventName, cb) {
    this.events.push({
      [eventName]: cb,
      once: false,
    });

    return this;
  }

  once(eventName, cb) {
    this.events.push({
      [eventName]: cb,
      once: true,
    });

    return this;
  }

  off(eventName, cb) {
    for (const event of this.events) {
      if (eventName in event && event[eventName] === cb) {
        this.events = this.events.filter(evnt => evnt[eventName] !== cb);
      }
    }

    return this;
  }

  emit(eventName, ...args) {
    for (const event of this.events) {
      if (eventName in event && event.once === false) {
        event[eventName](args);
      }

      if (eventName in event && event.once === true) {
        event[eventName](args);

        this.events = this.events.filter(evnt => !(eventName in evnt));
      }
    }

    return this;
  };

  prependListener(eventName, cb) {
    this.events.unshift({
      [eventName]: cb,
      once: false,
    });

    return this;
  }

  prependOnceListener(eventName, cb) {
    this.events.unshift({
      [eventName]: cb,
      once: true,
    });

    return this;
  }

  removeAllListeners(eventName) {
    if (eventName) {
      for (const event of this.events) {
        if (eventName in event) {
          this.events = this.events.filter(evnt => !(eventName in evnt));
        }
      }

      return this;
    }

    this.events = [];

    return this;
  }

  listenerCount(eventName) {
    let count = 0;

    this.events.forEach(event => {
      if (eventName in event) {
        count++;
      }
    });

    return count;
  }
}

module.exports = { MyEventEmitter };
