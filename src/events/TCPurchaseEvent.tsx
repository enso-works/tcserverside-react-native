import { TCECommerceEvent } from './TCECommerceEvent';
import type { TCItem } from './TCItem';

export class TCPurchaseEvent extends TCECommerceEvent {
  ID?: string;
  revenue?: number;
  value?: number;
  shippingAmount?: number;
  taxAmount?: number;
  coupon?: string;
  type?: string;
  paymentMethod?: string;
  status?: string;
  url?: string;

  constructor(
    ID?: string,
    revenue?: number,
    value?: number,
    currency?: string,
    type?: string,
    paymentMethod?: string,
    status?: string,
    items?: Array<TCItem>
  ) {
    super();
    this.ID = ID;
    this.revenue = revenue;
    this.value = value;
    this.type = type;
    this.paymentMethod = paymentMethod;
    this.status = status;
    this.name = 'purchase';
    this.currency = currency;
    this.items = items ? items : new Array<TCItem>();
  }
}
