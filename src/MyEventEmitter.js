'use strict';

/**
 * Власна реалізація патерну «спостерігач» (як Node.js EventEmitter).
 * Події зберігаються в об’єкті: ключ — назва події, значення — масив слухачів.
 */
class MyEventEmitter {
  constructor() {
    this._events = Object.create(null);
  }

  /**
   * Додає постійного слухача в кінець черги для події eventName.
   * @param {string} eventName
   * @param {Function} listener — функція, яку викличуть при emit
   * @returns {this} — для ланцюжкових викликів emitter.on(...).on(...)
   */
  on(eventName, listener) {
    this._addListener(eventName, listener, false, false);

    return this;
  }

  /**
   * Одноразовий слухач: після першого emit його знімають (once: true).
   */
  once(eventName, listener) {
    this._addListener(eventName, listener, true, false);

    return this;
  }

  /**
   * Слухач на початок черги — спрацює раніше за тих, хто доданий через on().
   */
  prependListener(eventName, listener) {
    this._addListener(eventName, listener, false, true);

    return this;
  }

  /**
   * Одноразовий слухач, але вставляється на початок черги.
   */
  prependOnceListener(eventName, listener) {
    this._addListener(eventName, listener, true, true);

    return this;
  }

  /**
   * Внутрішній метод: один спосіб додавати слухачів з різними прапорцями.
   * @param {boolean} once — чи зняти після першого виклику
   * @param {boolean} prepend — unshift замість push
   */
  _addListener(eventName, listener, once, prepend) {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }

    const entry = { listener, once };

    if (prepend) {
      this._events[eventName].unshift(entry);
    } else {
      this._events[eventName].push(entry);
    }
  }

  /**
   * Знімає слухача за посиланням на ту саму функцію, що передали в on/once.
   * Якщо такого слухача немає — нічого не робимо (без помилки).
   */
  off(eventName, listener) {
    const listeners = this._events[eventName];

    if (!listeners) {
      return this;
    }

    this._events[eventName] = listeners.filter(
      (entry) => entry.listener !== listener,
    );

    if (this._events[eventName].length === 0) {
      delete this._events[eventName];
    }

    return this;
  }

  /**
   * Синхронно викликає всіх слухачів події в порядку реєстрації.
   * Аргументи після eventName передаються кожному listener(...args).
   */
  emit(eventName, ...args) {
    const listeners = this._events[eventName];

    if (!listeners || listeners.length === 0) {
      return false;
    }

    // Копія масиву: під час emit одноразові слухачі видаляються через off,
    // інакше можна пропустити наступного в циклі по «живому» масиву.
    const snapshot = [...listeners];

    for (const entry of snapshot) {
      entry.listener.apply(this, args);

      if (entry.once) {
        this.off(eventName, entry.listener);
      }
    }

    return true;
  }

  /**
   * Без eventName — очистити всі події; з eventName — лише цю подію.
   */
  removeAllListeners(eventName) {
    if (eventName === undefined) {
      this._events = Object.create(null);
    } else {
      delete this._events[eventName];
    }

    return this;
  }

  /**
   * Скільки слухачів зараз зареєстровано на подію (0, якщо події немає).
   */
  listenerCount(eventName) {
    const listeners = this._events[eventName];

    return listeners ? listeners.length : 0;
  }
}

module.exports = MyEventEmitter;
