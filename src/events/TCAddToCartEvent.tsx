import type { TCItem } from './TCItem';
import { TCECommerceEvent } from './TCECommerceEvent';

export class TCAddToCartEvent extends TCECommerceEvent {
  value?: number;

  constructor(items?: Array<TCItem>, value?: number, currency?: string) {
    super();
    this.name = 'add_to_cart';
    this.currency = currency;
    this.value = value;
    this.items = items ? items : new Array<TCItem>();
  }
}
