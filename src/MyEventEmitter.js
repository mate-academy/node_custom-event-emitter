'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = [];
  }

  on(listenerName, callFunction) {
    const currentListener = this.listeners.find(
      (listener) => listener.listenerName === listenerName,
    );

    // console.log(listenerName, currentListener);

    if (currentListener) {
      currentListener.list.push({
        type: 'on',
        callFunction,
      });

      return;
    }

    this.listeners.push({
      listenerName,
      list: [
        {
          type: 'on',
          callFunction,
        },
      ],
    });
  }
  once(listenerName, callFunction) {
    const currentListener = this.listeners.find(
      (listener) => listener.listenerName === listenerName,
    );

    if (currentListener) {
      currentListener.list.push({
        type: 'once',
        callFunction,
      });

      return;
    }

    this.listeners.push({
      listenerName,
      list: [
        {
          type: 'once',
          callFunction,
        },
      ],
    });
  }
  off(listenerName, callFunction) {
    this.listeners = this.listeners
      .map((listener) => {
        if (listener.listenerName === listenerName) {
          return {
            ...listener,
            list: listener.list.filter(
              (callback) => callback.callFunction !== callFunction,
            ),
          };
        }

        return listener;
      })
      .filter((listener) => listener.list.length > 0);
  }
  emit(listenerName, ...args) {
    for (const listener of this.listeners) {
      if (listener.listenerName === listenerName) {
        listener.list = listener.list.filter((callback) => {
          callback.callFunction(...args);

          return callback.type !== 'once';
        });
      }
    }
  }
  prependListener(listenerName, callFunction) {
    const currentListener = this.listeners.find(
      (listener) => listener.listenerName === listenerName,
    );

    if (currentListener) {
      currentListener.list.unshift({
        type: 'on',
        callFunction,
      });

      return;
    }

    this.listeners.push({
      listenerName,
      list: [
        {
          type: 'on',
          callFunction,
        },
      ],
    });
  }
  prependOnceListener(listenerName, callFunction) {
    const currentListener = this.listeners.find(
      (listener) => listener.listenerName === listenerName,
    );

    if (currentListener) {
      currentListener.list.unshift({
        type: 'once',
        callFunction,
      });

      return;
    }

    this.listeners.push({
      listenerName,
      list: [
        {
          type: 'once',
          callFunction,
        },
      ],
    });
  }

  removeAllListeners(listenerName) {
    this.listeners = this.listeners.filter(
      (listener) => listener.listenerName !== listenerName,
    );
  }

  listenerCount(listenerName) {
    return (
      this.listeners.find((listener) => listener.listenerName === listenerName)
        ?.list.length ?? 0
    );
  }
}

module.exports = MyEventEmitter;
