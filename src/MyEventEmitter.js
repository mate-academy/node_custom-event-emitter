'use strict';

class MyEventEmitter {
  listeners = {};

  on(eventName, listener) {
    if (!(eventName in this.listeners)) {
      this.listeners[eventName] = [{callback: listener, once: false}];
    } else {
      this.listeners[eventName].push({callback: listener, once: false});
    }

    return this;
  }

  off(eventName, listener) {
    if (eventName in this.listeners) {
      delete this.listeners[eventName];
    }

    return this;
  }

  once(eventName, listener) {
    if (!(eventName in this.listeners)) {
      this.listeners[eventName] = [{callback: listener, once: true}];
    } else {
      this.listeners[eventName].push({callback: listener, once: true});
    }

    return this;
  }

  emit(eventName, ...args) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach(lis => {
        lis.callback(...args);
        if (lis.once === true) {
          this.off(eventName, lis.callback)
        }
      });

      return true;
    }

    return false;
  }

  prependListener(eventName, listener) {
    if (!(eventName in this.listeners)) {
      this.listeners[eventName] = [{callback: listener, once: false}];
    } else {
      this.listeners[eventName].unshift({callback: listener, once: false});
    }

    return this;
  }

  prependOnceListener(eventName, listener) {
    if (!(eventName in this.listeners)) {
      this.listeners[eventName] = [{callback: listener, once: true}];
    } else {
      this.listeners[eventName].unshift({callback: listener, once: true});
    }
  }

  removeAllListeners(...eventNames) {
    if (eventNames.length) {
      eventNames.forEach(eventName => delete this.listeners[eventName]);
    } else {
      this.listeners = {};
    }

    return this;
  }

  listenerCount(eventName, listener) {
    if (!listener) {
      if (this.listeners[eventName]) {
        return this.listeners[eventName].length;
      } else {
        return 0;
      }
    }

    return this.listeners[eventName]
      .filter(callback => callback === listener).length || 0;
  }
}

const t = new MyEventEmitter();

function a() {}
function b() {}
function c() {}

console.log(t)
t.on('a', a);
t.on('a', c);
t.on('b', a);
t.on('c', b);
t.once('c', a);

t.off('a', a);
t.prependListener('a', b)
t.removeAllListeners('c');
console.log(t.listeners)


module.exports = {
  MyEventEmitter,
};
