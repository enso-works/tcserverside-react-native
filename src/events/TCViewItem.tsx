import { TCECommerceEvent } from './TCECommerceEvent';

export class TCViewItem extends TCECommerceEvent {
  revenue: number;

  constructor() {
    super();
    this.name = 'view_item';
  }
}
