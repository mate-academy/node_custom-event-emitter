/* eslint-disable max-len */

'use strict';

const { EventEmitter } = require('../src/MyEventEmitter');

describe('EventEmitter "removeAllListeners" method tests', () => {
  let emitter;
  let listener1;
  let listener2;

  beforeEach(() => {
    emitter = new EventEmitter();
    listener1 = jest.fn();
    listener2 = jest.fn();
  });

  test('should remove all listeners for a specified event', () => {
    emitter.on('event', listener1);
    emitter.on('event', listener2);
    emitter.emit('event');
    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(1);

    emitter.removeAllListeners('event');
    emitter.emit('event');
    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(1);
  });

  test('should remove all listeners for all events when called without arguments', () => {
    emitter.on('event1', listener1);
    emitter.on('event2', listener2);
    emitter.emit('event1');
    emitter.emit('event2');
    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(1);

    emitter.removeAllListeners();
    emitter.emit('event1');
    emitter.emit('event2');
    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(1);
  });

  test('should not remove listeners from other events when removing listeners from a specific event', () => {
    emitter.on('event1', listener1);
    emitter.on('event2', listener2);
    emitter.emit('event1');
    emitter.emit('event2');

    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(1);

    emitter.removeAllListeners('event1');
    emitter.emit('event1');
    emitter.emit('event2');

    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(2);
  });
});
