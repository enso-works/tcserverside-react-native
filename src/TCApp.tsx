import { TCServerSideBridge } from "./TCServerSide";

export class TCApp
{
    private static instance: TCApp;
    private additionalProperties = new Map();

    private _name: string;
    private _version: string;
    private _build: string;
    private _nameSpace: string;
    private _coreVersion: string;
    private _serverSideVersion: string;

    private constructor() {}

    public static getInstance(): TCApp 
    {
        if (!TCApp.instance) 
        {
            TCApp.instance = new TCApp();
        }

        return TCApp.instance;
    }
    
    public set name(theName: string) {
        if (this._name !== theName) {
            this._name = theName;
            TCServerSideBridge.setStringValue("name", theName, TCApp.name);
        }
    }

    public set version(theVersion: string) {
        if (this._version !== theVersion) {
            this._version = theVersion;
            TCServerSideBridge.setStringValue("version", theVersion, TCApp.name);
        }
    }

    public set build(theBuild: string) {
        if (this._build !== theBuild) {
            this._build = theBuild;
            TCServerSideBridge.setStringValue("build", theBuild, TCApp.name);
        }
    }

    public set nameSpace(theNamespace: string) {
        if (this._nameSpace !== theNamespace) {
            this._nameSpace = theNamespace;
            TCServerSideBridge.setStringValue("nameSpace", theNamespace, TCApp.name);
        }
    }

    public set coreVersion(coreV: string) {
        if (this._coreVersion !== coreV) {
            this._coreVersion = coreV;
            TCServerSideBridge.setStringValue("coreVersion", coreV, TCApp.name);
        }
    }

    public set serverSideVersion(serverSideV: string) {
        if (this._serverSideVersion !== serverSideV) {
            this._serverSideVersion = serverSideV;
            TCServerSideBridge.setStringValue("serverSideVersion", serverSideV, TCApp.name);
        }
    }

    public get name() 
    {
        return this._name;
    }

    public get version() 
    {
        return this._version;
    }

    public get build() 
    {
        return this._build;
    }

    public get nameSpace() 
    {
        return this._nameSpace;
    }

    public get coreVersion() 
    {
        return this._coreVersion;
    }

    public get serverSideVersion() 
    {
        return this._serverSideVersion;
    }

    initValues(properties: any) 
    {
        this._name = properties["name"] as string;
        this._version = properties["version"] as string;
        this._build = properties["build"] as string;
        this._nameSpace = properties["namespace"] as string;
        this._coreVersion = properties["core_version"] as string;
        this._serverSideVersion = properties["serverside_version"] as string;
    }

    addAdditionalProperty(key: string, value: string)
    {
        this.additionalProperties.set(key, value);
        TCServerSideBridge.addAdditionalProperty(key, value, TCApp.name);
    }
  
    addAdditionalPropertyWithMapValue(key: string, value: Object)
    {
        this.additionalProperties.set(key, value);
        TCServerSideBridge.addAdditionalPropertyWithMapValue(key, value, TCApp.name);
    }
  
    addAdditionalPropertyWithBooleanValue(key: string, value: boolean)
    {
        this.additionalProperties.set(key, value);
        TCServerSideBridge.addAdditionalPropertyWithBooleanValue(key, value, TCApp.name);
    }
  
    addAdditionalPropertyWithNumberValue(key: string, value: number)
    {
        this.additionalProperties.set(key, value);
        TCServerSideBridge.addAdditionalPropertyWithNumberValue(key, value, TCApp.name);
    }
  
    getAdditionalProperties(): Map<string, any>
    {
      return this.additionalProperties;
    }
  
    removeAdditionalProperty(key: string)
    {
        this.additionalProperties.delete(key);
        TCServerSideBridge.removeAdditionalProperty(key, TCApp.name);
    }
  
    clearAdditionalProperties()
    {
        this.additionalProperties.clear();
        TCServerSideBridge.clearAdditionalProperties(TCApp.name)
    }
}
