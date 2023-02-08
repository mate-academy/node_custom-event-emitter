'use strict';

type EventType = string;

interface IListener {
  eventType: EventType;
  callback: Function;
  once: boolean;
}

interface AddListenerArgs {
  eventType: string;
  callback: Function;
  prepend?: boolean;
  once?: boolean;
}

interface CleanupEventListenersArgs {
  eventType: EventType;
  listenersToDelete: IListener[];
}

class Listener implements IListener {
  constructor(
    public eventType: EventType,
    public callback: Function,
    public once: boolean = false,
  ) {}
}

export class MyEventEmitter {
  private listenersMap = new Map<EventType, IListener[]>();

  public on(eventType: string, callback: Function) {
    this.addListener({ eventType, callback });

    return this;
  }

  public once(eventType: string, callback: Function) {
    this.addListener({
      eventType,
      callback,
      once: true,
    });

    return this;
  }

  off() {}

  public emit(eventType: EventType, ...args: unknown[]) {
    const eventListeners = this.listenersMap.get(eventType);

    if (eventListeners) {
      const listenersToDelete: IListener[] = [];

      eventListeners.forEach((listener) => {
        const { once, callback } = listener;

        if (once) {
          listenersToDelete.push(listener);
        }

        callback(...args);
      });

      this.cleanupEventListeners({ eventType, listenersToDelete });

      return true;
    }

    return false;
  }

  public prependListener(eventType: string, callback: Function) {
    this.addListener({
      eventType,
      callback,
      prepend: true,
    });

    return this;
  }

  public prependOnceListener(eventType: string, callback: Function) {
    this.addListener({
      eventType,
      callback,
      prepend: true,
      once: true,
    });

    return this;
  }

  removeAllListeners() {}
  listenerCount() {}

  private addListener({
    eventType,
    callback,
    prepend = false,
    once = false,
  }: AddListenerArgs) {
    const newListener = new Listener(eventType, callback, once);

    const eventListeners = this.listenersMap.get(eventType);

    if (eventListeners) {
      if (prepend) {
        eventListeners.unshift(newListener);
      } else {
        eventListeners.push(newListener);
      }
    } else {
      this.listenersMap.set(eventType, [newListener]);
    }
  }

  private cleanupEventListeners({
    eventType,
    listenersToDelete,
  }: CleanupEventListenersArgs) {
    const eventListeners = this.listenersMap.get(eventType);

    if (eventListeners) {
      const listenersToKeep = eventListeners
        .filter(listener => !listenersToDelete.includes(listener));

      if (listenersToKeep.length) {
        this.listenersMap.set(eventType, listenersToKeep);
      } else {
        this.listenersMap.delete(eventType);
      }
    }
  }
}
