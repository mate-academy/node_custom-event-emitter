'use strict';

class MyEventEmitter {
  constructor() {
    this.allListeners = {};
  }

  on(eventName, newListener) {
    if (typeof newListener !== 'function') {
      throw new Error('Listener must be a function!');
    } else {
      this.allListeners[eventName] = this.allListeners[eventName] || [];
      this.allListeners[eventName].push(newListener);

      return this;
    }
  };

  once(eventName, newListener) {
    if (typeof newListener !== 'function') {
      throw new Error('Listener must be a function!');
    }

    this.allListeners[eventName] = this.allListeners[eventName] || [];

    const onceWrapper = (...args) => {
      newListener(...args);
      this.off(eventName, onceWrapper);
    };

    this.allListeners[eventName].push(onceWrapper);

    return this;
  };

  off(type, listenerToRemove) {
    const listenersArrayByType = this.allListeners[type];

    if (!listenersArrayByType) {
      return this;
    };

    for (let i = listenersArrayByType.length; i > 0; i--) {
      if (listenersArrayByType[i] === listenerToRemove) {
        listenersArrayByType.splice(i, 1);
        break;
      }
    }

    return this;
  };

  emit(eventName, ...args) {
    const listenersArrayByType = this.allListeners[eventName];

    if (!listenersArrayByType) {
      return false;
    }

    listenersArrayByType.forEach((listener) => {
      listener(...args);
    });

    return true;
  };

  prependListener(eventName, newListener) {
    if (typeof newListener !== 'function') {
      throw new Error('Listener must be a function!');
    } else {
      this.allListeners[eventName] = this.allListeners[eventName] || [];
      this.allListeners[eventName].unshift(newListener);

      return this;
    }
  };

  prependOnceListener(eventName, newListener) {
    if (typeof newListener !== 'function') {
      throw new Error('Listener must be a function!');
    }

    this.allListeners[eventName] = this.allListeners[eventName] || [];

    const onceWrapper = () => {
      newListener();
      this.off(eventName, onceWrapper);
    };

    this.allListeners[eventName].unshift(onceWrapper);

    return this;
  };

  removeAllListeners(eventName) {
    this.allListeners[eventName] = [];

    return this;
  };

  listenerCount(eventName) {
    const listenersByType = this.allListeners[eventName] || [];

    return listenersByType.length;
  };
};

module.exports = {
  MyEventEmitter,
};
