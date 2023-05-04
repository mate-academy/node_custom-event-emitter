'use strict';

const MyEventEmitter = require('./src/MyEventEmitter');
const myConsole = require('console');

const myEmitter = new MyEventEmitter();

myEmitter.on('todo', () => {
  myConsole.log('todo event');
});

const callback = (...args) => {
  myConsole.log('todo event', ...args);
};

myEmitter.on('not todo', callback);

myEmitter.prependListener('todo', (...args) => {
  myConsole.log('todo event prepend', ...args);
});

myEmitter.prependOnceListener('todo', (...args) => {
  myConsole.log('todo event prepend once', ...args);
});

myEmitter.off('not todo', callback);

myEmitter.emit('todo', 1);
myEmitter.emit('not todo');
myEmitter.emit('todo', 2);

myConsole.log(myEmitter.listenerCount('todo'));
myConsole.log(myEmitter.listenerCount('todo'));
myConsole.log(myEmitter.listenerCount('not todo'));

myEmitter.removeAllListeners();

myConsole.log(myEmitter.listenerCount('todo'));
