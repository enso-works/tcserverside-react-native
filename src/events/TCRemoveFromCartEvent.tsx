import { TCECommerceEvent } from './TCECommerceEvent';
import { TCItem } from './TCItem';

export class TCRemoveFromCartEvent extends TCECommerceEvent {
  value: number;

  constructor(items?: Array<TCItem>) {
    super();
    super.name = 'remove_from_cart';
    this.items = items ? items : new Array<TCItem>();
  }
}
