/* eslint-disable max-len */
'use strict';

const fs = require('fs');
const path = require('path');
const { faker } = require('@faker-js/faker');
const MyEventEmitter = require('../src/MyEventEmitter');
const EventEmitter = require('events');

const getRandomEventName = () => faker.string.uuid();

const getRandomArgument = () => {
  const types = ['string', 'number', 'boolean', 'object', 'undefined', 'null'];
  const type = faker.helpers.arrayElement(types);

  switch (type) {
    case 'string':
      return faker.lorem.sentence();
    case 'number':
      return faker.number.int();
    case 'boolean':
      return faker.datatype.boolean();
    case 'object':
      return {
        [faker.lorem.word()]: faker.lorem.sentence(),
        [faker.lorem.word()]: faker.number.int(),
        [faker.lorem.word()]: faker.datatype.boolean(),
      };
    case 'undefined':
      return undefined;
    case 'null':
      return null;
    default:
      return undefined;
  }
};

const getMultipleArguments = () => {
  const count = faker.number.int({
    min: 2,
    max: 10,
  });

  return Array.from({ length: count }, getRandomArgument);
};

describe('MyEventEmitter', () => {
  let emitter;

  beforeEach(() => {
    emitter = new MyEventEmitter();
  });

  test('should NOT use external library dependencies', () => {
    const sourceFile = path.resolve(
      __dirname,
      '..',
      'src',
      'MyEventEmitter.js',
    );
    const fileContent = fs.readFileSync(sourceFile, 'utf8');
    const hasCommonJSRequire = /require\(/g.test(fileContent);
    const hasESImports = /import\s+\S+\s+from\s+['"].+['"]/g.test(fileContent);

    expect(hasCommonJSRequire).toBe(false);
    expect(hasESImports).toBe(false);
  });

  test('should NOT extend from Node.js EventEmitter', () => {
    expect(emitter).not.toBeInstanceOf(EventEmitter);
  });

  describe('"listenerCount" method', () => {
    test('should always return 0 for an event without listeners', () => {
      expect(emitter.listenerCount(getRandomEventName())).toBe(0);
    });
  });

  describe('"on" method', () => {
    test('should add a listener for a given event and increment the listener count', () => {
      const eventName = getRandomEventName();
      const callback = jest.fn();

      emitter.on(eventName, callback);

      expect(emitter.listenerCount(eventName)).toBe(1);
    });

    test('should add multiple listeners for a given event and increment the listener count', () => {
      const eventName = getRandomEventName();
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.on(eventName, callback1);
      emitter.on(eventName, callback2);

      expect(emitter.listenerCount(eventName)).toBe(2);
    });

    test('should add multiple listeners for multiple events and increment the listener count', () => {
      const eventName1 = getRandomEventName();
      const eventName2 = getRandomEventName();
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.on(eventName1, callback1);
      emitter.on(eventName2, callback2);

      expect(emitter.listenerCount(eventName1)).toBe(1);
      expect(emitter.listenerCount(eventName2)).toBe(1);
    });

    test('should not affect other events', () => {
      const eventName1 = getRandomEventName();
      const eventName2 = getRandomEventName();
      const callback = jest.fn();

      emitter.on(eventName1, callback);

      expect(emitter.listenerCount(eventName1)).toBe(1);
      expect(emitter.listenerCount(eventName2)).toBe(0);
    });
  });

  describe('"emit" method', () => {
    test('should trigger callbacks added for a given event with single argument', () => {
      const eventName = getRandomEventName();
      const singleArgument = getRandomArgument();
      const callback1 = jest.fn();

      emitter.on(eventName, callback1);

      emitter.emit(eventName, singleArgument);

      expect(callback1).toHaveBeenCalledWith(singleArgument);
    });

    test('should trigger callbacks added for a given event with multiple arguments', () => {
      const eventName = getRandomEventName();
      const multipleArguments = getMultipleArguments();
      const callback1 = jest.fn();

      emitter.on(eventName, callback1);

      emitter.emit(eventName, ...multipleArguments);

      expect(callback1).toHaveBeenCalledWith(...multipleArguments);
    });

    test('should trigger callbacks added for multiple events', () => {
      const eventName1 = getRandomEventName();
      const eventName2 = getRandomEventName();
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.on(eventName1, callback1);
      emitter.on(eventName2, callback2);

      emitter.emit(eventName1);
      emitter.emit(eventName2);

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);
    });

    test('should trigger callbacks added for multiple events multiple times', () => {
      const eventName1 = getRandomEventName();
      const eventName2 = getRandomEventName();
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.on(eventName1, callback1);
      emitter.on(eventName2, callback2);

      emitter.emit(eventName1);
      emitter.emit(eventName2);
      emitter.emit(eventName1);
      emitter.emit(eventName2);
      emitter.emit(eventName2);

      expect(callback1).toHaveBeenCalledTimes(2);
      expect(callback2).toHaveBeenCalledTimes(3);
    });

    test('should trigger callbacks added for event triggered in order of registration', () => {
      const eventName = getRandomEventName();
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.on(eventName, callback1);
      emitter.on(eventName, callback2);

      emitter.emit(eventName);

      expect(callback1.mock.invocationCallOrder[0]).toBeLessThan(
        callback2.mock.invocationCallOrder[0],
      );
    });

    test('should not affect callbacks added for other events', () => {
      const eventName1 = getRandomEventName();
      const eventName2 = getRandomEventName();
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.on(eventName1, callback1);
      emitter.on(eventName2, callback2);

      emitter.emit(eventName1);

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(0);
    });

    test('should not affect callbacks added for other events with same callback', () => {
      const eventName1 = getRandomEventName();
      const eventName2 = getRandomEventName();
      const callback = jest.fn();

      emitter.on(eventName1, callback);
      emitter.on(eventName2, callback);

      emitter.emit(eventName1);

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('"once" method', () => {
    test('should add a one-time listener for a given event that is removed after being triggered', () => {
      const eventName = getRandomEventName();
      const callback = jest.fn();

      emitter.once(eventName, callback);

      emitter.emit(eventName);
      emitter.emit(eventName);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(emitter.listenerCount(eventName)).toBe(0);
    });

    test('should add multiple one-time listeners for a given event that are removed after being triggered', () => {
      const eventName = getRandomEventName();
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.once(eventName, callback1);
      emitter.once(eventName, callback2);

      emitter.emit(eventName);
      emitter.emit(eventName);
      emitter.emit(eventName);

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);
      expect(emitter.listenerCount(eventName)).toBe(0);
    });

    test('should add multiple one-time listeners for multiple events that are removed after being triggered', () => {
      const eventName1 = getRandomEventName();
      const eventName2 = getRandomEventName();
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.once(eventName1, callback1);
      emitter.once(eventName2, callback2);

      emitter.emit(eventName1);
      emitter.emit(eventName2);
      emitter.emit(eventName1);
      emitter.emit(eventName2);

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);
      expect(emitter.listenerCount(eventName1)).toBe(0);
      expect(emitter.listenerCount(eventName2)).toBe(0);
    });

    test('should add multiple one-time listeners for event triggered in order of registration', () => {
      const eventName = getRandomEventName();
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.once(eventName, callback1);
      emitter.once(eventName, callback2);

      emitter.emit(eventName);

      expect(callback1.mock.invocationCallOrder[0]).toBeLessThan(
        callback2.mock.invocationCallOrder[0],
      );
    });

    test('should not affect one-time listeners for other events with same callback', () => {
      const eventName1 = getRandomEventName();
      const eventName2 = getRandomEventName();
      const callback = jest.fn();

      emitter.once(eventName1, callback);
      emitter.once(eventName2, callback);
      emitter.emit(eventName1);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(emitter.listenerCount(eventName1)).toBe(0);
      expect(emitter.listenerCount(eventName2)).toBe(1);
    });
  });

  describe('"prependListener" method', () => {
    test('should add a listener at the beginning of the listeners array for a given event', () => {
      const eventName = getRandomEventName();
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.on(eventName, callback1);
      emitter.prependListener(eventName, callback2);
      emitter.emit(eventName);

      expect(emitter.listenerCount(eventName)).toBe(2);

      expect(callback2.mock.invocationCallOrder[0]).toBeLessThan(
        callback1.mock.invocationCallOrder[0],
      );
    });

    test('should add multiple listeners at the beginning of the listeners array for a given event in order of registration', () => {
      const eventName = getRandomEventName();
      const callback1 = jest.fn();
      const callback2 = jest.fn();
      const callback3 = jest.fn();

      emitter.on(eventName, callback1);
      emitter.prependListener(eventName, callback2);
      emitter.prependListener(eventName, callback3);
      emitter.emit(eventName);

      expect(emitter.listenerCount(eventName)).toBe(3);

      expect(callback3.mock.invocationCallOrder[0]).toBeLessThan(
        callback2.mock.invocationCallOrder[0],
      );

      expect(callback2.mock.invocationCallOrder[0]).toBeLessThan(
        callback1.mock.invocationCallOrder[0],
      );
    });
  });

  describe('"prependOnceListener" method', () => {
    test('should add a one-time listener at the beginning of the listeners array for a given event and trigger it once', () => {
      const eventName = getRandomEventName();
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.on(eventName, callback1);
      emitter.prependOnceListener(eventName, callback2);

      emitter.emit(eventName);
      emitter.emit(eventName);

      expect(callback1).toHaveBeenCalledTimes(2);
      expect(callback2).toHaveBeenCalledTimes(1);

      expect(callback2.mock.invocationCallOrder[0]).toBeLessThan(
        callback1.mock.invocationCallOrder[0],
      );

      expect(emitter.listenerCount(eventName)).toBe(1);
    });

    test('should add multiple one-time listeners at the beginning of the listeners array for a given event and trigger them in order of registration once', () => {
      const eventName = getRandomEventName();
      const callback1 = jest.fn();
      const callback2 = jest.fn();
      const callback3 = jest.fn();

      emitter.on(eventName, callback1);
      emitter.prependOnceListener(eventName, callback2);
      emitter.prependOnceListener(eventName, callback3);

      emitter.emit(eventName);
      emitter.emit(eventName);

      expect(callback1).toHaveBeenCalledTimes(2);
      expect(callback2).toHaveBeenCalledTimes(1);
      expect(callback3).toHaveBeenCalledTimes(1);

      expect(callback3.mock.invocationCallOrder[0]).toBeLessThan(
        callback2.mock.invocationCallOrder[0],
      );

      expect(callback2.mock.invocationCallOrder[0]).toBeLessThan(
        callback1.mock.invocationCallOrder[0],
      );

      expect(emitter.listenerCount(eventName)).toBe(1);
    });
  });

  describe('"off" method', () => {
    test('should remove a listener by reference for a given event and update the listener count', () => {
      const eventName = getRandomEventName();
      const callback = jest.fn();

      emitter.on(eventName, callback);

      expect(emitter.listenerCount(eventName)).toBe(1);

      emitter.off(eventName, callback);

      expect(emitter.listenerCount(eventName)).toBe(0);
    });

    test("should remove a listener by reference for a given event and don't affect other events", () => {
      const eventName = getRandomEventName();
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.on(eventName, callback1);
      emitter.on(eventName, callback2);

      expect(emitter.listenerCount(eventName)).toBe(2);

      emitter.off(eventName, callback1);

      expect(emitter.listenerCount(eventName)).toBe(1);
    });

    test("should remove a listener by reference for a given event and don't affect other events with same callback", () => {
      const eventName1 = getRandomEventName();
      const eventName2 = getRandomEventName();
      const callback = jest.fn();

      emitter.on(eventName1, callback);
      emitter.on(eventName2, callback);

      expect(emitter.listenerCount(eventName1)).toBe(1);
      expect(emitter.listenerCount(eventName2)).toBe(1);

      emitter.off(eventName1, callback);

      expect(emitter.listenerCount(eventName1)).toBe(0);
      expect(emitter.listenerCount(eventName2)).toBe(1);
    });
  });

  describe('"removeAllListeners" method', () => {
    test('should remove all listeners for a given event and update the listener count', () => {
      const eventName = getRandomEventName();
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.on(eventName, callback1);
      emitter.on(eventName, callback2);

      expect(emitter.listenerCount(eventName)).toBe(2);

      emitter.removeAllListeners(eventName);

      expect(emitter.listenerCount(eventName)).toBe(0);
    });

    test("should remove all listeners for a given event and don't affect other events", () => {
      const eventName1 = getRandomEventName();
      const eventName2 = getRandomEventName();
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.on(eventName1, callback1);
      emitter.on(eventName2, callback2);

      expect(emitter.listenerCount(eventName1)).toBe(1);
      expect(emitter.listenerCount(eventName2)).toBe(1);

      emitter.removeAllListeners(eventName1);

      expect(emitter.listenerCount(eventName1)).toBe(0);
      expect(emitter.listenerCount(eventName2)).toBe(1);
    });

    test("should remove all listeners for a given event and don't affect other events with same callback", () => {
      const eventName1 = getRandomEventName();
      const eventName2 = getRandomEventName();
      const callback = jest.fn();

      emitter.on(eventName1, callback);
      emitter.on(eventName2, callback);

      expect(emitter.listenerCount(eventName1)).toBe(1);
      expect(emitter.listenerCount(eventName2)).toBe(1);

      emitter.removeAllListeners(eventName1);

      expect(emitter.listenerCount(eventName1)).toBe(0);
      expect(emitter.listenerCount(eventName2)).toBe(1);
    });
  });
});
