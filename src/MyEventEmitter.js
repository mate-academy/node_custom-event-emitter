'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = [];
  }
  on(event, listener) {
    this.listeners.push({ event, listener });
  }
  once(event, listener) {
    const onceListener = (data) => {
      listener(data);
      this.off(event, onceListener);
    };

    this.on(event, onceListener);
  }
  off(event, listener) {
    this.listeners = this.listeners.filter(
      (l) => l.event !== event || l.listener !== listener,
    );
  }
  emit(event, ...data) {
    this.listeners.forEach((l) => {
      if (l.event === event) {
        l.listener(...data);
      }
    });
  }
  prependListener(event, listener) {
    this.listeners.unshift({ event, listener });
  }
  prependOnceListener(event, listener) {
    const onceListener = (data) => {
      listener(data);
      this.off(event, onceListener);
    };

    this.prependListener(event, onceListener);
  }
  removeAllListeners(event) {
    this.listeners = this.listeners.filter((l) => l.event !== event);
  }
  listenerCount(event) {
    return this.listeners.filter((l) => l.event === event).length;
  }
}

module.exports = MyEventEmitter;
