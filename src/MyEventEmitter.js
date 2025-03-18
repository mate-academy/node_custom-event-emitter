'use strict';

class MyEventEmitter {
  events;

  constructor() {
    this.events = [];
  }

  on(eventName, callback) {
    const event = this.events.find((el) => el.eventName === eventName);

    if (!event) {
      this.events.push({
        eventName: eventName,
        callbacks: [
          {
            type: 'on',
            callback: callback,
          },
        ],
      });
    } else {
      event.callbacks.push({
        type: 'on',
        callback: callback,
      });
    }
  }

  once(eventName, callback) {
    const event = this.events.find((el) => el.eventName === eventName);

    if (!event) {
      this.events.push({
        eventName: eventName,
        callbacks: [
          {
            type: 'once',
            callback: callback,
          },
        ],
      });
    } else {
      event.callbacks.push({
        type: 'once',
        callback: callback,
      });
    }
  }

  off(eventName, callback) {
    const event = this.events.find((el) => el.eventName === eventName);

    if (event) {
      const callBackToRemove = [];

      event.callbacks.forEach((cal) => {
        if (cal.callback === callback) {
          callBackToRemove.push(cal);
        }
      });

      if (callBackToRemove.length > 0) {
        event.callbacks = event.callbacks.filter((cal) => {
          return callBackToRemove.indexOf(cal) === -1;
        });
      }
    }
  }

  emit(eventName, ...args) {
    const event = this.events.find((el) => el.eventName === eventName);

    if (event) {
      const callBackToRemove = [];

      event.callbacks.forEach((callback) => {
        callback.callback(...args);

        if (callback.type === 'once') {
          callBackToRemove.push(callback);
        }
      });

      if (callBackToRemove.length > 0) {
        event.callbacks = event.callbacks.filter((callback) => {
          return callBackToRemove.indexOf(callback) === -1;
        });
      }
    }
  }

  prependListener(eventName, callback) {
    const event = this.events.find((el) => el.eventName === eventName);

    if (!event) {
      this.events.push({
        eventName: eventName,
        callbacks: [
          {
            type: 'on',
            callback: callback,
          },
        ],
      });
    } else {
      event.callbacks.unshift({
        type: 'on',
        callback: callback,
      });
    }
  }

  prependOnceListener(eventName, callback) {
    const event = this.events.find((el) => el.eventName === eventName);

    if (!event) {
      this.events.push({
        eventName: eventName,
        callbacks: [
          {
            type: 'once',
            callback: callback,
          },
        ],
      });
    } else {
      event.callbacks.unshift({
        type: 'once',
        callback: callback,
      });
    }
  }

  removeAllListeners(eventName) {
    if (eventName) {
      const event = this.events.find((el) => el.eventName === eventName);

      if (event) {
        event.callbacks = [];
      }
    } else {
      this.events = [];
    }
  }

  listenerCount(eventName) {
    const event = this.events.find((el) => el.eventName === eventName);

    if (event) {
      return event.callbacks.length;
    }

    return 0;
  }
}

module.exports = MyEventEmitter;
