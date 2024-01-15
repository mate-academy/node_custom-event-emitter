'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  on(eventName, listener) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }
    this.listeners.get(eventName).push(listener);
  }

  once(eventName, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(eventName, onceWrapper);
    };
    this.on(eventName, onceWrapper);
  }

  off(eventName, listener) {
    if (this.listeners.has(eventName)) {
      const listeners = this.listeners.get(eventName).filter((l) => l !== listener);
      this.listeners.set(eventName, listeners);
    }
  }

  emit(eventName, ...args) {
    if (this.listeners.has(eventName)) {
      for (const listener of this.listeners.get(eventName)) {
        listener(...args);
      }
    }
  }

  prependListener(eventName, listener) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }
    this.listeners.get(eventName).unshift(listener);
  }

  prependOnceListener(eventName, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(eventName, onceWrapper);
    };
    this.prependListener(eventName, onceWrapper);
  }

  removeAllListeners(eventName) {
    if (eventName) {
      this.listeners.delete(eventName);
    } else {
      this.listeners.clear();
    }
  }

  listenerCount(eventName) {
    return this.listeners.has(eventName) ? this.listeners.get(eventName).length : 0;
  }
}

const myEmitter = new MyEventEmitter();

const myListener = (arg) => {
  console.log(`Event emitted with argument: ${arg}`);
};

myEmitter.on('myEvent', myListener);
myEmitter.emit('myEvent', 'Hello World!');

myEmitter.prependOnceListener('myEvent', () => {
  console.log('This listener should run only once.');
});

myEmitter.emit('myEvent');
myEmitter.emit('myEvent');

console.log('Number of listeners:', myEmitter.listenerCount('myEvent'));

myEmitter.removeAllListeners('myEvent');
console.log('Number of listeners:', myEmitter.listenerCount('myEvent'));

module.exports = {
  MyEventEmitter,
}
