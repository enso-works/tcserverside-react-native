import { TCEvent } from './TCEvent';

export class TCPageViewEvent extends TCEvent {
  constructor(type?: string) {
    super();
    super.name = 'page_view';
    super.pageType = type;
  }
}
