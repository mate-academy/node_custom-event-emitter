/* eslint-disable max-len */
/* eslint-disable no-console */
'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(eventName, listener) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    if (!listener) {
      const noListenerCase = () => {};

      this.listeners[eventName].push(noListenerCase);

      return;
    }
    this.listeners[eventName].push(listener);
  }
  once(eventName, listener) {
    const resolveOnce = (...args) => {
      if (listener) {
        listener(...args);
        this.off(eventName, listener);

        return;
      }
      this.off(eventName, () => {});
    };

    this.on(eventName, resolveOnce);
  }
  off(eventName, listener) {
    if (!listener) {
      delete this.listeners[eventName];

      return;
    }

    if (this.listeners[eventName]) {
      const removalIndex = this.listeners[eventName]
        .findIndex(curListener => curListener === listener);

      this.listeners[eventName].splice(removalIndex, 1);
    }
  }
  emit(eventName, ...args) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach(listener => listener(...args));
    }
  }
  prependListener(eventName, listener) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    if (!listener) {
      const noListenerCase = () => {};

      this.listeners[eventName].unshift(noListenerCase);

      return;
    }
    this.listeners[eventName].unshift(listener);
  }
  prependOnceListener(eventName, listener) {
    const resolveOnce = (...args) => {
      if (listener) {
        listener(...args);
        this.off(eventName, listener);

        return;
      }
      this.off(eventName, () => {});
    };

    this.prependListener(eventName, resolveOnce);
  }
  removeAllListeners(eventName) {
    if (!eventName) {
      this.listeners = {};

      return;
    }

    delete this.listeners[eventName];
  }
  listenerCount(eventName) {
    if (this.listeners[eventName]) {
      console.log(this.listeners[eventName].length);

      return this.listeners[eventName].length;
    }
    console.log(0);

    return 0;
  }
}

const emitter = new MyEventEmitter();

emitter.on('joke', (newJoke) => {
  console.log(newJoke);
});

emitter.once('joke2', (newJoke) => {
  console.log(newJoke);
});

emitter.prependListener('joke', (newJoke) => {
  console.log(newJoke);
});

emitter.on('joke4', (newJoke) => {
  console.log(newJoke);
});

emitter.emit('joke', 'Why do programmers wear glasses?Because they need to C#');
emitter.emit('joke', 'A byte walks into a bar looking miserable. The bartender asks it: "Whats wrong buddy?""Parity error." it replies. "Ah that makes sense, I thought you looked a bit off.');
emitter.emit('joke2', 'Why did the JavaScript heap close shop?It ran out of memory.');

emitter.removeAllListeners();

emitter.emit('joke4', 'o whats a set of predefined steps the government might take to preserve the environment?An Al-Gore-ithm.');

emitter.on('joke', (newJoke) => {
  console.log(newJoke);
});

emitter.emit('joke2', 'Why did the JavaScript heap close shop?It ran out of memory.');
emitter.removeAllListeners('joke4');
emitter.listenerCount('joke');
emitter.listenerCount();

emitter.on('joke');
emitter.emit('joke', 'Why did the JavaScript heap close shop?It ran out of memory.');

emitter.once('joke5');
emitter.off('joke5');
emitter.emit('joke5', 'Just testm no jokes');
