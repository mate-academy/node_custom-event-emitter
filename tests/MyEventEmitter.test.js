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

  test('should not use external libraries', () => {
    const sourceFile = path
      .resolve(__dirname, '..', 'src', 'MyEventEmitter.js');
    const fileContent = fs.readFileSync(sourceFile, 'utf8');
    const hasCommonJSRequire = /require\(/g.test(fileContent);
    const hasESImports = /import\s+\S+\s+from\s+['"].+['"]/g.test(fileContent);

    expect(hasCommonJSRequire).toBe(false);
    expect(hasESImports).toBe(false);
  });

  test('should not use Node.js EventEmitter', () => {
    expect(emitter).not.toBeInstanceOf(EventEmitter);
  });

  test('should have working "listenerCount" method', () => {
    expect(emitter.listenerCount('listenerCountEvent')).toBe(0);
  });

  test('should have working "on" method', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    expect(emitter.listenerCount('onEvent1')).toBe(0);

    emitter.on('onEvent1', callback1);

    expect(emitter.listenerCount('onEvent1')).toBe(1);

    emitter.on('onEvent1', callback2);
    emitter.on('onEvent2', callback2);

    expect(emitter.listenerCount('onEvent1')).toBe(2);
    expect(emitter.listenerCount('onEvent2')).toBe(1);
  });

  test('should have working "emit" method', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();

    emitter.on('emitEvent1', callback1);
    emitter.on('emitEvent1', callback2);
    emitter.on('emitEvent2', callback3);
    emitter.emit('emitEvent1', 1, 2, 3);

    expect(callback1).toHaveBeenCalledWith(1, 2, 3);
    expect(callback2).toHaveBeenCalledWith(1, 2, 3);
    expect(callback3).not.toHaveBeenCalled();
    expect(emitter.listenerCount('emitEvent1')).toBe(2);
  });

  test('should have working "off" method', () => {
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

  test('should have working "once" method', () => {
    const callback1 = jest.fn();

    emitter.once('onceEvent', callback1);

    expect(emitter.listenerCount('onceEvent')).toBe(1);

    emitter.emit('onceEvent', 'Hello');
    emitter.emit('onceEvent', 'World');

    expect(callback1).toHaveBeenCalledWith('Hello');
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(emitter.listenerCount('onceEvent')).toBe(0);
  });

  test('should have working "prependListener" method', () => {
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

  test('should have working "prependOnceListener" method', () => {
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

  test('should have working "removeAllListeners" method', () => {
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
