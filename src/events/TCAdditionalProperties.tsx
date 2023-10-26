export abstract class TCAdditionalProperties
{
  private additionalProperties = new Map();

  addAdditionalProperty(key: string, value: string)
  {
      this.additionalProperties.set(key, value);
  }

  addAdditionalPropertyWithMapValue(key: string, value: Object)
  {
      this.additionalProperties.set(key, value);
  }

  addAdditionalPropertyWithBooleanValue(key: string, value: boolean)
  {
      this.additionalProperties.set(key, value);
  }

  addAdditionalPropertyWithNumberValue(key: string, value: number)
  {
      this.additionalProperties.set(key, value);
  }

  addAdditionalPropertyWithArrayValue(key: string, value: Array<any>)
  {
      this.additionalProperties.set(key, value);
  }

  getAdditionalProperties(): Map<string, any>
  {
    return this.additionalProperties;
  }

  removeAdditionalProperty(key: string)
  {
      this.additionalProperties.delete(key);
  }

  clearAdditionalProperties()
  {
      this.additionalProperties.clear();
  }
}