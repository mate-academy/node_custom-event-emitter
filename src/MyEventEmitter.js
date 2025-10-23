'use strict';

class MyEventEmitter {
  listenersMap = new Map();
  onceListenersMap = new Map();

  on(event, callback) {
    let updatedCallbacksArray = this.listenersMap.get(event);

    if (!updatedCallbacksArray) {
      updatedCallbacksArray = [];
    }

    updatedCallbacksArray.push(callback);

    this.listenersMap.set(event, updatedCallbacksArray);
  }

  once(event, callback) {
    let updatedOnceCallbacksArray = this.onceListenersMap.get(event);

    if (!updatedOnceCallbacksArray) {
      updatedOnceCallbacksArray = [];
    }

    this.on(event, callback);

    updatedOnceCallbacksArray.push(callback);
    this.onceListenersMap.set(event, updatedOnceCallbacksArray);
  }

  off(event, callback) {
    let updatedCallbacksArray = this.listenersMap.get(event);

    if (!updatedCallbacksArray || !updatedCallbacksArray.includes(callback)) {
      return;
    }

    updatedCallbacksArray = updatedCallbacksArray.filter(
      (cal) => cal !== callback,
    );

    this.listenersMap.set(event, updatedCallbacksArray);
  }

  emit(event, ...args) {
    const callbacksToCall = this.listenersMap.get(event);
    let onceCallbacksForEvent = this.onceListenersMap.get(event) || [];

    if (!callbacksToCall || !callbacksToCall.length) {
      return;
    }

    for (const cal of callbacksToCall) {
      cal(...args);
    }

    for (const cal of callbacksToCall) {
      if (onceCallbacksForEvent.includes(cal)) {
        this.off(event, cal);

        onceCallbacksForEvent = onceCallbacksForEvent.filter(
          (calOnce) => calOnce !== cal,
        );
      }
    }

    this.onceListenersMap.set(event, onceCallbacksForEvent);
  }

  prependListener(event, callback) {
    let updatedCallbacksArray = this.listenersMap.get(event);

    if (!updatedCallbacksArray) {
      updatedCallbacksArray = [];
    }

    updatedCallbacksArray.unshift(callback);
    this.listenersMap.set(event, updatedCallbacksArray);
  }

  prependOnceListener(event, callback) {
    let updatedOnceCallbacksArray = this.onceListenersMap.get(event);

    if (!updatedOnceCallbacksArray) {
      updatedOnceCallbacksArray = [];
    }

    this.prependListener(event, callback);

    updatedOnceCallbacksArray.unshift(callback);
    this.onceListenersMap.set(event, updatedOnceCallbacksArray);
  }

  removeAllListeners(event) {
    if (!event) {
      this.listenersMap.clear();
      this.onceListenersMap.clear();

      return;
    }

    this.listenersMap.delete(event);
    this.onceListenersMap.delete(event);
  }

  listenerCount(event) {
    if (!this.listenersMap.get(event)) {
      return 0;
    }

    return this.listenersMap.get(event).length;
  }
}

module.exports = MyEventEmitter;
