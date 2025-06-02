import { TCEvent } from './TCEvent';

export class TCLoginEvent extends TCEvent {
  method?: string;

  constructor() {
    super();
    this.name = 'login';
  }
}
