import { Listener } from '@listener'
import { ListenerEvent, ListenerId } from '@types'
import { randomId } from '@utils'

export class Observer {

  private readonly listenersId = new Map<ListenerEvent, Set<ListenerId>>()
  private readonly listeners = new Map<ListenerId, Listener>()

  on(event: ListenerEvent, handler: () => void) {
    const id = randomId()
    const listener = new Listener(id, event, handler)

    this.listeners.set(id, listener)
    const listenersId = this.getListenersIdByEvent(event)

    listenersId.add(id)

    return id
  }

  emit(event: ListenerEvent, data: unknown) {
    const listenersId = this.getListenersIdByEvent(event)

    for (const id of listenersId) {
      const listener = this.listeners.get(id)!

      listener.handler(data)
    }
  }

  getListener(id: ListenerId) {
    return this.listeners.get(id)
  }

  protected getListenersIdByEvent(event: ListenerEvent) {
    let listenersId = this.listenersId.get(event)

    if (!listenersId) {
      listenersId = new Set()
      this.listenersId.set(event, listenersId)
    }

    return listenersId
  }
}
