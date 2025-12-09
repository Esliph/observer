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

    expect(listener2.id).not.toBe(listener1.id)
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
})
