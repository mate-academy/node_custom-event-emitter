class MyEventEmitter {
  constructor() {
    this.events = [];
  }

  on(event, listener) {
    this.events.push({ event, listener });
  }

  once(event, listener) {
    const onceWrapper = (...args) => {
      this.off(event, onceWrapper);
      listener.apply(this, args);
    };
    this.on(event, onceWrapper);
  }

  off(event, listener) {
    this.events = this.events.filter(e => e.event !== event || e.listener !== listener);
  }

  emit(event, ...args) {
    this.events.filter(e => e.event === event).forEach(e => e.listener.apply(this, args));
  }

  prependListener(event, listener) {
    this.events.unshift({ event, listener });
  }

  prependOnceListener(event, listener) {
    const onceWrapper = (...args) => {
      this.off(event, onceWrapper);
      listener.apply(this, args);
    };
    this.prependListener(event, onceWrapper);
  }

  removeAllListeners(event) {
    if (event) {
      this.events = this.events.filter(e => e.event !== event);
    } else {
      this.events = [];
    }
  }

  listenerCount(event) {
    return this.events.filter(e => e.event === event).length;
  }
}
