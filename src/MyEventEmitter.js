import z from 'zod';

export class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  checkArgs(name, listener) {
    const isNameString = z.string().check(name);
    const isListenerFunction = z.function().check(listener);

    if (!isNameString || !isListenerFunction) {
      throw new Error('Invalid arguments');
    }
  }

  checkEvents(name) {
    const isEventsContains = Object.keys(this.events).includes(name);

    return isEventsContains;
  }

  on(name, listener) {
    this.checkArgs(name, listener);

    if (!this.checkEvents(name)) {
      this.events[name] = [];
    }

    this.events[name].push(listener);
  }

  once(name, listener) {
    this.checkArgs(name, listener);

    const onceListener = (...args) => {
      listener(...args);
      this.off(name, onceListener);
    };

    this.on(name, onceListener);
  }

  off(name, listener) {
    this.checkArgs(name, listener);

    if (!this.checkEvents(name)) {
      return;
    }

    this.events[name] = this.events[name].filter((fn) => fn !== listener);
  }

  emit(name, ...args) {
    const isNameString = z.string().check(name);

    if (!isNameString) {
      throw new Error('Invalid name argument');
    }

    if (this.checkEvents(name)) {
      this.events[name].forEach((fn) => fn(...args));
    }
  }

  prependListener(name, listener) {
    this.checkArgs(name, listener);

    if (!this.checkEvents(name)) {
      this.events[name] = [];
    }

    this.events[name].unshift(listener);
  }

  prependOnceListener(name, listener) {
    this.checkArgs(name, listener);

    const onceListener = (...args) => {
      listener(...args);
      this.off(name, onceListener);
    };

    this.prependListener(name, onceListener);
  }

  removeAllListeners([names]) {
    const isNamesArray = z.array(z.string()).check(names);

    if (!isNamesArray) {
      throw new Error('Invalid names argument');
    }

    if (names) {
      names.forEach((name) => delete this.events[name]);
    } else {
      this.events = {};
    }
  }

  listenerCount(name) {
    const isNameString = z.string().check(name);

    if (!isNameString) {
      throw new Error('Invalid name argument');
    }

    return this.events[name] ? this.events[name].length : 0;
  }
}
