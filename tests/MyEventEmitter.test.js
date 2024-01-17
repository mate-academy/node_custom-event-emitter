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

  test('should NOT use external library dependencies', () => {
    const sourceFile = path
      .resolve(__dirname, '..', 'src', 'MyEventEmitter.js');
    const fileContent = fs.readFileSync(sourceFile, 'utf8');
    const hasCommonJSRequire = /require\(/g.test(fileContent);
    const hasESImports = /import\s+\S+\s+from\s+['"].+['"]/g.test(fileContent);

    expect(hasCommonJSRequire).toBe(false);
    expect(hasESImports).toBe(false);
  });

  test('should NOT extend from Node.js EventEmitter', () => {
    expect(emitter).not.toBeInstanceOf(EventEmitter);
  });

  describe('with "listenerCount" method', () => {
    test('should return 0 for a non-existent event', () => {
      expect(emitter.listenerCount('nonExistentEvent')).toBe(0);
    });

    test('should accurately count listeners for a specific event', () => {
      expect(emitter.listenerCount('listenerCountEvent')).toBe(0);

      emitter.on('listenerCountEvent', () => {});

      expect(emitter.listenerCount('listenerCountEvent')).toBe(1);
    });
  });

  describe('with "on" method', () => {
    test('should add a listener for a given event', () => {
      const callback = jest.fn();

      emitter.on('onEvent', callback);
      emitter.emit('onEvent', 'test');

      expect(callback).toHaveBeenCalledWith('test');
    });

    test('should add multiple listeners for a given event', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.on('onEvent', callback1);
      emitter.on('onEvent', callback2);
      emitter.emit('onEvent', 'test');

      expect(callback1).toHaveBeenCalledWith('test');
      expect(callback2).toHaveBeenCalledWith('test');
    });

    test('should add multiple listeners for multiple events', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.on('onEvent1', callback1);
      emitter.on('onEvent2', callback2);
      emitter.emit('onEvent1', 'test1');
      emitter.emit('onEvent2', 'test2');

      expect(callback1).toHaveBeenCalledWith('test1');
      expect(callback2).toHaveBeenCalledWith('test2');
    });
  });

  describe('with "emit" method', () => {
    test('should trigger callbacks added for a given event', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.on('emitEvent', callback1);
      emitter.on('emitEvent', callback2);
      emitter.emit('emitEvent', 'test');

      expect(emitter.listenerCount('emitEvent')).toBe(2);
      expect(callback1).toHaveBeenCalledWith('test');
      expect(callback2).toHaveBeenCalledWith('test');
    });

    test('should trigger callbacks added for multiple events', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.on('emitEvent1', callback1);
      emitter.on('emitEvent2', callback2);
      emitter.emit('emitEvent1', 'test1');
      emitter.emit('emitEvent2', 'test2');

      expect(emitter.listenerCount('emitEvent1')).toBe(1);
      expect(emitter.listenerCount('emitEvent2')).toBe(1);
      expect(callback1).toHaveBeenCalledWith('test1');
      expect(callback2).toHaveBeenCalledWith('test2');
    });

    test('should trigger callbacks added for multiple events multiple times', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.on('emitEvent1', callback1);
      emitter.on('emitEvent2', callback2);
      emitter.emit('emitEvent1', 'test1');
      emitter.emit('emitEvent2', 'test2');
      emitter.emit('emitEvent1', 'test3');
      emitter.emit('emitEvent2', 'test4');

      expect(emitter.listenerCount('emitEvent1')).toBe(1);
      expect(emitter.listenerCount('emitEvent2')).toBe(1);
      expect(callback1).toHaveBeenCalledWith('test1');
      expect(callback1).toHaveBeenCalledWith('test3');
      expect(callback2).toHaveBeenCalledWith('test2');
      expect(callback2).toHaveBeenCalledWith('test4');
    });

    test('should trigger callbacks added for event in order of registration', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.on('emitEvent', callback1);
      emitter.on('emitEvent', callback2);
      emitter.emit('emitEvent', 'test');

      expect(callback1.mock.invocationCallOrder[0])
        .toBeLessThan(callback2.mock.invocationCallOrder[0]);
    });
  });

  describe('with "once" method', () => {
    test('should add a one-time listener for a given event', () => {
      const callback = jest.fn();

      emitter.once('onceEvent', callback);
      emitter.emit('onceEvent', 'test');
      emitter.emit('onceEvent', 'test');

      expect(callback).toHaveBeenCalledWith('test');
      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should add multiple one-time listeners for a given event', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.once('onceEvent', callback1);
      emitter.once('onceEvent', callback2);

      expect(emitter.listenerCount('onceEvent')).toBe(2);

      emitter.emit('onceEvent', 'test');
      emitter.emit('onceEvent', 'test');
      emitter.emit('onceEvent', 'test');

      expect(callback1).toHaveBeenCalledWith('test');
      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledWith('test');
      expect(callback2).toHaveBeenCalledTimes(1);
      expect(emitter.listenerCount('onceEvent')).toBe(0);
    });

    test('should add multiple one-time listeners for multiple events', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.once('onceEvent1', callback1);
      emitter.once('onceEvent2', callback2);

      expect(emitter.listenerCount('onceEvent1')).toBe(1);
      expect(emitter.listenerCount('onceEvent2')).toBe(1);

      emitter.emit('onceEvent1', 'test1');
      emitter.emit('onceEvent2', 'test2');
      emitter.emit('onceEvent1', 'test1');
      emitter.emit('onceEvent2', 'test2');

      expect(callback1).toHaveBeenCalledWith('test1');
      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledWith('test2');
      expect(callback2).toHaveBeenCalledTimes(1);
      expect(emitter.listenerCount('onceEvent1')).toBe(0);
      expect(emitter.listenerCount('onceEvent2')).toBe(0);
    });

    test('should add multiple one-time listeners for event in order of registration', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.once('onceEvent', callback1);
      emitter.once('onceEvent', callback2);
      emitter.emit('onceEvent', 'test');

      expect(callback1).toHaveBeenCalledWith('test');
      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledWith('test');
      expect(callback2).toHaveBeenCalledTimes(1);

      expect(callback1.mock.invocationCallOrder[0])
        .toBeLessThan(callback2.mock.invocationCallOrder[0]);
      expect(emitter.listenerCount('onceEvent')).toBe(0);
    });

    test('should not remove listeners for other events', () => {
      const callback1 = jest.fn();

      emitter.once('onceEvent1', callback1);
      emitter.once('onceEvent2', callback1);
      emitter.emit('onceEvent1', 'test1');

      expect(callback1).toHaveBeenCalledWith('test1');
      expect(callback1).toHaveBeenCalledTimes(1);
      expect(emitter.listenerCount('onceEvent1')).toBe(0);
      expect(emitter.listenerCount('onceEvent2')).toBe(1);
    });
  });

  describe('with "prependListener" method', () => {
    test('should add a listener at the beginning for a given event', () => {
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

    test('should add multiple listeners at the beginning for a given event', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();
      const callback3 = jest.fn();

      emitter.on('prependListenerEvent', callback1);
      emitter.prependListener('prependListenerEvent', callback2);
      emitter.prependListener('prependListenerEvent', callback3);
      emitter.emit('prependListenerEvent', 'test');

      expect(emitter.listenerCount('prependListenerEvent')).toBe(3);
      expect(callback1).toHaveBeenCalledWith('test');
      expect(callback2).toHaveBeenCalledWith('test');
      expect(callback3).toHaveBeenCalledWith('test');

      expect(callback3.mock.invocationCallOrder[0])
        .toBeLessThan(callback2.mock.invocationCallOrder[0]);

      expect(callback2.mock.invocationCallOrder[0])
        .toBeLessThan(callback1.mock.invocationCallOrder[0]);
    });
  });

  describe('with "prependOnceListener" method', () => {
    test('should add a one-time listener at the beginning for a given event', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.on('prependOnceListenerEvent', callback1);
      emitter.prependOnceListener('prependOnceListenerEvent', callback2);

      expect(emitter.listenerCount('prependOnceListenerEvent')).toBe(2);

      emitter.emit('prependOnceListenerEvent', 'test');
      emitter.emit('prependOnceListenerEvent', 'test');

      expect(callback1).toHaveBeenCalledWith('test');
      expect(callback1).toHaveBeenCalledTimes(2);
      expect(callback2).toHaveBeenCalledWith('test');
      expect(callback2).toHaveBeenCalledTimes(1);

      expect(callback2.mock.invocationCallOrder[0])
        .toBeLessThan(callback1.mock.invocationCallOrder[0]);

      expect(emitter.listenerCount('prependOnceListenerEvent')).toBe(1);
    });

    test('should add multiple one-time listeners at the beginning for a given event', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();
      const callback3 = jest.fn();

      emitter.on('prependOnceListenerEvent', callback1);
      emitter.prependOnceListener('prependOnceListenerEvent', callback2);
      emitter.prependOnceListener('prependOnceListenerEvent', callback3);

      expect(emitter.listenerCount('prependOnceListenerEvent')).toBe(3);

      emitter.emit('prependOnceListenerEvent', 'test');
      emitter.emit('prependOnceListenerEvent', 'test');

      expect(callback1).toHaveBeenCalledWith('test');
      expect(callback1).toHaveBeenCalledTimes(2);
      expect(callback2).toHaveBeenCalledWith('test');
      expect(callback2).toHaveBeenCalledTimes(1);
      expect(callback3).toHaveBeenCalledWith('test');
      expect(callback3).toHaveBeenCalledTimes(1);

      expect(callback3.mock.invocationCallOrder[0])
        .toBeLessThan(callback2.mock.invocationCallOrder[0]);

      expect(callback2.mock.invocationCallOrder[0])
        .toBeLessThan(callback1.mock.invocationCallOrder[0]);

      expect(emitter.listenerCount('prependOnceListenerEvent')).toBe(1);
    });
  });

  describe('with "off" method', () => {
    test('should remove listener for a given event', () => {
      const callback = jest.fn();

      emitter.on('offEvent', callback);
      emitter.emit('offEvent', 'test');

      expect(emitter.listenerCount('offEvent')).toBe(1);

      emitter.off('offEvent', callback);
      emitter.emit('offEvent', 'test');

      expect(callback).toHaveBeenCalledTimes(1);
      expect(emitter.listenerCount('offEvent')).toBe(0);
    });

    test('should remove listener for a given event with multiple listeners', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.on('offEvent', callback1);
      emitter.on('offEvent', callback2);
      emitter.emit('offEvent', 'test');

      expect(emitter.listenerCount('offEvent')).toBe(2);

      emitter.off('offEvent', callback1);
      emitter.emit('offEvent', 'test');

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(2);
      expect(emitter.listenerCount('offEvent')).toBe(1);
    });
  });

  describe('with "removeAllListeners" method', () => {
    test('should remove all listeners for a given event', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.on('removeAllListenersEvent', callback1);
      emitter.on('removeAllListenersEvent', callback2);
      emitter.emit('removeAllListenersEvent', 'test');

      expect(emitter.listenerCount('removeAllListenersEvent')).toBe(2);

      emitter.removeAllListeners('removeAllListenersEvent');
      emitter.emit('removeAllListenersEvent', 'test');

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);
      expect(emitter.listenerCount('removeAllListenersEvent')).toBe(0);
    });

    test('should remove all listeners for a given event and don\'t affect other events', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.on('removeAllListenersEvent1', callback1);
      emitter.on('removeAllListenersEvent2', callback2);
      emitter.emit('removeAllListenersEvent1', 'test');
      emitter.emit('removeAllListenersEvent2', 'test');

      expect(emitter.listenerCount('removeAllListenersEvent1')).toBe(1);
      expect(emitter.listenerCount('removeAllListenersEvent2')).toBe(1);

      emitter.removeAllListeners('removeAllListenersEvent1');
      emitter.emit('removeAllListenersEvent1', 'test');
      emitter.emit('removeAllListenersEvent2', 'test');

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(2);
      expect(emitter.listenerCount('removeAllListenersEvent1')).toBe(0);
      expect(emitter.listenerCount('removeAllListenersEvent2')).toBe(1);
    });

    test('should do nothing if no listeners for a given event', () => {
      emitter.removeAllListeners('removeAllListenersEvent');

      expect(emitter.listenerCount('removeAllListenersEvent')).toBe(0);
    });
  });
});
