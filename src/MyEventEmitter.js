'use strict';

class MyEventEmitter {
  listeners = {};

  on(listener, event, once = false) {
    if (Object.keys(this.listeners).includes(listener)) {
      this.listeners[listener].push({ function: event, once });
    } else {
      this.listeners[listener] = [{ function: event, once }];
    }

    return event;
  }
  once(listener, event) {
    return this.on(listener, event, true);
  }
  off(listener, event) {
    this.listeners[listener].splice(
      this.listeners[listener].findIndex((el) => el.function === event),
      1,
    );
  }
  emit(listener, ...value) {
    if (!this.listeners[listener]) {
      return;
    }

    for (const event of [...this.listeners[listener]]) {
      event.function(...value);

      if (event.once) {
        this.off(listener, event.function);
      }
    }
  }
  prependListener(listener, event, once = false) {
    if (Object.keys(this.listeners).includes(listener)) {
      this.listeners[listener].splice(0, 0, { function: event, once });
    } else {
      this.listeners[listener] = [{ function: event, once }];
    }

    return event;
  }
  prependOnceListener(listener, event) {
    return this.prependListener(listener, event, true);
  }
  removeAllListeners(listener) {
    if (listener) {
      this.listeners[listener] = {};
    } else {
      this.listeners = {};
    }
  }
  listenerCount(listener) {
    return this.listeners[listener]?.length || 0;
  }
}

module.exports = MyEventEmitter;
