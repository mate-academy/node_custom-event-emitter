'use strict';

const checkListenerType = (listener) => {
  if (typeof listener !== 'function') {
    // eslint-disable-next-line max-len
    throw new Error(`The "listener" argument must be of type "function". Received type "${typeof listener}".`);
  }
};

module.exports = { checkListenerType };
