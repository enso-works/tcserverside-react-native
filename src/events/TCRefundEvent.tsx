import { TCECommerceEvent } from './TCECommerceEvent';
import type { TCItem } from './TCItem';

export class TCRefundEvent extends TCECommerceEvent {
  ID?: string;
  revenue?: string;
  value?: string;
  shippingAmount?: string;
  taxAmount?: string;
  coupon?: string;
  type?: string;
  url?: string;

  constructor(
    ID?: string,
    revenue?: string,
    value?: string,
    currency?: string,
    type?: string,
    items?: Array<TCItem>
  ) {
    super();
    super.name = 'refund';
    super.currency = currency;
    this.ID = ID;
    this.value = value;
    this.type = type;
    this.revenue = revenue;
    this.items = items ? items : new Array<TCItem>();
  }
}
