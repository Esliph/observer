import { ListenerEvent, ListenerId } from '@types';

export class Listener {

  constructor(
    public readonly id: ListenerId,
    public readonly event: ListenerEvent,
    public readonly handler: (data: unknown) => void
  ) { }
}
