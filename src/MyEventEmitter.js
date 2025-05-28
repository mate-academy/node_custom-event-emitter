'use strict';

class MyEventEmitter {
  constructor() {
    // Зберігаємо слухачів у вигляді об'єкта,
    // де ключ — це подія, а значення — масив функцій-слухачів
    this.listeners = {};
  }

  /**
   * Додає слухача в кінець масиву слухачів для заданої події.
   * @param {string} event - Назва події.
   * @param {function} listener - Функція-слухач.
   * @returns {MyEventEmitter} Цей екземпляр для ланцюжкового виклику.
   */
  on(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);

    return this;
  }

  /**
   * Додає одноразового слухача для події,
   * який видаляється після першого виклику.
   * @param {string} event - Назва події.
   * @param {function} listener - Функція-слухач.
   * @returns {MyEventEmitter} Цей екземпляр для ланцюжкового виклику.
   */
  once(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    const onceWrapper = (...args) => {
      this.off(event, onceWrapper);
      listener(...args);
    };

    return this.on(event, onceWrapper);
  }

  /**
   * Видаляє заданий слухача з масиву слухачів для заданої події.
   * @param {string} event - Назва події.
   * @param {function} listener - Функція-слухач для видалення.
   * @returns {MyEventEmitter} Цей екземпляр для ланцюжкового виклику.
   */
  off(event, listener) {
    if (!this.listeners[event]) {
      return this;
    }
    this.listeners[event] = this.listeners[event].filter((l) => l !== listener);

    if (this.listeners[event].length === 0) {
      delete this.listeners[event];
    }

    return this;
  }

  /**
   * Синхронно викликає всіх слухачів для заданої події в порядку їх реєстрації.
   * @param {string} event - Назва події.
   * @param {...*} args - Аргументи, які передаються слухачам.
   * @returns {boolean} true, якщо хоча б один слухач викликаний, інакше false.
   */
  emit(event, ...args) {
    if (!this.listeners[event]) {
      return false;
    }
    this.listeners[event].forEach((listener) => listener(...args));

    return true;
  }

  /**
   * Додає слухача на початок масиву слухачів для заданої події.
   * @param {string} event - Назва події.
   * @param {function} listener - Функція-слухач.
   * @returns {MyEventEmitter} Цей екземпляр для ланцюжкового виклику.
   */
  prependListener(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].unshift(listener);

    return this;
  }

  /**
   * Додає одноразового слухача на початок масиву слухачів для заданої події.
   * @param {string} event - Назва події.
   * @param {function} listener - Функція-слухач.
   * @returns {MyEventEmitter} Цей екземпляр для ланцюжкового виклику.
   */
  prependOnceListener(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    const onceWrapper = (...args) => {
      this.off(event, onceWrapper);
      listener(...args);
    };

    return this.prependListener(event, onceWrapper);
  }

  /**
   * Видаляє всіх слухачів для заданої події або всіх подій,
   * якщо подія не вказана.
   * @param {string} [event] - Назва події (опціонально).
   * @returns {MyEventEmitter} Цей екземпляр для ланцюжкового виклику.
   */
  removeAllListeners(event) {
    if (event) {
      delete this.listeners[event];
    } else {
      this.listeners = {};
    }

    return this;
  }

  /**
   * Повертає кількість слухачів для заданої події.
   * @param {string} event - Назва події.
   * @returns {number} Кількість слухачів.
   */
  listenerCount(event) {
    return this.listeners[event] ? this.listeners[event].length : 0;
  }
}

module.exports = MyEventEmitter;
