/* eslint-disable max-len */

'use strict';

const { EventEmitter } = require('../src/MyEventEmitter');

describe('EventEmitter "prependOnceListener" method tests', () => {
  let emitter;
  let listener1;
  let listener2;

  beforeEach(() => {
    emitter = new EventEmitter();
    listener1 = jest.fn();
    listener2 = jest.fn();
  });

  test('should prepend a listener that is executed only once', () => {
    emitter.prependOnceListener('event', listener1);
    emitter.emit('event');
    emitter.emit('event');

    expect(listener1).toHaveBeenCalledTimes(1);
  });

  test('should prepend a listener that is executed before other listeners', () => {
    emitter.on('event', listener2);
    emitter.prependOnceListener('event', listener1);

    emitter.emit('event');

    expect(listener1.mock.invocationCallOrder[0])
      .toBeLessThan(listener2.mock.invocationCallOrder[0]);
    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(1);
  });

  test('should not affect other event listeners', () => {
    emitter.on('event1', listener1);
    emitter.on('event2', listener2);
    emitter.prependOnceListener('event1', listener2);

    emitter.emit('event1');
    emitter.emit('event2');

    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(2);
  });

  test('should not execute the listener after it has been removed', () => {
    emitter.prependOnceListener('event', listener1);
    emitter.off('event', listener1);
    emitter.emit('event');

    expect(listener1).toHaveBeenCalledTimes(0);
  });
});
