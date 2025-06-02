import type { TCItem } from './TCItem';
import { TCECommerceEvent } from './TCECommerceEvent';

export class TCAddToCartEvent extends TCECommerceEvent {
  value?: number;

  constructor(items?: Array<TCItem>, value?: number, currency?: string) {
    super();
    super.name = 'add_to_cart';
    super.currency = currency;
    this.value = value;
    this.items = items ? items : new Array<TCItem>();
  }
}
