'use strict';

const MyEventEmitter = require('./MyEventEmitter');

const emitter = new MyEventEmitter();

function onMessageReceived(message) {
  // eslint-disable-next-line no-console
  console.log('Message Received:', message);
}

function onceMessageReceived(message) {
  // eslint-disable-next-line no-console
  console.log('Once Message Received:', message);
}

emitter.on('message', onMessageReceived);
emitter.emit('message', 'Hello World!');

emitter.once('message', onceMessageReceived);
emitter.emit('message', 'Once');
emitter.emit('message', 'Twice');

emitter.prependListener('message', message =>
  // eslint-disable-next-line no-console
  console.log('First Listener:', message));
emitter.emit('message', 'Prepend');

// eslint-disable-next-line no-console
console.log(emitter.listenerCount('message'));

emitter.removeAllListeners('message');
// eslint-disable-next-line no-console
console.log(emitter.listenerCount('message'));
