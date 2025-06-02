import { TCEvent } from './TCEvent';

export class TCLoginEvent extends TCEvent {
  method?: string;

  constructor() {
    super();
    super.name = 'login';
  }
}
