import { TCECommerceEvent } from './TCECommerceEvent';

export class TCViewItem extends TCECommerceEvent {
  revenue: number;

  constructor() {
    super();
    super.name = 'view_item';
  }
}
