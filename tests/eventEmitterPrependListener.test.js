/* eslint-disable max-len */

'use strict';

const {
  EventEmitter,
} = require('../src/MyEventEmitter');

describe('EventEmitter "prependListener" method tests', () => {
  let emitter;
  let listener1, listener2;

  beforeEach(() => {
    emitter = new EventEmitter();
    listener1 = jest.fn();
    listener2 = jest.fn();
  });

  test('should prepend the specified listener to the listener array', () => {
    emitter.on('event', listener1);
    emitter.prependListener('event', listener2);

    emitter.emit('event');

    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(1);

    expect(listener2.mock.invocationCallOrder[0])
      .toBeLessThan(listener1.mock.invocationCallOrder[0]);
  });

  test('should not affect other events when prepending a listener', () => {
    emitter.on('event1', listener1);
    emitter.on('event2', listener2);

    const listener3 = jest.fn();

    emitter.prependListener('event1', listener3);

    emitter.emit('event1');
    emitter.emit('event2');

    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(1);
    expect(listener3).toHaveBeenCalledTimes(1);

    expect(listener3.mock.invocationCallOrder[0])
      .toBeLessThan(listener1.mock.invocationCallOrder[0]);
  });

  test('should prepend multiple listeners in reverse order', () => {
    const listener3 = jest.fn();
    const listener4 = jest.fn();

    emitter.prependListener('event', listener1);
    emitter.prependListener('event', listener2);
    emitter.prependListener('event', listener3);
    emitter.prependListener('event', listener4);

    emitter.emit('event');

    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(1);
    expect(listener3).toHaveBeenCalledTimes(1);
    expect(listener4).toHaveBeenCalledTimes(1);

    expect(listener4.mock.invocationCallOrder[0])
      .toBeLessThan(listener3.mock.invocationCallOrder[0]);

    expect(listener3.mock.invocationCallOrder[0])
      .toBeLessThan(listener2.mock.invocationCallOrder[0]);

    expect(listener2.mock.invocationCallOrder[0])
      .toBeLessThan(listener1.mock.invocationCallOrder[0]);
  });
});
