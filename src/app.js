/* eslint-disable no-console */
'use strict';

const { MyEventEmitter } = require('./MyEventEmitter');

const emitter = new MyEventEmitter();
const callbackForPrepend = (...args) => {
  console.log('Prepend', args);
};

const callbackForPrependOnce = (...args) => {
  console.log('PrependOnce', args);
};

const callbackForOn = (...args) => {
  console.log('On', args);
};

const callbackForOnce = (...args) => {
  console.log('Once', args);
};

emitter.on('hello', callbackForOn);

emitter.once('hello', callbackForOnce);

const count = emitter.listenerCount('hello');

console.log('count:', count);

emitter.emit('hello', 1, 1, 1);

emitter.off('hello', callbackForOn);

const count1 = emitter.listenerCount('hello');

console.log('count:', count1);

emitter.prependListener('hello', callbackForPrepend);

emitter.prependOnceListener('hello', callbackForPrependOnce);

emitter.emit('hello', 2, 2, 2);
