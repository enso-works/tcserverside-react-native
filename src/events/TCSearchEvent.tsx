import { TCEvent } from './TCEvent';

export class TCSearchEvent extends TCEvent {
  searchTerm?: string;

  constructor(searchTerm?: string) {
    super();
    this.name = 'search';
    this.searchTerm = searchTerm;
  }
}
