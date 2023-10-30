import { TCServerSideBridge } from "./TCServerSide";

export class TCDevice
{
    private additionalProperties = new Map();

    private _sdkID: string;
    private _manufacturer: string;
    private _model: string;
    private _name: string;
    private _type: string;
    private _timezone: string;
    private _osName: string;
    private _osVersion: string;
    private _screenWidth: number;
    private _screenHeight: number;
    
    constructor() { }

    public set sdkID(mID: string) {
        if (this._sdkID !== mID) {
            this._sdkID = mID;
            TCServerSideBridge.setStringValue("sdkID", mID, TCDevice.name);
        }
    }

    public set manufacturer(aManufacturer: string) {
        if (this._manufacturer !== aManufacturer) {
            this._manufacturer = aManufacturer;
            TCServerSideBridge.setStringValue("manufacturer", aManufacturer, TCDevice.name);
        }
    }

    public set model(aModel: string) {
        if (this._model !== aModel) {
            this._model = aModel;
            TCServerSideBridge.setStringValue("model", aModel, TCDevice.name);
        }
    }

    public set name(theName: string) {
        if (this._name !== theName) {
            this._name = theName;
            TCServerSideBridge.setStringValue("name", theName, TCDevice.name);
        }
    }

    public set type(aType: string) {
        if (this._type !== aType) {
            this._type = aType;
            TCServerSideBridge.setStringValue("type", aType, TCDevice.name);
        }
    }

    public set timezone(time: string) {
        if (this._timezone !== time) {
            this._timezone = time;
            TCServerSideBridge.setStringValue("timezone", time, TCDevice.name);
        }
    }

    public set osName(name: string) {
        if (this._osName !== name) {
            this._osName = name;
            TCServerSideBridge.setStringValue("osName", name, TCDevice.name);
        }
    }

    public set osVersion(version: string) {
        if (this._osVersion !== version) {
            this._osVersion = version;
            TCServerSideBridge.setStringValue("osVersion", version, TCDevice.name);
        }
    }

    public set screenWidth(width: number) {
        if (this._screenWidth !== width) {
            this._screenWidth = width;
            TCServerSideBridge.setNumValue("screenWidth", width, TCDevice.name);
        }
    }

    public set screenHeight(height: number) {
        if (this._screenHeight !== height) {
            this._screenHeight = height;
            TCServerSideBridge.setNumValue("screenHeight", height, TCDevice.name);
        }
    }
    
    public get sdkID() 
    {
        return this._sdkID;
    }

    public get manufacturer() 
    {
        return this._manufacturer;
    }

    public get model() 
    {
        return this._model;
    }

    public get name() 
    {
        return this._name;
    }

    public get type() 
    {
        return this._type;
    }

    public get timezone() 
    {
        return this._timezone;
    }

    public get osName() 
    {
        return this._osName;
    }
    
    public get osVersion() 
    {
        return this._osVersion;
    }

    public get screenWidth() 
    {
        return this._screenWidth;
    }

    public get screenHeight() 
    {
        return this._screenHeight;
    }

    initValues(properties: any) 
    {
        this.sdkID = properties["sdk_id"] as string;
        this._manufacturer = properties["manufacturer"] as string;
        this._model = properties["model"] as string;
        this._name = properties["name"] as string;
        this._type = properties["type"] as string;
        this._timezone = properties["timezone"] as string;
        this._osName = properties["osName"] as string;
        this._osVersion = properties["osVersion"] as string;
        this._screenWidth = properties["screenWidth"] as number;
        this._screenHeight = properties["screenHeight"] as number;
    }

    addAdditionalProperty(key: string, value: string)
    {
        this.additionalProperties.set(key, value);
        TCServerSideBridge.addAdditionalProperty(key, value, TCDevice.name);
    }
  
    addAdditionalPropertyWithMapValue(key: string, value: Object)
    {
        this.additionalProperties.set(key, value);
        TCServerSideBridge.addAdditionalPropertyWithMapValue(key, value, TCDevice.name);
    }
  
    addAdditionalPropertyWithBooleanValue(key: string, value: boolean)
    {
        this.additionalProperties.set(key, value);
        TCServerSideBridge.addAdditionalPropertyWithBooleanValue(key, value, TCDevice.name);
    }
  
    addAdditionalPropertyWithNumberValue(key: string, value: number)
    {
        this.additionalProperties.set(key, value);
        TCServerSideBridge.addAdditionalPropertyWithNumberValue(key, value, TCDevice.name);
    }
  
    getAdditionalProperties(): Map<string, any>
    {
      return this.additionalProperties;
    }
  
    removeAdditionalProperty(key: string)
    {
        this.additionalProperties.delete(key);
        TCServerSideBridge.removeAdditionalProperty(key, TCDevice.name);
    }
  
    clearAdditionalProperties()
    {
        this.additionalProperties.clear();
        TCServerSideBridge.clearAdditionalProperties(TCDevice.name)
    }
}