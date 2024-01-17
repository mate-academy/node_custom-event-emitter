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

  test('should have working "on" and "emit" methods', () => {
    const callback = jest.fn();

    emitter.on('testEvent', callback);
    emitter.emit('testEvent', 1, 2, 3);

    expect(callback).toHaveBeenCalledWith(1, 2, 3);
  });

  test('should have working "once" method', () => {
    const callback = jest.fn();

    emitter.once('onceEvent', callback);
    emitter.emit('onceEvent', 'Hello');
    emitter.emit('onceEvent', 'World');

    expect(callback).toHaveBeenCalledWith('Hello');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should have working "off" method', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    emitter.on('offEvent', callback1);
    emitter.on('offEvent', callback2);
    emitter.off('offEvent', callback1);
    emitter.emit('offEvent', 'test');

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledWith('test');
  });

  test('should have working "prependListener" method', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    emitter.on('prependEvent', callback1);
    emitter.prependListener('prependEvent', callback2);
    emitter.emit('prependEvent', 'test');

    expect(callback2).toHaveBeenCalledWith('test');
    expect(callback1).toHaveBeenCalledWith('test');
  });

  test('should have working "prependOnceListener" method', () => {
    const callback = jest.fn();

    emitter.prependOnceListener('prependOnceEvent', callback);
    emitter.emit('prependOnceEvent', 'test');
    emitter.emit('prependOnceEvent', 'test2');

    expect(callback).toHaveBeenCalledWith('test');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should have working "removeAllListeners" method', () => {
    const callback = jest.fn();

    emitter.on('removeAllEvent', callback);
    emitter.emit('removeAllEvent', 'test');
    emitter.removeAllListeners('removeAllEvent');
    emitter.emit('removeAllEvent', 'test2');

    expect(callback).toHaveBeenCalledWith('test');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should have working "listenerCount" method', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    emitter.on('countEvent', callback1);
    emitter.once('countEvent', callback2);

    expect(emitter.listenerCount('countEvent')).toBe(2);
  });
});
