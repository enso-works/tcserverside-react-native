import { TCEvent } from "./TCEvent";

export class TCSignUpEvent extends TCEvent
{
  method: string;

  constructor()
  {
    super();
    super.name = "sign_up";
  }
}