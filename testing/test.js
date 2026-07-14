/* eslint-disable no-console */
const MyEventEmitter = require('../src/MyEventEmitter');
const emitter = new MyEventEmitter();

// 1. on — додає слухача
emitter.on('greet', (name) => {
  console.log(`Привіт, ${name}!`);
});

// 2. once — слухач спрацює лише один раз
emitter.once('firstVisit', () => {
  console.log('Ласкаво просимо вперше!');
});

// 3. off — видаляє слухача
const handler = () => console.log('Слухач');

emitter.on('test', handler);
emitter.off('test', handler);

// 4. emit — викликає всіх слухачів події
emitter.emit('greet', 'Олексій'); // "Привіт, Олексій!"
emitter.emit('firstVisit'); // "Ласкаво просимо вперше!"
emitter.emit('firstVisit'); // нічого не виведе

// 5. prependListener — додає на початок
emitter.prependListener('order', () => console.log('Другий'));
emitter.on('order', () => console.log('Перший'));
emitter.emit('order'); // "Другий", "Перший"

// 6. prependOnceListener — once + prepend
emitter.prependOnceListener('urgent', () => console.log('Терміново!'));

// 7. removeAllListeners — видаляє всіх слухачів події
emitter.removeAllListeners('greet');

// 8. listenerCount — кількість слухачів
console.log(emitter.listenerCount('greet')); // 0
