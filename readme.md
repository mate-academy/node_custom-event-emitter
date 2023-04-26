# Custom Event Emitter (Node.js)
Create a custom `MyEventEmitter` class that mimics the behavior of Node.js EventEmitter. Implement the following methods:

1. `on`: Adds a listener to the end of the listeners array for the specified event.
2. `once`: Adds a one-time listener for the event. The listener is invoked only the next time the event is fired, after which it is removed.
3. `off`: Removes the specified listener from the listener array for the specified event.
4. `emit`: Synchronously calls each of the listeners registered for the event, in the order they were registered, passing the supplied arguments to each.
5. `prependListener`: Adds a listener to the beginning of the listeners array for the specified event.
6. `prependOnceListener`: Adds a one-time listener for the event to the beginning of the listeners array. The listener is invoked only the next time the event is fired, after which it is removed.
7. `removeAllListeners`: Remove all listeners for a specific event, or all events if no event is specified.
8. `listenerCount`: Returns the number of listeners for a given event.

## Instructions

- Follow the [JavaScript task guideline](https://github.com/mate-academy/js_task-guideline/blob/master/README.md) before starting.
- Implement a solution by creating a class `MyEventEmitter` that includes the required methods.
- Make sure to handle edge cases, such as removing a non-existent listener or emitting an event with no listeners registered.
- Test your implementation with various scenarios to ensure correctness.

**Note:** This task does not require any external libraries or modules. You should implement the EventEmitter from scratch using only built-in JavaScript features.
