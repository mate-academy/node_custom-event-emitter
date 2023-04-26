/* eslint-disable max-len */

'use strict';

const { EventEmitter } = require('../src/MyEventEmitter');

describe('EventEmitter "listenerCount" method tests', () => {
  let emitter;

  beforeEach(() => {
    emitter = new EventEmitter();
  });

  test('should return the correct number of listeners for an event', () => {
    const listener1 = jest.fn();
    const listener2 = jest.fn();
    const listener3 = jest.fn();

    emitter.on('event', listener1);
    emitter.on('event', listener2);
    emitter.on('event', listener3);

    const count = emitter.listenerCount('event');
    expect(count).toBe(3);
  });

  test('should return 0 when no listeners are attached to an event', () => {
    const count = emitter.listenerCount('event');
    expect(count).toBe(0);
  });

  test('should return the updated count after adding or removing listeners', () => {
    const listener1 = jest.fn();
    const listener2 = jest.fn();

    emitter.on('event', listener1);
    expect(emitter.listenerCount('event')).toBe(1);

    emitter.on('event', listener2);
    expect(emitter.listenerCount('event')).toBe(2);

    emitter.off('event', listener1);
    expect(emitter.listenerCount('event')).toBe(1);

    emitter.off('event', listener2);
    expect(emitter.listenerCount('event')).toBe(0);
  });
});
