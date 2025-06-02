import { NativeModules, Platform } from 'react-native';
import { TCEvent } from './events/TCEvent';
import { TCUserInstance } from '@commandersact/tccore-react-native';

const LINKING_ERROR =
  `The package 'tcserverside' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

export const TCServerSideBridge = NativeModules.Tcserverside
  ? NativeModules.Tcserverside
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export class TCDevice {
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

  constructor() {}

  public set sdkID(mID: string) {
    if (this._sdkID !== mID) {
      this._sdkID = mID;
      TCServerSideBridge.setStringValue('sdkID', mID, TCDevice.name);
    }
  }

  public set manufacturer(aManufacturer: string) {
    if (this._manufacturer !== aManufacturer) {
      this._manufacturer = aManufacturer;
      TCServerSideBridge.setStringValue(
        'manufacturer',
        aManufacturer,
        TCDevice.name
      );
    }
  }

  public set model(aModel: string) {
    if (this._model !== aModel) {
      this._model = aModel;
      TCServerSideBridge.setStringValue('model', aModel, TCDevice.name);
    }
  }

  public set name(theName: string) {
    if (this._name !== theName) {
      this._name = theName;
      TCServerSideBridge.setStringValue('name', theName, TCDevice.name);
    }
  }

  public set type(aType: string) {
    if (this._type !== aType) {
      this._type = aType;
      TCServerSideBridge.setStringValue('type', aType, TCDevice.name);
    }
  }

  public set timezone(time: string) {
    if (this._timezone !== time) {
      this._timezone = time;
      TCServerSideBridge.setStringValue('timezone', time, TCDevice.name);
    }
  }

  public set osName(name: string) {
    if (this._osName !== name) {
      this._osName = name;
      TCServerSideBridge.setStringValue('osName', name, TCDevice.name);
    }
  }

  public set osVersion(version: string) {
    if (this._osVersion !== version) {
      this._osVersion = version;
      TCServerSideBridge.setStringValue('osVersion', version, TCDevice.name);
    }
  }

  public set screenWidth(width: number) {
    if (this._screenWidth !== width) {
      this._screenWidth = width;
      TCServerSideBridge.setNumValue('screenWidth', width, TCDevice.name);
    }
  }

  public set screenHeight(height: number) {
    if (this._screenHeight !== height) {
      this._screenHeight = height;
      TCServerSideBridge.setNumValue('screenHeight', height, TCDevice.name);
    }
  }

  public get sdkID() {
    return this._sdkID;
  }

  public get manufacturer() {
    return this._manufacturer;
  }

  public get model() {
    return this._model;
  }

  public get name() {
    return this._name;
  }

  public get type() {
    return this._type;
  }

  public get timezone() {
    return this._timezone;
  }

  public get osName() {
    return this._osName;
  }

  public get osVersion() {
    return this._osVersion;
  }

  public get screenWidth() {
    return this._screenWidth;
  }

  public get screenHeight() {
    return this._screenHeight;
  }

  initValues(properties: any) {
    this.sdkID = properties.sdk_id as string;
    this._manufacturer = properties.manufacturer as string;
    this._model = properties.model as string;
    this._name = properties.name as string;
    this._type = properties.type as string;
    this._timezone = properties.timezone as string;
    this._osName = properties.osName as string;
    this._osVersion = properties.osVersion as string;
    this._screenWidth = properties.screenWidth as number;
    this._screenHeight = properties.screenHeight as number;
  }

  addAdditionalProperty(key: string, value: string) {
    this.additionalProperties.set(key, value);
    TCServerSideBridge.addAdditionalProperty(key, value, TCDevice.name);
  }

  addAdditionalPropertyWithMapValue(key: string, value: Object) {
    this.additionalProperties.set(key, value);
    TCServerSideBridge.addAdditionalPropertyWithMapValue(
      key,
      value,
      TCDevice.name
    );
  }

  addAdditionalPropertyWithBooleanValue(key: string, value: boolean) {
    this.additionalProperties.set(key, value);
    TCServerSideBridge.addAdditionalPropertyWithBooleanValue(
      key,
      value,
      TCDevice.name
    );
  }

  addAdditionalPropertyWithNumberValue(key: string, value: number) {
    this.additionalProperties.set(key, value);
    TCServerSideBridge.addAdditionalPropertyWithNumberValue(
      key,
      value,
      TCDevice.name
    );
  }

  getAdditionalProperties(): Map<string, any> {
    return this.additionalProperties;
  }

  removeAdditionalProperty(key: string) {
    this.additionalProperties.delete(key);
    TCServerSideBridge.removeAdditionalProperty(key, TCDevice.name);
  }

  clearAdditionalProperties() {
    this.additionalProperties.clear();
    TCServerSideBridge.clearAdditionalProperties(TCDevice.name);
  }
}

export class TCApp {
  private additionalProperties = new Map();

  private _name: string;
  private _version: string;
  private _build: string;
  private _nameSpace: string;
  private _coreVersion: string;
  private _serverSideVersion: string;

  constructor() {}

  public set name(theName: string) {
    if (this._name !== theName) {
      this._name = theName;
      TCServerSideBridge.setStringValue('name', theName, TCApp.name);
    }
  }

  public set version(theVersion: string) {
    if (this._version !== theVersion) {
      this._version = theVersion;
      TCServerSideBridge.setStringValue('version', theVersion, TCApp.name);
    }
  }

  public set build(theBuild: string) {
    if (this._build !== theBuild) {
      this._build = theBuild;
      TCServerSideBridge.setStringValue('build', theBuild, TCApp.name);
    }
  }

  public set nameSpace(theNamespace: string) {
    if (this._nameSpace !== theNamespace) {
      this._nameSpace = theNamespace;
      TCServerSideBridge.setStringValue('nameSpace', theNamespace, TCApp.name);
    }
  }

  public set coreVersion(coreV: string) {
    if (this._coreVersion !== coreV) {
      this._coreVersion = coreV;
      TCServerSideBridge.setStringValue('coreVersion', coreV, TCApp.name);
    }
  }

  public set serverSideVersion(serverSideV: string) {
    if (this._serverSideVersion !== serverSideV) {
      this._serverSideVersion = serverSideV;
      TCServerSideBridge.setStringValue(
        'serverSideVersion',
        serverSideV,
        TCApp.name
      );
    }
  }

  public get name() {
    return this._name;
  }

  public get version() {
    return this._version;
  }

  public get build() {
    return this._build;
  }

  public get nameSpace() {
    return this._nameSpace;
  }

  public get coreVersion() {
    return this._coreVersion;
  }

  public get serverSideVersion() {
    return this._serverSideVersion;
  }

  initValues(properties: any) {
    this._name = properties.name as string;
    this._version = properties.version as string;
    this._build = properties.build as string;
    this._nameSpace = properties.namespace as string;
    this._coreVersion = properties.core_version as string;
    this._serverSideVersion = properties.serverside_version as string;
  }

  addAdditionalProperty(key: string, value: string) {
    this.additionalProperties.set(key, value);
    TCServerSideBridge.addAdditionalProperty(key, value, TCApp.name);
  }

  addAdditionalPropertyWithMapValue(key: string, value: Object) {
    this.additionalProperties.set(key, value);
    TCServerSideBridge.addAdditionalPropertyWithMapValue(
      key,
      value,
      TCApp.name
    );
  }

  addAdditionalPropertyWithBooleanValue(key: string, value: boolean) {
    this.additionalProperties.set(key, value);
    TCServerSideBridge.addAdditionalPropertyWithBooleanValue(
      key,
      value,
      TCApp.name
    );
  }

  addAdditionalPropertyWithNumberValue(key: string, value: number) {
    this.additionalProperties.set(key, value);
    TCServerSideBridge.addAdditionalPropertyWithNumberValue(
      key,
      value,
      TCApp.name
    );
  }

  getAdditionalProperties(): Map<string, any> {
    return this.additionalProperties;
  }

  removeAdditionalProperty(key: string) {
    this.additionalProperties.delete(key);
    TCServerSideBridge.removeAdditionalProperty(key, TCApp.name);
  }

  clearAdditionalProperties() {
    this.additionalProperties.clear();
    TCServerSideBridge.clearAdditionalProperties(TCApp.name);
  }
}

export const TCDeviceInstance = new TCDevice();
export const TCAppInstance = new TCApp();

export async function initServerSide(
  siteId: number,
  sourceKey: string,
  defaultBehaviour: ETCConsentBehaviour = ETCConsentBehaviour.PB_DEFAULT_BEHAVIOUR
) {
  if (Platform.OS === 'ios') {
    await TCServerSideBridge.initServerSide(
      siteId,
      sourceKey,
      defaultBehaviour,
      onInitializedIOS
    );
  } else if (Platform.OS === 'android') {
    await TCServerSideBridge.initServerSide(
      siteId,
      sourceKey,
      defaultBehaviour,
      onInitializedAndroid
    );
  }
}

export function execute(event: TCEvent) {
  TCServerSideBridge.execute(event.name, JSON.stringify(event));
}

export function disableServerSide() {
  TCServerSideBridge.disableServerSide();
}

export function enableServerSide() {
  TCServerSideBridge.enableServerSide();
}

export function addAdvertisingID() {
  TCServerSideBridge.addAdvertisingID();
}

export function getPermanentData(): string {
  return TCServerSideBridge.getPermanentData();
}

export function addPermanentData(key: string, value: string) {
  TCServerSideBridge.addPermanentData(key, value);
}

export function enableRunningInBackground() {
  TCServerSideBridge.enableRunningInBackground();
}

export function useLegacyUniqueIDForAnonymousID() {
  TCServerSideBridge.useLegacyUniqueIDForAnonymousID(setAnonymousID);
}

export function useLegacyUniqueIDForConsentID() {
  TCServerSideBridge.useLegacyUniqueIDForConsentID(setConsentID);
}

export enum ETCConsentBehaviour {
  PB_DEFAULT_BEHAVIOUR = 'PB_DEFAULT_BEHAVIOUR',
  PB_ALWAYS_ENABLED = 'PB_ALWAYS_ENABLED',
  PB_DISABLED_BY_DEFAULT = 'PB_DISABLED_BY_DEFAULT',
}

function onInitializedIOS(schemes: any) {
  let map = new Map(Object.entries(JSON.parse(schemes)));
  TCAppInstance.initValues(map.get('app'));
  TCDeviceInstance.initValues(map.get('device'));
  TCUserInstance.initValues(map.get('user'));
}

function onInitializedAndroid(schemes: string) {
  let map = JSON.parse(schemes);
  TCAppInstance.initValues(JSON.parse(map.app));
  TCDeviceInstance.initValues(JSON.parse(map.device));
  TCUserInstance.initValues(JSON.parse(map.user));
}

function setConsentID(consentID: string) {
  TCUserInstance.consentID = consentID;

  console.log('consentID = ' + consentID);
}

function setAnonymousID(anonymous_id: string) {
  TCUserInstance.anonymous_id = anonymous_id;

  console.log('anonymousid = ' + anonymous_id);
}
