/* eslint-disable no-console */
'use strict';

const { MyEventEmitter } = require('./MyEventEmitter');

const testEmitter = new MyEventEmitter();

const handler1 = (...args) => {
  console.log('Click #1 fired: ', args);
};

const handler2 = (...args) => {
  console.log('Click #2 fired: ', args);
};

testEmitter
  .on('click', handler1)
  .once('click', handler2);

testEmitter.emit('click', 1, 2, 3); // Events #1, #2 are fired
testEmitter.emit('click', 4, 5, 6); // Only event #1 event is fired

const handler3 = (...args) => {
  console.log('Click #3 fired: ', args);
};

testEmitter
  .prependListener('click', handler3)
  .emit('click', 1, 2, 3); // Events #3, #1 are fired

testEmitter.off('click', handler1);

testEmitter.emit('click', 1, 2, 3); // Only event #3 is fired

const handler4 = (...args) => {
  console.log('Blur #4 fired: ', args);
};

testEmitter
  .prependOnceListener('blur', handler4)
  .emit('blur'); // Only event #4 is fired

console.log(testEmitter.listenerCount('click')); // Outputs 1

testEmitter
  .on('blur', handler4)
  .removeAllListeners('click');

console.log(testEmitter.listenerCount('click')); // Outputs 0
console.log(testEmitter.listenerCount('blur')); // Outputs 1

testEmitter.removeAllListeners();

console.log(testEmitter.listenerCount('click')); // Outputs 0
console.log(testEmitter.listenerCount('blur')); // Outputs 0
