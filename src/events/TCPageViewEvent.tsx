import { TCEvent } from './TCEvent';

export class TCPageViewEvent extends TCEvent {
  constructor(type?: string) {
    super();
    this.name = 'page_view';
    this.pageType = type;
  }
}
