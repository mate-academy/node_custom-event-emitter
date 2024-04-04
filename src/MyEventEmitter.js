/* eslint-disable max-len */
'use strict';

function setDefaultListeners(eventName) {
  if (!this.listeners[eventName]) {
    this.listeners[eventName] = [];
  }
}

function onceWrapper(eventName, eventListener) {
  const wrapper = (...args) => {
    this.listeners[eventName] = this.listeners[eventName].filter(
      (listener) => listener !== wrapper,
    );

    return eventListener(...args);
  };

  wrapper.listener = eventListener;

  return wrapper;
}

function setValidation(eventName, eventListener) {
  if (!(typeof eventName === 'string' && typeof eventListener === 'function')) {
    throw new Error('ERROR: invalid arguments');
  }
}

class MyEventNameEmitter {
  constructor() {
    this.listeners = {};
  }

  on(eventName, eventListener) {
    setValidation.call(this, eventName, eventListener);
    setDefaultListeners.call(this, eventName);
    this.listeners[eventName].push(eventListener);
  }

  once(eventName, eventListener) {
    if (!eventName) {
      return;
    }

    setValidation.call(this, eventName, eventListener);
    setDefaultListeners.call(this, eventName);

    const onceWrap = onceWrapper.call(this, eventName, eventListener);

    this.listeners[eventName].push(onceWrap);
  }

  off(eventName, eventListener) {
    if (!this.listeners[eventName]) {
      return;
    }

    this.listeners[eventName] = this.listeners[eventName].filter(
      (eventList) => eventList !== eventListener,
    );
  }

  emit(eventName, ...args) {
    if (!this.listeners[eventName]) {
      return;
    }

    this.listeners[eventName].forEach((listener) => listener(...args));
  }

  prependListener(eventName, eventListener) {
    setValidation.call(this, eventName, eventListener);
    setDefaultListeners.call(this, eventName);

    this.listeners[eventName].unshift(eventListener);
  }

  prependOnceListener(eventName, eventListener) {
    setValidation.call(this, eventName, eventListener);
    setDefaultListeners.call(this, eventName);

    const onceWrap = onceWrapper.call(this, eventName, eventListener);

    this.listeners[eventName].unshift(onceWrap);
  }

  removeAllListeners(eventName) {
    delete this.listeners[eventName];
  }

  listenerCount(eventName, listener) {
    if (!eventName) {
      throw new Error('ERROR: eventName isn`t passed');
    }

    if (this.listeners[eventName]) {
      return this.listeners[eventName].length;
    }

    return 0;
  }
}

module.exports = MyEventNameEmitter;
