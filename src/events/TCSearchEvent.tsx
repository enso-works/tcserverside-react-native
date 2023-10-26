
import { TCEvent } from "./TCEvent";

export class TCSearchEvent extends TCEvent
{
  searchTerm?: string;

  constructor(searchTerm?: string)
  {
    super();
    super.name = "search";
    this.searchTerm = searchTerm;
  }
}