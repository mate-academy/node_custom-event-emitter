/* eslint-disable no-console */
'use strict';

const { MyEventEmitter } = require('./MyEventEmitter');

const eventEmitter = new MyEventEmitter();
const a = 5;
const b = 10;

eventEmitter.on('test', () => console.log('over and over again expecting'));
eventEmitter.once('test', () => console.log('stuff to change'));
eventEmitter.prependListener('test', () => console.log('same bloody thing'));

eventEmitter.prependOnceListener(
  'test',
  () => console.log('Insanity is doing the exact')
);

eventEmitter.prependOnceListener(
  'test',
  () => console.log('Insanity is doing the exact')
);

eventEmitter.on('test', (val1, val2) =>
  console.log(`${val1} + ${val2} = ${val1 + val2}`));
eventEmitter.emit('test', a, b);
eventEmitter.emit('test', a, b);

eventEmitter.removeAllListeners();
