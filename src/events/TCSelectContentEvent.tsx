import { TCEvent } from './TCEvent';

export class TCSelectContentEvent extends TCEvent {
  contentType: string;
  itemID: string;

  constructor() {
    super();
    this.name = 'select_content';
  }
}
