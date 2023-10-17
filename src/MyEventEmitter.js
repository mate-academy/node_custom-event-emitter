'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, cb) {
    if (!cb) {
      throw new Error('The "listener" argument must be of type'
      + 'function. Received undefined');
    }

    if (eventName in this.events) {
      this.events[eventName].push(cb);
    } else {
      this.events[eventName] = [cb];
    }

    return this;
  }

  once(eventName, cb) {
    if (!cb) {
      throw new Error('The "listener" argument must be of type'
      + 'function. Received undefined');
    }

    const executeOnce = () => {
      cb();

      this.off(eventName, executeOnce);
    };

    if (eventName in this.events) {
      this.events[eventName].push(executeOnce);
    } else {
      this.events[eventName] = [executeOnce];
    }

    return this;
  }

  off(eventName, cb) {
    if (!cb) {
      throw new Error('The "listener" argument must be of type'
      + 'function. Received undefined');
    }

    this.events[eventName] = this.events[eventName]
      .filter(cbToDel => cbToDel !== cb);

    return this;
  }

  emit(eventName, ...args) {
    this.events[eventName].forEach(evnt => evnt(args));

    return this;
  };

  prependListener(eventName, cb) {
    if (!cb) {
      throw new Error('The "listener" argument must be of type'
      + 'function. Received undefined');
    }

    if (eventName in this.events) {
      this.events[eventName].unshift(cb);
    } else {
      this.events[eventName] = cb;
    }

    return this;
  }

  prependOnceListener(eventName, cb) {
    if (!cb) {
      throw new Error('The "listener" argument must be of type'
      + 'function. Received undefined');
    }

    const executeOnce = () => {
      cb();

      this.off(eventName, executeOnce);
    };

    if (eventName in this.events) {
      this.events[eventName].unshift(executeOnce);
    } else {
      this.events[eventName] = [executeOnce];
    }

    return this;
  }

  removeAllListeners(eventName) {
    if (eventName in this.events) {
      delete this.events[eventName];

      return this;
    }

    this.events = {};

    return this;
  }

  listenerCount(eventName) {
    if (eventName in this.events) {
      return this.events[eventName].length;
    }

    return 0;
  }
}

module.exports = { MyEventEmitter };
