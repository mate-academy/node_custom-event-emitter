'use strict';

class MyEventEmitter {
  constructor() {
    this.eventsArray = [];
  }

  on(eventName, eventCallback) {
    this.eventsArray.push({ eventName, eventCallback });
  }
  once(eventName, eventCallback) {
    this.eventsArray.push({ eventName, eventCallback, once: true });
  }
  off(eventName, eventCallback) {
    this.eventsArray = this.eventsArray.filter(
      (event) =>
        !(
          event.eventName === eventName && event.eventCallback === eventCallback
        ),
    );
  }

  emit(eventName, ...args) {
    const newEventsArray = [];

    for (const event of this.eventsArray) {
      if (event.eventName === eventName) {
        event.eventCallback(...args);

        // Only exclude if it's once and was invoked
        if (!event.once) {
          newEventsArray.push(event);
        }
      } else {
        // Keep unrelated events untouched
        newEventsArray.push(event);
      }
    }

    this.eventsArray = newEventsArray;
  }

  prependListener(eventName, eventCallback) {
    this.eventsArray = [{ eventName, eventCallback }, ...this.eventsArray];
  }
  prependOnceListener(eventName, eventCallback) {
    this.eventsArray = [
      { eventName, eventCallback, once: true },
      ...this.eventsArray,
    ];
  }
  removeAllListeners(eventName) {
    if (eventName) {
      this.eventsArray = this.eventsArray.filter(
        (event) => event.eventName !== eventName,
      );
    } else {
      this.eventsArray = [];
    }
  }
  listenerCount(eventName) {
    return this.eventsArray.filter((event) => event.eventName === eventName)
      .length;
  }
}

module.exports = MyEventEmitter;
