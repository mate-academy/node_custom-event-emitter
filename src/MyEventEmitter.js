'use strict';

const hasProperty = (...args) => {
  return Object.prototype.hasOwnProperty.call(...args);
};

const checkListenerType = (listener) => {
  if (typeof listener !== 'function') {
    // eslint-disable-next-line max-len
    throw new Error(`The "listener" argument must be of type "function". Received type "${typeof listener}".`);
  }
};

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    checkListenerType(listener);

    if (!hasProperty(this.events, eventName)) {
      this.events[eventName] = [listener];
    } else {
      this.events[eventName].push(listener);
    }

    return this;
  }

  once(eventName, listener) {
    checkListenerType(listener);

    const callOnce = (...args) => {
      listener(...args);
      this.off(eventName, callOnce);
    };

    this.on(eventName, callOnce);

    return this;
  }

  off(eventName, listener) {
    checkListenerType(listener);

    if (hasProperty(this.events, eventName)) {
      const currListenerIndex = this.events[eventName]
        .findIndex((curListener) => curListener === listener);

      if (currListenerIndex >= 0) {
        this.events[eventName].splice([currListenerIndex], 1);
      }
    }

    if (this.events[eventName].length === 0) {
      delete this.events[eventName];
    }

    return this;
  }

  emit(eventName, ...args) {
    if (!hasProperty(this.events, eventName)) {
      return false;
    }

    if (!this.events[eventName].length) {
      return false;
    }

    this.events[eventName].map((currListener) => currListener(...args));

    return true;
  }

  prependListener(eventName, listener) {
    checkListenerType(listener);

    if (!hasProperty(this.events, eventName)) {
      this.events[eventName] = [listener];
    } else {
      this.events[eventName].unshift(listener);
    }

    return this;
  }

  prependOnceListener(eventName, listener) {
    checkListenerType(listener);

    const callOnce = (...args) => {
      listener(...args);
      this.off(eventName, callOnce);
    };

    this.prependListener(eventName, callOnce);

    return this;
  }

  removeAllListeners(eventName) {
    if (!arguments.length) {
      this.events = {};
    } else if (hasProperty(this.events, eventName)) {
      delete this.events[eventName];
    }

    return this;
  }

  listenerCount(eventName) {
    if (eventName && hasProperty(this.events, eventName)) {
      return this.events[eventName].length;
    }

    return 0;
  }
}

module.exports = {
  MyEventEmitter,
};
