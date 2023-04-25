/* eslint-disable max-len */

'use strict';

const {
  EventEmitter,
} = require('../src/MyEventEmitter');

describe('EventEmitter "on" method tests', () => {
  let emitter;
  let listener;

  beforeEach(() => {
    emitter = new EventEmitter();
    listener = jest.fn();
  });

  test('should add a listener and call it when the event is emitted', () => {
    emitter.on('event', listener);
    emitter.emit('event');

    expect(listener).toHaveBeenCalledTimes(1);
  });

  test('should call the listener each time the event is emitted', () => {
    emitter.on('event', listener);
    emitter.emit('event');
    emitter.emit('event');

    expect(listener).toHaveBeenCalledTimes(2);
  });

  test('should call multiple listeners in the order they were added', () => {
    const listener2 = jest.fn();

    emitter.on('event', listener);
    emitter.on('event', listener2);
    emitter.emit('event');

    expect(listener.mock.invocationCallOrder[0])
      .toBeLessThan(listener2.mock.invocationCallOrder[0]);
  });

  test('should call the listener with the correct arguments', () => {
    emitter.on('event', listener);
    emitter.emit('event', 'arg1', 'arg2');

    expect(listener).toHaveBeenCalledWith('arg1', 'arg2');
  });
});
