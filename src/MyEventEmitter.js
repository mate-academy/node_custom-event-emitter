'use strict';

class MyEventEmitter {
  events = [];

  constructor() {
    this.events = [];
  }

  on(eventName, listener) {
    let eventInfo = this.events.find((value, indexed, arr) => {
      return value.eventName === eventName;
    });

    if (!eventInfo) {
      eventInfo = {
        eventName: eventName,
        eventListners: [],
      };

      this.events.push(eventInfo);
    }

    const callback = {
      listener: listener,
      once: false,
    };

    eventInfo.eventListners.push(callback);
  }

  once(eventName, listener) {
    let eventInfo = this.events.find((value, indexed, arr) => {
      return value.eventName === eventName;
    });

    if (!eventInfo) {
      eventInfo = {
        eventName: eventName,
        eventListners: [],
      };

      this.events.push(eventInfo);
    }

    const callback = {
      listener: listener,
      once: true,
    };

    eventInfo.eventListners.push(callback);
  }

  off(eventName, listener) {
    const eventInfo = this.events.find((value, indexed, arr) => {
      return value.eventName === eventName;
    });

    if (eventInfo) {
      const newListeners = eventInfo.eventListners.filter((v, i, a) => {
        return v.listener !== listener;
      });

      eventInfo.eventListners = newListeners;
    }
  }

  emit(eventName, ...params) {
    const eventInfo = this.events.find((value, indexed, arr) => {
      return value.eventName === eventName;
    });

    if (eventInfo) {
      for (let i = 0; i < eventInfo.eventListners.length; i++) {
        eventInfo.eventListners[i].listener(...params);
      }

      const newListeners = eventInfo.eventListners.filter((v, i, a) => {
        return v.once === false;
      });

      eventInfo.eventListners = newListeners;
    }
  }

  prependListener(eventName, listener) {
    let eventInfo = this.events.find((value, indexed, arr) => {
      return value.eventName === eventName;
    });

    if (!eventInfo) {
      eventInfo = {
        eventName: eventName,
        eventListners: [],
      };

      this.events.push(eventInfo);
    }

    const callback = {
      listener: listener,
      once: false,
    };

    eventInfo.eventListners.unshift(callback);
  }

  prependOnceListener(eventName, listener) {
    let eventInfo = this.events.find((value, indexed, arr) => {
      return value.eventName === eventName;
    });

    if (!eventInfo) {
      eventInfo = {
        eventName: eventName,
        eventListners: [],
      };

      this.events.push(eventInfo);
    }

    const callback = {
      listener: listener,
      once: true,
    };

    eventInfo.eventListners.unshift(callback);
  }

  removeAllListeners(eventName = '') {
    if (eventName === '') {
      for (let i = 0; i < this.events.length; i++) {
        this.events[i].eventListners.length = 0;
      }
    } else {
      const eventInfo = this.events.find((value, indexed, arr) => {
        return value.eventName === eventName;
      });

      if (eventInfo) {
        eventInfo.eventListners.length = 0;
      }
    }
  }

  listenerCount(eventName) {
    const eventInfo = this.events.find((value, indexed, arr) => {
      return value.eventName === eventName;
    });

    if (eventInfo) {
      return eventInfo.eventListners.length;
    }

    return 0;
  }
}

module.exports = MyEventEmitter;
