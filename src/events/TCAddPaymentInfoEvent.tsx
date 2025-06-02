import { TCECommerceEvent } from './TCECommerceEvent';

export class TCAddPaymentInfoEvent extends TCECommerceEvent {
  paymentMethod?: string;
  coupon?: string;
  revenue?: number;

  constructor(paymentMethod?: string) {
    super();
    this.name = 'add_payment_info';
    this.paymentMethod = paymentMethod;
  }
}
