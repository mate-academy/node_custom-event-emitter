'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(e, lstnr) {
    if (!this.events[e]) {
      this.events[e] = [];
    }

    this.events[e].push(lstnr);
  }
  once(e, lstnr) {
    const wrapper = (...args) => {
      lstnr(...args);
      this.off(e, wrapper);
    };

    this.on(e, wrapper);
  }
  off(e, lstnr) {
    if (!this.events[e]) {
      return;
    }

    this.events[e] = this.events[e].filter((el) => el !== lstnr);
  }
  emit(e, ...args) {
    if (!this.events[e]) {
      return false;
    }

    for (const listener of [...this.events[e]]) {
      listener(...args);
    }

    return true;
  }
  prependListener(e, lstnr) {
    if (!this.events[e]) {
      this.events[e] = [];
    }

    this.events[e].unshift(lstnr);
  }
  prependOnceListener(e, lstnr) {
    const wrapper = (...args) => {
      lstnr(...args);
      this.off(e, wrapper);
    };

    this.prependListener(e, wrapper);
  }
  removeAllListeners(e) {
    if (e === undefined) {
      this.events = {};
    }

    delete this.events[e];
  }
  listenerCount(e) {
    const target = this.events[e];

    return target ? target.length : 0;
  }
}

module.exports = MyEventEmitter;
