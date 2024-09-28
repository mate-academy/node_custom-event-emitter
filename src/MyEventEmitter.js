'use strict';

class MyEventEmitter {
  events = [];

  findEvent(eventName) {
    return this.events.find((event) => event.eventName === eventName);
  }

  on(eventName, callback) {
    const event = this.findEvent(eventName);
    const listener = {
      callback,
      once: false,
    };

    if (event) {
      event.listeners.push(listener);
    } else {
      this.events.push({
        eventName,
        listeners: [listener],
      });
    }
  }

  once(eventName, callback) {
    const event = this.findEvent(eventName);
    const listener = {
      callback,
      once: true,
    };

    if (event) {
      event.listeners.push(listener);
    } else {
      this.events.push({
        eventName,
        listeners: [listener],
      });
    }
  }

  off(eventName, callback) {
    const event = this.findEvent(eventName);

    if (event) {
      event.listeners = event.listeners.filter(
        (listener) => listener.callback !== callback,
      );
    }
  }

  emit(eventName, ...args) {
    const event = this.findEvent(eventName);

    if (event) {
      const indexes = [];

      event.listeners.forEach((listener, index) => {
        const { callback, once } = listener;

        if (once) {
          indexes.push(index);
        }

        callback(...args);
      });

      if (indexes.length) {
        indexes.reverse().forEach((index) => {
          event.listeners.splice(index, 1);
        });
      }
    }
  }

  prependListener(eventName, callback) {
    const event = this.findEvent(eventName);
    const listener = {
      callback,
      once: false,
    };

    if (event) {
      event.listeners.unshift(listener);
    } else {
      this.events.push({
        eventName,
        listeners: [listener],
      });
    }
  }

  prependOnceListener(eventName, callback) {
    const event = this.findEvent(eventName);
    const listener = {
      callback,
      once: true,
    };

    if (event) {
      event.listeners.unshift(listener);
    } else {
      this.events.push({
        eventName,
        listeners: [listener],
      });
    }
  }

  removeAllListeners(eventName) {
    const event = this.findEvent(eventName);

    if (!eventName || !event) {
      this.events = [];
    } else {
      event.listeners = [];
    }
  }

  listenerCount(eventName) {
    const event = this.findEvent(eventName);

    if (event) {
      return event.listeners.length;
    } else {
      return 0;
    }
  }
}

module.exports = MyEventEmitter;
