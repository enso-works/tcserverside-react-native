import { TCECommerceEvent } from "./TCECommerceEvent";
import type { TCItem } from "./TCItem";

export class TCAddToWishlistEvent extends TCECommerceEvent
{
  value: number;

  constructor(items?: Array<TCItem>)
  {
    super()
    super.name = "add_to_wishlist";
    this.items = items ? items : new Array<TCItem>;
  }
}