import { TCEvent } from './TCEvent';

export class TCSignUpEvent extends TCEvent {
  method: string;

  constructor() {
    super();
    this.name = 'sign_up';
  }
}
