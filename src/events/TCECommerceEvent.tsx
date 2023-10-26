import { TCEvent } from "./TCEvent";
import { TCItem } from "./TCItem";

export class TCECommerceEvent extends TCEvent
{
  currency?: string;
  items?: Array<TCItem>;
}