/* eslint-disable max-len */

'use strict';

const {
  EventEmitter,
} = require('../src/MyEventEmitter');

describe('EventEmitter "once" method tests', () => {
  let emitter;
  let listener;

  beforeEach(() => {
    emitter = new EventEmitter();
    listener = jest.fn();
  });

  test('should execute the listener only once', () => {
    emitter.once('event', listener);
    emitter.emit('event');
    emitter.emit('event');
    expect(listener).toHaveBeenCalledTimes(1);
  });

  test('should not execute the listener after the event is removed', () => {
    emitter.once('event', listener);
    emitter.off('event', listener);
    emitter.emit('event');
    expect(listener).toHaveBeenCalledTimes(0);
  });

  test('should execute multiple listeners registered with once in the order they were added', () => {
    const listener2 = jest.fn();

    emitter.once('event', listener);
    emitter.once('event', listener2);

    emitter.emit('event');

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(1);
    expect(listener.mock.invocationCallOrder[0]).toBeLessThan(listener2.mock.invocationCallOrder[0]);
  });

  test('should not execute removed listeners registered with once', () => {
    const listener2 = jest.fn();

    emitter.once('event', listener);
    emitter.once('event', listener2);

    emitter.off('event', listener);

    emitter.emit('event');

    expect(listener).toHaveBeenCalledTimes(0);
    expect(listener2).toHaveBeenCalledTimes(1);
  });
});
