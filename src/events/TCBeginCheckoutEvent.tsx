import { TCECommerceEvent } from './TCECommerceEvent';

export class TCBeginCheckoutEvent extends TCECommerceEvent {
  revenue?: number;
  value?: number;
  coupon?: string;

  constructor() {
    super();
    this.name = 'begin_checkout';
  }
}
