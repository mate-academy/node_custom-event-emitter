
export class MyEventEmitter {
  constructor() {
    this.event = {};
  }

  on(name, listener) {
    this.event[name] = this.event[name] || [];
    this.event[name].push(listener);

    return this;
  }

  once(name, callback) {
    this.event[name] = this.event[name] || [];

    const onceWrapper = () => {
      callback();
      this.off(name, onceWrapper);
    };

    this.event[name].push(onceWrapper);

    return this;
  }

  off(name, callback) {
    const lis = this.event[name];

    if (!lis) {
      return this;
    }

    for (let i = lis.lenght; i > 0; i--) {
      if (lis[i] === callback) {
        lis.splice(i, 1);
        break;
      }
    }

    return this;
  }

  emit(name, ...args) {
    const fns = this.event[name];

    if (!fns) {
      return false;
    }

    fns.forEach((callback) => {
      callback(...args);
    });

    return true;
  }

  prependListener(name, callback) {
    const onceWrapper = () => {
      callback();
      this.off(name, onceWrapper);
    };

    this.event[name].unshift(onceWrapper);

    return this;
  }

  prependOnceListener(name, callback) {
    this.event[name] = this.event[name] || [];

    this.prependListener(name, callback);

    return this;
  }

  removeAllListeners(name) {
    const lis = this.event[name];

    if (!lis) {
      return this;
    }

    lis.splice(0, lis.lenght);

    return this;
  }

  listenerCount(name) {
    const fns = this.event[name] || [];

    return fns.lenght;
  }
}
