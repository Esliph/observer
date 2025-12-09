import { beforeEach, describe, expect, test, vi } from 'vitest'

import { Listener } from '@listener'
import { Observer } from '@observer'

describe('Listener', () => {
  let observer: Observer

  beforeEach(() => {
    observer = new Observer()
  })

  test('It is expected that a listener will be registered', () => {
    const id = observer.on('event', () => { })

    const listener = observer.getListener(id)!

    expect(listener).toBeInstanceOf(Listener)
    expect(listener.id).toBe(id)
    expect(listener.event).toBe('event')
    expect(typeof listener.handler).toBe('function')
  })

  test('It is expected that two listeners will be registered for the same event', () => {
    observer.on('event', () => { })
    observer.on('event', () => { })

    const listeners = observer.getListenersByEvent('event')

    const [listener1, listener2] = listeners

    expect(listeners.length).toBe(2)

    expect(listener1.event).toBe('event')
    expect(listener2.event).toBe('event')

    expect(listener1.id).not.toBe(listener2.id)
  })

  test('It is expected that two listeners will be registered for different events', () => {
    observer.on('event-1', () => { })
    observer.on('event-2', () => { })

    const listeners1 = observer.getListenersByEvent('event-1')
    const listeners2 = observer.getListenersByEvent('event-2')

    const [listener1] = listeners1
    const [listener2] = listeners2

    expect(listeners1.length).toBe(1)
    expect(listeners2.length).toBe(1)

    expect(listener1.event).toBe('event-1')
    expect(listener2.event).toBe('event-2')

    expect(listener1.id).not.toBe(listener2.id)
  })

  test('The registered listener is expected to be called', () => {
    const handler = vi.fn(() => { })

    observer.on('event', handler)

    observer.emit('event', null)
    observer.emit('event', null)

    expect(handler).toBeCalled()
  })

  test('It is expected that the data passed in the broadcast will be passed to the handler', () => {
    const handler = vi.fn(arg => { })

    observer.on('event', handler as any)

    observer.emit('event', 'Hello World')

    expect(handler).toHaveBeenCalledWith('Hello World')
  })

  test('It is expected that the data transmitted in the broadcast will be passed on to the listeners', () => {
    const handler1 = vi.fn(arg => { })
    const handler2 = vi.fn(arg => { })

    observer.on('event', handler1 as any)
    observer.on('event', handler2 as any)

    observer.emit('event', 'Hello World')

    expect(handler1).toHaveBeenCalledWith('Hello World')
    expect(handler2).toHaveBeenCalledWith('Hello World')
  })

  test('It is expected that only the listeners of the triggered event will be called', () => {
    const handler1 = vi.fn(arg => { })
    const handler2 = vi.fn(arg => { })

    observer.on('event-1', handler1 as any)
    observer.on('event-2', handler2 as any)

    observer.emit('event-1', 'Hello World')

    expect(handler1).toHaveBeenCalledWith('Hello World')
    expect(handler2).not.toBeCalled()
  })
})
