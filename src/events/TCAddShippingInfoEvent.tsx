import { TCECommerceEvent } from './TCECommerceEvent';
import type { TCItem } from './TCItem';

export class TCAddShippingInfoEvent extends TCECommerceEvent {
  value?: number;
  coupon?: string;
  shippingTier?: string;

  constructor(value?: number, currency?: string, items?: Array<TCItem>) {
    super();
    this.name = 'add_shipping_info';
    this.currency = currency;
    this.value = value;
    this.items = items ? items : new Array<TCItem>();
  }
}
