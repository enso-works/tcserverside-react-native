import type { TCItem } from './TCItem';
import { TCEvent } from './TCEvent';

export class TCSelectItemEvent extends TCEvent {
  itemListName: string;
  items = new Array();

  constructor(items?: Array<TCItem>) {
    super();
    this.name = 'select_item';
    this.items = items ? items : new Array<TCItem>();
  }
}
