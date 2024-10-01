'use strict';

class MyEventEmitter {
  listeners = [];
  on(event, callback) {
    this.listeners.push({ [event]: callback });
  }
  once(event, callback) {
    this.listeners.push({ [event]: callback, once: true });
  }
  off(event, callback) {
    this.listeners = this.listeners.filter(
      (listener) =>
        !Object.keys(listener).includes(event) ||
        (listener[event].toString() !== callback.toString() &&
          Object.keys(listener).includes(event)),
    );
  }
  emit(event, ...args) {
    const listeners = this.listeners.filter(
      (elem) =>
        // eslint-disable-next-line comma-dangle
        Object.keys(elem).includes(event),
      // eslint-disable-next-line function-paren-newline
    );

    if (listeners.length) {
      listeners.forEach((listener) => listener[event](args));

      this.listeners = this.listeners.filter((listener) => {
        const keys = Object.keys(listener);

        return (
          !keys.includes(event) ||
          (keys.includes(event) && !keys.includes('once'))
        );
      });
    }
  }
  prependListener(event, callback) {
    return (this.listeners = [{ [event]: callback }, ...this.listeners]);
  }
  prependOnceListener(event, callback) {
    return (this.listeners = [
      { [event]: callback, once: true },
      ...this.listeners,
    ]);
  }
  removeAllListeners() {
    return (this.listeners = []);
  }
  listenerCount() {
    return this.listeners.length;
  }
}

// const emitter = new MyEventEmitter();

// const callback = () => {
//   console.log('hello');
// };

// const callback1 = () => {
//   console.log('hello1');
// };

// emitter.on('yes', () => console.log('yes'));

// emitter.on('hello', callback);
// emitter.on('hello', callback1);
// emitter.on('hello', () => {
//   console.log('yo!');
// });

// emitter.emit('hello');
// emitter.off('hello', () => {
//   console.log('hello');
// });
// emitter.emit('hello');

module.exports = MyEventEmitter;
