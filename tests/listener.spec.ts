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
