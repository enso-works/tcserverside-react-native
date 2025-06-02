import { TCEvent } from './TCEvent';

export class TCCustomEvent extends TCEvent {
  constructor(eventName?: string) {
    super();
    this.name = eventName;
  }
}
