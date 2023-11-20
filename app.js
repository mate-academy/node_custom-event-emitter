'use strict';

/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

const { MyEventEmitter } = require('./src/MyEventEmitter');

const logOne = () => {
  console.log('-1-');
};

const logTwo = () => {
  console.log('-2-');
};

const logThree = () => {
  console.log('-3-');
};

const logOmitLast = () => {
  console.log('-logOmitLast-');
};

const logOmitFirst = () => {
  console.log('-logOmitFirst-');
};

const logOmitMiddle = () => {
  console.log('-logOmitMiddle-');
};

const Emiter = new MyEventEmitter();

console.log('#-----------------------------#');
Emiter.on('hello', logTwo);
Emiter.on('hello', logThree);
Emiter.prependListener('hello', logOne);

Emiter.emit('hello');
console.log(Emiter.listenerCount('hello'));

console.log('-----------------------------');

Emiter
  .once('hi', logOmitMiddle)
  .once('hi', logOmitLast)
  .prependOnceListener('hi', logOmitFirst);

console.log(Emiter.listenerCount('hi'));

Emiter.emit('hi');

console.log(Emiter.listenerCount('hi'));

Emiter.emit('hi');

console.log(Emiter.listenerCount('hi'));

console.log('#-----------------------------#');
