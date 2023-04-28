/* eslint-disable no-console */
export class MyEventEmitter {
  constructor() {
    this.events = {};
  };

  validateArgs(eventName = undefined, listener = undefined) {
    return {
      eventNameisValid: typeof eventName === 'string',
      listenerIsValid: typeof listener === 'function',
      bothArgsAreValid:
        typeof listener === 'function' && typeof eventName === 'string',
    };
  }

  on(eventName, listener) {
    const { events, validateArgs } = this;
    const isArgsValid = validateArgs(eventName, listener).bothArgsAreValid;

    if (!isArgsValid) {
      console.log(
        'Invalid arguments. (eventName => string, listener => function)',
      );

      return;
    };

    if (!events[eventName]) {
      events[eventName] = [];
    }

    events[eventName].push(listener);
  };

  once(eventName, listener) {
    const isArgsValid = this.validateArgs(eventName, listener).bothArgsAreValid;

    if (!isArgsValid) {
      console.log(
        'Invalid arguments. (eventName => string, listener => function)'
      );

      return;
    };

    const wrapper = (...args) => {
      listener(...args);
      this.off(eventName, wrapper);
    };

    this.on(eventName, wrapper);
  };

  off(eventName, listener) {
    const { events, validateArgs } = this;
    const isArgsValid = validateArgs(eventName, listener).bothArgsAreValid;

    if (!isArgsValid) {
      console.log(
        'Invalid arguments. (eventName => string, listener => function)'
      );

      return;
    };

    events[eventName] = events[eventName]
      .filter((removedListener) => removedListener !== listener);
  };

  emit(eventName, ...args) {
    const { events, validateArgs } = this;
    const isArgsValid = validateArgs(eventName).eventNameisValid;

    if (!isArgsValid) {
      console.log(
        'Invalid argument. (eventName => string)'
      );

      return;
    };

    if (!events[eventName]) {
      console.log('Event does not exist');

      return;
    }

    events[eventName].forEach(listener => listener(...args));
  };

  prependListener(eventName, listener) {
    const { events, validateArgs } = this;
    const isArgsValid = validateArgs(eventName, listener).bothArgsAreValid;

    if (!isArgsValid) {
      console.log(
        'Invalid arguments. (eventName => string, listener => function)',
      );

      return;
    };

    if (!events[eventName]) {
      events[eventName] = [];
    }

    events[eventName].unshift(listener);
  };

  prependOnceListener(eventName, listener) {
    const isArgsValid = this.validateArgs(eventName, listener).bothArgsAreValid;

    if (!isArgsValid) {
      console.log(
        'Invalid arguments. (eventName => string, listener => function)'
      );

      return;
    };

    const wrapper = (...args) => {
      listener(...args);
      this.off(eventName, wrapper);
    };

    this.prependListener(eventName, wrapper);
  }
  removeAllListeners(eventName) {
    const { events, validateArgs } = this;
    const isArgsValid = validateArgs(eventName).eventNameisValid;

    if (!isArgsValid) {
      console.log(
        'Invalid argument. (eventName => string)'
      );

      return;
    };

    if (!events[eventName]) {
      console.log('Event does not exist');

      return;
    }

    const removeExistingListeners = () => {
      events[eventName] = [];
      console.log(`Listeners removed from '${eventName}'`);
    };

    events[eventName].length
      ? removeExistingListeners()
      : console.log('Event exist, but there is no listeners');
  };

  listenerCount(eventName, listener) {
    const { events, validateArgs } = this;
    const isArgsValid = listener
      ? validateArgs(eventName, listener).bothArgsAreValid
      : validateArgs(eventName).eventNameisValid;

    if (!isArgsValid) {
      const message = listener
        ? 'Invalid argument. (eventName => string, listener => function)'
        : 'Invalid arguments. (eventName => string)';

      console.log(message);

      return;
    };

    if (!events[eventName]) {
      console.log('Event does not exist');

      return;
    };

    if (listener) {
      const listenersCount = events[eventName]
        .filter(listenerInEvent => listener === listenerInEvent).length;

      return listenersCount;
    } else {
      return events[eventName].length;
    }
  };
}
