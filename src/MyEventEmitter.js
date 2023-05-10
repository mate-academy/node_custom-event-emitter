'use strict';

export class MyEventEmitter {
  constructor() {
    this.events = {};
  };

  validateInput(eventName = undefined, listener = undefined) {
    return {
      isNameValid: typeof eventName === 'string',
      isListenerValid: typeof listener === 'function',
    };
  }

  on(eventName, listener) {
    const { events, validateInput } = this;
    const { isNameValid, isListenerValid } = validateInput(eventName, listener);

    if (!isNameValid && !isListenerValid) {
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
    const { isNameValid, isListenerValid } = validateInput(eventName, listener);

    if (!isNameValid && !isListenerValid) {
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
    const { events, validateInput } = this;
    const { isNameValid, isListenerValid } = validateInput(eventName, listener);

    if (!isNameValid && !isListenerValid) {
      console.log(
        'Invalid arguments. (eventName => string, listener => function)'
      );

      return;
    };

    events[eventName] = events[eventName]
      .filter((removedListener) => removedListener !== listener);
  };

  emit(eventName, ...args) {
    const { events, validateInput } = this;
    const { isNameValid } = validateInput(eventName);

    if (!isNameValid) {
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
    const { events, validateInput } = this;
    const { isListenerValid, isNameValid } = validateInput(eventName, listener).bothArgsAreValid;

    if (!isNameValid && !isListenerValid) {
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
    const { isNameValid, isListenerValid } = this.validateInput(eventName, listener);

    if (!isNameValid && !isListenerValid) {
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
    const { events, validateInput } = this;
    const { isNameValid } = validateInput(eventName).isNameValid;

    if (!isNameValid) {
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
    const { events, validateInput } = this;
    const { isNameValid, isListenerValid } = validateInput(eventName, listener);


    if (!isNameValid && !isListenerValid && listener) {
      console.log('Invalid argument. (eventName => string, listener => function)');

      return;
    };

    if (!isNameValid && !listener) {
      console.log(
        'Invalid argument. (eventName => string)'
      );

      return;
    }

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
