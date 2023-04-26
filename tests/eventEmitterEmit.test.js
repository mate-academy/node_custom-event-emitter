/* eslint-disable max-len */

'use strict';

const {
  EventEmitter,
} = require('../src/MyEventEmitter');

describe('EventEmitter "emit" method tests', () => {
  let emitter;
  let listener1;
  let listener2;

  beforeEach(() => {
    emitter = new EventEmitter();
    listener1 = jest.fn();
    listener2 = jest.fn();
  });

  test('should call the listener when an event is emitted', () => {
    emitter.on('event', listener1);

    emitter.emit('event');
    expect(listener1).toHaveBeenCalledTimes(1);
  });

  test('should call multiple listeners for the same event', () => {
    emitter.on('event', listener1);
    emitter.on('event', listener2);

    emitter.emit('event');
    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(1);
  });

  test('should pass arguments to the listener when emitting an event', () => {
    const arg1 = 'argument1';
    const arg2 = 'argument2';

    emitter.on('event', listener1);

    emitter.emit('event', arg1, arg2);
    expect(listener1).toHaveBeenCalledWith(arg1, arg2);
  });

  test('should not call listeners for other events', () => {
    emitter.on('event1', listener1);
    emitter.on('event2', listener2);

    emitter.emit('event1');
    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(0);
  });
});
