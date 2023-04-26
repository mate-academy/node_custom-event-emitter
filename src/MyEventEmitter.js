'use strict';

class MyEventEmitter {
  on() {}
  once() {}
  off() {}
  emit() {}
  prependListener() {}
  prependOnceListener() {}
  removeAllListeners() {}
  listenerCount() {}
}

module.exports = {
  EventEmitter: MyEventEmitter,
};
