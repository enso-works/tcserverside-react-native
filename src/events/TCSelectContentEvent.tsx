import { TCEvent } from "./TCEvent";

export class TCSelectContentEvent extends TCEvent
{
  contentType: string;
  itemID: string;

  constructor()
  {
    super();
    super.name = "select_content";
  }
}