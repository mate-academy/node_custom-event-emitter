'use strict';

/* eslint-disable no-console */

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callBack) {
    this.events[eventName] = this.events[eventName] || [];

    this.events[eventName].push(callBack);

    return this;
  }

  once(eventName, callBack) {
    const onceWrapper = (...args) => {
      callBack.apply(this, args);

      this.off(eventName, onceWrapper);
    };

    this.on(eventName, onceWrapper);

    return this;
  }

  off(eventName, callBack) {
    const eventCallBacks = this.events[eventName];

    if (!eventCallBacks) {
      throw new Error('Event you are trying to delete does not exist');
    }

    if (callBack) {
      this.events[eventName] = eventCallBacks.filter(cb => cb !== callBack);
    } else {
      delete this.events[eventName];
    }

    return this;
  }

  emit(eventName, ...args) {
    const eventCallBacks = this.events[eventName];

    if (!eventCallBacks) {
      return;
    }

    eventCallBacks.forEach(callBack => {
      callBack.apply(this, args);
    });
  }

  prependListener(eventName, callBack) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(callBack);

    return this;
  }

  prependOnceListener(eventName, callBack) {
    const prependOnceListenerWrapper = (...args) => {
      this.off(eventName, prependOnceListenerWrapper);
      callBack.apply(this, args);
    };

    this.prependListener(eventName, prependOnceListenerWrapper);

    return this;
  }

  removeAllListeners(eventName = null) {
    if (eventName) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }

    return this;
  }

  listenerCount(eventName) {
    return this.events[eventName] || 0;
  }
}

const myEmitter = new MyEventEmitter();

myEmitter.once('test', () => console.log('This is first test'));
myEmitter.once('test', () => console.log('This is second test'));
myEmitter.once('test', () => console.log('This is third test'));

myEmitter.on('test1', () => console.log('This is on event'))
myEmitter.on('test1', () => console.log('This is second on event'))

myEmitter.emit('test');
myEmitter.emit('test');
myEmitter.emit('test');

myEmitter.emit('test1');
myEmitter.emit('test1');
myEmitter.emit('test1');

myEmitter.listenerCount('greet');
