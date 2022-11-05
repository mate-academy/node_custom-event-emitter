'use strict';

export class MyEventEmitter {
  constructor() {
    this.events = new Map()
  }
  on(event, callback) {
    if (this.events.get(event)) {
      const thisEvent = this.events.get(event)
      this.events.delete(event)
      this.events.set(event, [...thisEvent, callback])
    } else {
      this.events.set(event, [callback])
    }
  }
  once(event, callback) {
    const callbackWrapper = () => {
      callback()
      this.off(event, callbackWrapper)
    }
    if (this.events.get(event)) {
      const thisEvent = this.events.get(event)
      this.events.delete(event)
      this.events.set(event, [...thisEvent, callbackWrapper])
    } else {
      this.events.set(event, [callbackWrapper])
    }
    return this
  }
  off(event, callback) {
    const eventList = this.events
      .get(event)
      .filter((c) => c + "" !== callback + "")
    this.events.delete(event)
    this.events.set(event, eventList)
    return this
  }
  emit(event) {
    if (this.events.get(event)) {
      this.events.get(event).forEach((c) => c())
    }
    return this
  }
  prependListener(event, callback) {
    if (this.events.get(event)) {
      const thisEvent = this.events.get(event)
      this.events.delete(event)
      this.events.set(event, [callback, ...thisEvent])
    } else {
      this.events.set(event, [callback])
    }
    return this
  }
  prependOnceListener(event, callback) {
    const callbackWrapper = () => {
      callback()
      this.off(event, callbackWrapper)
    }

    if (this.events.get(event)) {
      const thisEvent = this.events.get(event)
      this.events.delete(event)
      this.events.set(event, [callbackWrapper, ...thisEvent])
    } else {
      this.events.set(event, [callbackWrapper])
    }
    return this
  }
  removeAllListeners() {
    this.events.clear()
    return this
  }
  listenerCount(event) {
    if (this.events.get(event)) {
      return this.events.get(event)
    }
    return "No listeners to show"
  }
}
