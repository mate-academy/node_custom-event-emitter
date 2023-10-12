'use strict';

const { EventEmitter } = require('events');
const { MyEventEmitter } = require('../src/MyEventEmitter');

describe('Common methods test', () => {
  const emitter = new EventEmitter();
  const myEmitter = new MyEventEmitter();

  let sumByEmitter = 0;
  let sumByMyEmitter = 0;

  const emitterSum = (a, b) => {
    sumByEmitter += a + b;
  };

  const myEmitterSum = (a, b) => {
    sumByMyEmitter += a + b;
  };

  it('Should call common events', () => {
    emitter.on('sum', emitterSum);
    myEmitter.on('sum', myEmitterSum);

    emitter.emit('sum', 1, 5);
    myEmitter.emit('sum', 1, 5);

    expect(sumByMyEmitter).toBe(sumByEmitter);
  });

  it('Should call "sumOnce", only one time', () => {
    emitter.once('sumOnce', emitterSum);
    myEmitter.once('sumOnce', myEmitterSum);

    emitter.emit('sumOnce', 1, 10);
    myEmitter.emit('sumOnce', 1, 10);
    emitter.emit('sumOnce', 1, 10);
    myEmitter.emit('sumOnce', 1, 10);

    expect(sumByMyEmitter).toBe(sumByEmitter);
  });
});

describe('Prepending methods', () => {
  const emitter = new EventEmitter();
  const myEmitter = new MyEventEmitter();

  it('Should call prepend event first', () => {
    let emitterString = '';
    let myEmitterString = '';

    emitter.on('add', () => {
      emitterString += 'first';
    });

    emitter.prependListener('add', () => {
      emitterString += 'second';
    });

    myEmitter.on('add', () => {
      myEmitterString += 'first';
    });

    myEmitter.prependListener('add', () => {
      myEmitterString += 'second';
    });

    emitter.emit('add');
    myEmitter.emit('add');

    expect(myEmitterString).toBe(emitterString);
  });

  it('Should call "prependOnceListener" only once', () => {
    let emitterSum = 0;
    let myEmitterSum = 0;

    emitter.prependOnceListener('increment', () => {
      emitterSum++;
    });

    myEmitter.prependOnceListener('increment', () => {
      myEmitterSum++;
    });

    emitter.emit('increment');
    emitter.emit('increment');

    myEmitter.emit('increment');
    myEmitter.emit('increment');

    expect(myEmitterSum).toBe(emitterSum);
  });
});

describe('Operating with listeners', () => {
  const emitter = new EventEmitter();
  const myEmitter = new MyEventEmitter();

  it('Should return the correct number of listeners', () => {
    emitter.on('sum', () => {});
    myEmitter.on('sum', () => {});

    const emitterListerenCount = emitter.listenerCount('sum');
    const myEmitterListenerCount = myEmitter.listenerCount('sum');

    expect(myEmitterListenerCount).toBe(emitterListerenCount);
  });

  it('Should remove all listeners for "sum"', () => {
    emitter.removeAllListeners('sum');
    myEmitter.removeAllListeners('sum');

    expect(myEmitter.listenerCount('sum')).toBe(emitter.listenerCount('sum'));
  });

  it('Should remove all listeners', () => {
    emitter.on('action', () => {});
    emitter.on('sum', () => {});
    emitter.on('sum', () => {});
    emitter.prependListener('sum', () => {});

    myEmitter.on('action', () => {});
    myEmitter.on('sum', () => {});
    myEmitter.on('sum', () => {});
    myEmitter.prependListener('sum', () => {});

    const MyEmitterListenerCount
      = myEmitter.listenerCount('action') + myEmitter.listenerCount('sum');
    const emitterListenerCount
      = emitter.listenerCount('action') + emitter.listenerCount('sum');

    expect(MyEmitterListenerCount).toBe(emitterListenerCount);
  });

  it('Should remove only chosen listener', () => {
    let emitterString = '';
    let myEmitterString = '';

    const emitterAddString = () => {
      emitterString += 'shouldBeRemoved';
    };

    emitter.on('stringChange', () => {
      emitterString += 'commonStr';
    });

    emitter.prependListener('stringChange', emitterAddString);

    emitter.off('stringChange', emitterAddString);

    emitter.emit('stringChange');

    const myEmitterAddString = () => {
      myEmitterString += 'shouldBeRemoved';
    };

    myEmitter.on('stringChange', () => {
      myEmitterString += 'commonStr';
    });

    myEmitter.prependListener('stringChange', myEmitterAddString);

    myEmitter.off('stringChange', myEmitterAddString);

    myEmitter.emit('stringChange');

    expect(myEmitterString).toBe(emitterString);
  });

  it('Shpuld not remove anything if there is no such listener', () => {
    let emitterString = '';
    let myEmitterString = '';

    const emitterAddString = () => {
      emitterString += 'shouldBeRemoved';
    };

    emitter.on('stringChange', () => {
      emitterString += 'commonStr';
    });

    emitter.prependListener('stringChange', () => {
      emitterString += 'shouldBeRemoved';
    });

    emitter.off('stringChange', emitterAddString);

    emitter.emit('stringChange');

    const myEmitterAddString = () => {
      myEmitterString += 'shouldBeRemoved';
    };

    myEmitter.on('stringChange', () => {
      myEmitterString += 'commonStr';
    });

    myEmitter.prependListener('stringChange', () => {
      myEmitterString += 'shouldBeRemoved';
    });

    myEmitter.off('stringChange', myEmitterAddString);

    myEmitter.emit('stringChange');

    expect(myEmitterString).toBe(emitterString);
  });

  it('Should work if there is no listeners at all', () => {
    let emitterString = '';
    let myEmitterString = '';

    const emitterAddString = () => {
      emitterString += 'shouldBeRemoved';
    };

    emitter.prependListener('stringChange', emitterAddString);
    emitter.off('notExistedListener', emitterAddString);
    emitter.emit('stringChange');

    const myEmitterAddString = () => {
      myEmitterString += 'shouldBeRemoved';
    };

    myEmitter.prependListener('stringChange', myEmitterAddString);
    myEmitter.off('notExistedListener', myEmitterAddString);
    myEmitter.emit('stringChange');

    expect(myEmitterString).toBe(emitterString);
  });
});
