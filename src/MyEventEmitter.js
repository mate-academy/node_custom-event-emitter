'use strict';

class MyEventEmitter {
  listeners = [];

  on(eventName, func) {
    this.listeners.push([eventName, func, false]);

    return this;
  }
  once(eventName, func) {
    this.listeners.push([eventName, func, true]);

    return this;
  }
  off(eventName, func) {
    this.listeners = this.listeners.filter(
      ([eName, callback]) => eventName !== eName || callback !== func,
    );
  }
  emit(eventName, ...args) {
    const listener = this.listeners.filter(([eName]) => eventName === eName);

    if (listener.length > 0) {
      listener.forEach(([e, func, isOnce]) => {
        func(...args);

        if (isOnce) {
          const index = this.listeners.findIndex(
            ([eN, f, isO]) => eN === e && f === func && isOnce === isO,
          );

          this.listeners = [
            ...this.listeners.slice(0, index),
            ...this.listeners.slice(index + 1),
          ];
        }
      });

      return true;
    } else {
      return false;
    }
  }
  prependListener(eventName, func) {
    this.listeners.unshift([eventName, func, false]);

    return this;
  }
  prependOnceListener(eventName, func) {
    this.listeners.unshift([eventName, func, true]);

    return this;
  }
  removeAllListeners(eventName) {
    if (eventName) {
      this.listeners = this.listeners.filter(([eName]) => eventName !== eName);
    } else {
      this.listeners = [];
    }

    return this;
  }
  listenerCount(eventName) {
    const count = this.listeners.reduce((acc, [eName]) => {
      if (eventName === eName) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);

    return count;
  }
}

module.exports = MyEventEmitter;
