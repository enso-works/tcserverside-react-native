
import { TCECommerceEvent } from './TCECommerceEvent';

export class TCBeginCheckoutEvent extends TCECommerceEvent
{
  revenue?: number;
  value?: number;
  coupon?: string;

  constructor()
  {
    super();
    super.name = "begin_checkout";
  }
}