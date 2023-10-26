import { TCECommerceEvent } from "./TCECommerceEvent";
import { TCItem } from "./TCItem";

export class TCViewCartEvent extends TCECommerceEvent
{
  value: number;

  constructor(items?: Array<TCItem>)
  {
    super();
    super.name = "view_cart";
    this.items = items ? items : new Array<TCItem>;
  }
}