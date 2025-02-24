'use strict';

// const listenerListType = {
//   listenerName: 'name',
//   list: [
//     {
//       callback: () => {},
//       type: 'on',
//     },
//   ],
// };

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
  off(listenerName) {
    this.listeners = this.listeners.filter(
      (listener) => listener.listenerName !== listenerName,
    );
  }
  emit(listenerName, ...args) {
    for (const listener of this.listeners) {
      if (listener.listenerName === listenerName) {
        for (const listenerCallback of listener.list) {
          listenerCallback.callFunction(...args);
        }
      }

      listener.list = listener.list.filter(
        (callback) => callback.type !== 'once',
      );
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
    this.listeners.filter((listener) => listener.listenerName !== listenerName);
  }

  listenerCount(listenerName) {
    // console.log('listenerCount', listenerName);

    // console.log(
    //   this.listeners.find((listener) => listener.listenerName === listenerName)
    //     ?.list.length ?? 0,
    // );

    return (
      this.listeners.find((listener) => listener.listenerName === listenerName)
        ?.list.length ?? 0
    );
  }
}

module.exports = MyEventEmitter;

const customEmitter = new MyEventEmitter();

// customEmitter.once('kek', (...args) => {
//   console.log(`ebalo ${args} once`);
// });

// customEmitter.once('kek', (...args) => {
//   console.log(`ebalo ${args} 2`);
// });

// customEmitter.once('kek', (...args) => {
//   console.log(`ebalo ${args} 3`);
// });

// customEmitter.on('kek', () => {
//   console.log('kek1');
// });

// customEmitter.on('kek', () => {
//   console.log('kek2');
// });

// customEmitter.on('kek', () => {
//   console.log('kek3');
// });

customEmitter.emit('kek', 'ebalo', '2');
customEmitter.emit('kek', 'ebalo', '2');
customEmitter.emit('kek', 'ebalo', '2');
customEmitter.listenerCount('kek');
// customEmitter.emit('kek', 'ebalo', '2');
