import { beforeEach, describe, expect, test } from 'vitest'

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
})
