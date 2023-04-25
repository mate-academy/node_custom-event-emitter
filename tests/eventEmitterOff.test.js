/* eslint-disable max-len */

'use strict';

const {
  EventEmitter,
} = require('../src/MyEventEmitter');

describe('EventEmitter "off" method tests', () => {
  let emitter;

  beforeEach(() => {
    emitter = new EventEmitter();
  });

  test('should remove the specified listener from the listener array', () => {
    const listener = jest.fn();

    emitter.on('event', listener);
    emitter.emit('event');
    expect(listener).toHaveBeenCalledTimes(1);

    emitter.off('event', listener);
    emitter.emit('event');
    expect(listener).toHaveBeenCalledTimes(1);
  });

  test('should remove a listener added multiple times, one at a time', () => {
    const listener = jest.fn();

    emitter.on('event', listener);
    emitter.on('event', listener);
    emitter.emit('event');
    expect(listener).toHaveBeenCalledTimes(2);

    emitter.off('event', listener);
    emitter.emit('event');
    expect(listener).toHaveBeenCalledTimes(3);

    emitter.off('event', listener);
    emitter.emit('event');
    expect(listener).toHaveBeenCalledTimes(3);
  });

  test('should not remove listeners from other events', () => {
    const listener1 = jest.fn();
    const listener2 = jest.fn();

    emitter.on('event1', listener1);
    emitter.on('event2', listener2);
    emitter.emit('event1');
    emitter.emit('event2');
    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(1);

    emitter.off('event1', listener1);
    emitter.emit('event1');
    emitter.emit('event2');
    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(2);
  });
});
