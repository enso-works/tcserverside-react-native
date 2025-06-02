import { TCEvent } from './TCEvent';
import { TCItem } from './TCItem';

export class TCViewItemListEvent extends TCEvent {
  itemListName: string;
  items: Array<TCItem>;

  constructor(items?: Array<TCItem>) {
    super();
    super.name = 'view_item_list';
    this.items = items ? items : new Array<TCItem>();
  }
}
