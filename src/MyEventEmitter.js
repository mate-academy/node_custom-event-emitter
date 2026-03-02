'use strict';

class MyEventEmitter {
  constructor() {
    // Сховище для подій: { eventName: [callback1, callback2] }
    this._events = {};
  }

  // 1. Додає слухача в КІНЕЦЬ масиву
  on(eventName, listener) {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }
    this._events[eventName].push(listener);

    return this; // Для chaining (ланцюжка методів)
  }

  // 2. Слухач, який спрацьовує лише один раз
  once(eventName, listener) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper); // Спочатку видаляємо
      listener.apply(this, args); // Потім викликаємо
    };

    // Зберігаємо оригінальну функцію,
    // щоб її можна було видалити через off(eventName, listener)
    wrapper.originalListener = listener;

    return this.on(eventName, wrapper);
  }

  // 3. Видаляє конкретного слухача
  off(eventName, listener) {
    const listeners = this._events[eventName];

    if (!listeners) {
      return this;
    }

    const index = listeners.indexOf(listener);

    if (index !== -1) {
      listeners.splice(index, 1);
    }

    // Очищаємо об'єкт, якщо слухачів більше немає
    if (listeners.length === 0) {
      delete this._events[eventName];
    }

    return this;
  }

  // 4. Викликає всіх слухачів по черзі
  emit(eventName, ...args) {
    const listeners = this._events[eventName];

    if (!listeners || listeners.length === 0) {
      return false;
    }

    // Створюємо копію масиву, щоб уникнути проблем,
    // якщо слухач видалить себе під час виконання (як у once)
    [...listeners].forEach((listener) => {
      listener.apply(this, args);
    });

    return true;
  }

  // 5. Додає слухача в ПОЧАТОК масиву
  prependListener(eventName, listener) {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }
    this._events[eventName].unshift(listener);

    return this;
  }

  // 6. Одноразовий слухач у початок масиву
  prependOnceListener(eventName, listener) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener.apply(this, args);
    };

    wrapper.originalListener = listener;

    return this.prependListener(eventName, wrapper);
  }

  // 7. Видалення всіх слухачів
  removeAllListeners(eventName) {
    if (eventName) {
      delete this._events[eventName];
    } else {
      this._events = {};
    }

    return this;
  }

  // 8. Кількість слухачів
  listenerCount(eventName) {
    return this._events[eventName] ? this._events[eventName].length : 0;
  }
}

module.exports = MyEventEmitter;
