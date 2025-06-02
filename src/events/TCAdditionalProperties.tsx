export abstract class TCAdditionalProperties {
  private additionalProperties: { [key: string]: any } = {};

  addAdditionalProperty(key: string, value: string) {
    this.additionalProperties[key] = value;
  }

  addAdditionalPropertyWithMapValue(key: string, value: Object) {
    this.additionalProperties[key] = value;
  }

  addAdditionalPropertyWithBooleanValue(key: string, value: boolean) {
    this.additionalProperties[key] = value;
  }

  addAdditionalPropertyWithNumberValue(key: string, value: number) {
    this.additionalProperties[key] = value;
  }

  addAdditionalPropertyWithArrayValue(key: string, value: Array<any>) {
    this.additionalProperties[key] = value;
  }

  getAdditionalProperties(): { [key: string]: any } {
    return this.additionalProperties;
  }

  removeAdditionalProperty(key: string) {
    delete this.additionalProperties[key];
  }

  clearAdditionalProperties() {
    this.additionalProperties = {};
  }
}
