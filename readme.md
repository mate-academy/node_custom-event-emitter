# Custom Event Emitter (Node.js)
Create your own MyEventEmitter class that replicates the interface found in the Node.js EventEmitter class. Implement the following methods:
- on: Adds a listener to the end of the listeners array for the specified event.
- once: Adds a one-time listener for the event. The listener is invoked only the next time the event is fired, after which it is removed.
- off: Removes the specified listener from the listener array for the specified event.
- emit: Synchronously calls each of the listeners registered for the event, in the order they were registered, passing the supplied arguments to each.
- prependListener: Adds a listener to the beginning of the listeners array for the specified event.
- prependOnceListener: Adds a one-time listener for the event to the beginning of the listeners array. The listener is invoked only the next time the event is fired, after which it is removed.
- removeAllListeners: Removes all listeners, or those of the specified event.
- listenerCount: Returns the number of listeners for a given event.

**Ensure you review [the guidelines](https://github.com/mate-academy/js_task-guideline/blob/master/README.md) before starting this task.**
