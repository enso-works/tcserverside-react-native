import { TCAdditionalProperties } from './TCAdditionalProperties';
import { TCProduct } from './TCProduct';

export class TCItem extends TCAdditionalProperties {
  ID?: string;
  product?: TCProduct;
  variant?: string;
  list_position?: number;
  discount?: number;
  quantity?: number;
  affiliation?: string;
  coupon?: string;
}
