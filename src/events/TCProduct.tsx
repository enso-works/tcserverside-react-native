import {TCAdditionalProperties} from './TCAdditionalProperties'

export class TCProduct extends TCAdditionalProperties
{
  ID?: string;
  name?: string;
  price?: number;
  currency?: string;
  categories?: Array<string>;
  brand?: string;
  colors?: Array<string>;
  size?: string;
}