'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push({
      listener,
      once: false,
    });

    return this;
  }

  once(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push({
      listener,
      once: true,
    });

    return this;
  }

  off(eventName, listener) {
    this.events[eventName] = this.events[eventName].filter(current => (
      current.event !== eventName && current.listener !== listener
    ));

    return this;
  }

  emit(eventName, ...args) {
    let emitted = false;

    for (let i = 0; i < this.events[eventName].length; i += 1) {
      const currentEvent = this.events[eventName][i];

      currentEvent.listener(...args);

      emitted = true;

      if (currentEvent.once) {
        this.events[eventName].splice(i, 1);
      }
    }

    return emitted;
  }

  prependListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift({
      listener,
      once: false,
    });

    return this;
  }

  prependOnceListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift({
      listener,
      once: true,
    });

    return this;
  }

  removeAllListeners(eventName) {
    this.events[eventName] = [];

    return this;
  }

  listenerCount(eventName) {
    return this.events[eventName].length || 0;
  }
}

const eventEmitter = new MyEventEmitter();

const listener1 = (...args) => {
  console.log('listener1', args);
};

const listener2 = (...args) => {
  console.log('listener2', args);
};

eventEmitter.on('myEvent', listener1);

eventEmitter.emit('myEvent', 1, 2, 3);

eventEmitter.off('myEvent', listener1);

eventEmitter.emit('myEvent', 1, 2, 3);

eventEmitter.once('newEvent', listener2);

eventEmitter.emit('newEvent', 'Hello, ');
eventEmitter.emit('newEvent', 'world!');
