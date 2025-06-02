import { TCAdditionalProperties } from './TCAdditionalProperties';

export abstract class TCEvent extends TCAdditionalProperties {
  name?: string;
  pageType?: string;
  pageName?: string;
}
