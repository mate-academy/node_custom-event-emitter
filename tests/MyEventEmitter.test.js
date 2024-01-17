/* eslint-disable max-len */
'use strict';

const fs = require('fs');
const path = require('path');
const MyEventEmitter = require('../src/MyEventEmitter');
const EventEmitter = require('events');

describe('MyEventEmitter', () => {
  let emitter;

  beforeEach(() => {
    emitter = new MyEventEmitter();
  });

  test('should verify absence of external library dependencies in MyEventEmitter', () => {
    const sourceFile = path
      .resolve(__dirname, '..', 'src', 'MyEventEmitter.js');
    const fileContent = fs.readFileSync(sourceFile, 'utf8');
    const hasCommonJSRequire = /require\(/g.test(fileContent);
    const hasESImports = /import\s+\S+\s+from\s+['"].+['"]/g.test(fileContent);

    expect(hasCommonJSRequire).toBe(false);
    expect(hasESImports).toBe(false);
  });

  test('should confirm MyEventEmitter is distinct from Node.js EventEmitter', () => {
    expect(emitter).not.toBeInstanceOf(EventEmitter);
  });

  test('should accurately count listeners for a specific event with "listenerCount" method', () => {
    expect(emitter.listenerCount('listenerCountEvent')).toBe(0);

    emitter.on('listenerCountEvent', () => {});

    expect(emitter.listenerCount('listenerCountEvent')).toBe(1);
  });

  test('should add event listeners and reflect correct count using the "on" method', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    expect(emitter.listenerCount('onEvent1')).toBe(0);
    expect(emitter.listenerCount('onEvent2')).toBe(0);

    emitter.on('onEvent1', callback1);

    expect(emitter.listenerCount('onEvent1')).toBe(1);
    expect(emitter.listenerCount('onEvent2')).toBe(0);

    emitter.on('onEvent1', callback2);
    emitter.on('onEvent2', callback2);

    expect(emitter.listenerCount('onEvent1')).toBe(2);
    expect(emitter.listenerCount('onEvent2')).toBe(1);
  });

  test('should trigger callbacks added for a given event with "emit" method', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();

    emitter.on('emitEvent1', callback1);
    emitter.on('emitEvent1', callback2);
    emitter.on('emitEvent2', callback3);
    emitter.emit('emitEvent1', 1, 2, 3);

    expect(emitter.listenerCount('emitEvent1')).toBe(2);
    expect(emitter.listenerCount('emitEvent2')).toBe(1);
    expect(callback1).toHaveBeenCalledWith(1, 2, 3);
    expect(callback2).toHaveBeenCalledWith(1, 2, 3);
    expect(callback3).not.toHaveBeenCalled();

    expect(callback1.mock.invocationCallOrder[0])
      .toBeLessThan(callback2.mock.invocationCallOrder[0]);

    emitter.on('emitEvent2', callback1);
    emitter.emit('emitEvent2', 'test');

    expect(emitter.listenerCount('emitEvent1')).toBe(2);
    expect(emitter.listenerCount('emitEvent2')).toBe(2);
    expect(callback3).toHaveBeenCalledWith('test');
    expect(callback1).toHaveBeenCalledWith('test');
    expect(callback2).not.toHaveBeenCalledWith('test');

    expect(callback3.mock.invocationCallOrder[0])
      .toBeLessThan(callback1.mock.invocationCallOrder[1]);
  });

  test('should remove specified event listener using the "off" method and update listener count', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    emitter.on('offEvent', callback1);
    emitter.on('offEvent', callback2);

    expect(emitter.listenerCount('offEvent')).toBe(2);

    emitter.off('offEvent', callback1);
    emitter.emit('offEvent', 'test');

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledWith('test');
    expect(emitter.listenerCount('offEvent')).toBe(1);
  });

  test('should register and invoke a callback exactly once for an event with "once" method', () => {
    const callback1 = jest.fn();

    emitter.once('onceEvent', callback1);

    expect(emitter.listenerCount('onceEvent')).toBe(1);

    emitter.emit('onceEvent', 'Hello');
    emitter.emit('onceEvent', 'World');

    expect(callback1).toHaveBeenCalledWith('Hello');
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(emitter.listenerCount('onceEvent')).toBe(0);
  });

  test('should add a new listener at the beginning for an event with "prependListener" method', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    emitter.on('prependListenerEvent', callback1);
    emitter.prependListener('prependListenerEvent', callback2);
    emitter.emit('prependListenerEvent', 'test');

    expect(emitter.listenerCount('prependListenerEvent')).toBe(2);
    expect(callback1).toHaveBeenCalledWith('test');
    expect(callback2).toHaveBeenCalledWith('test');

    expect(callback2.mock.invocationCallOrder[0])
      .toBeLessThan(callback1.mock.invocationCallOrder[0]);
  });

  test('should prepend a one-time listener and invoke it once with "prependOnceListener" method', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    emitter.on('prependOnceListenerEvent', callback1);
    emitter.prependOnceListener('prependOnceListenerEvent', callback2);

    expect(emitter.listenerCount('prependOnceListenerEvent')).toBe(2);

    emitter.emit('prependOnceListenerEvent', 'test');
    emitter.emit('prependOnceListenerEvent', 'test2');

    expect(emitter.listenerCount('prependOnceListenerEvent')).toBe(1);
    expect(callback1).toHaveBeenCalledWith('test');
    expect(callback2).toHaveBeenCalledWith('test');
    expect(callback2).toHaveBeenCalledTimes(1);

    expect(callback2.mock.invocationCallOrder[0])
      .toBeLessThan(callback1.mock.invocationCallOrder[0]);
  });

  test('should clear all listeners for an event with "removeAllListeners" method', () => {
    const callback = jest.fn();

    emitter.on('removeAllListenersEvent', callback);
    emitter.emit('removeAllListenersEvent', 'test');

    expect(emitter.listenerCount('removeAllListenersEvent')).toBe(1);

    emitter.removeAllListeners('removeAllListenersEvent');
    emitter.emit('removeAllListenersEvent', 'test2');

    expect(callback).toHaveBeenCalledWith('test');
    expect(callback).toHaveBeenCalledTimes(1);
    expect(emitter.listenerCount('removeAllListenersEvent')).toBe(0);
  });
});
