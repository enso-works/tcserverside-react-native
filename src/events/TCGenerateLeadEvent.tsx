import { TCEvent } from './TCEvent';

export class TCGenerateLeadEvent extends TCEvent {
  value?: number;
  currency?: string;
  ID?: string;

  constructor(value?: number, currency?: string) {
    super();
    this.value = value;
    this.currency = currency;
    this.name = 'generate_lead';
  }
}
