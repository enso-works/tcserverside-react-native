import { NativeModules, Platform } from 'react-native';
import {TCEvent} from './events/TCEvent'
import {TCUserInstance} from 'tccore-react-native'; 
import { TCDevice } from './TCDevice';
import { TCApp } from './TCApp';
export const TCDeviceInstance = new TCDevice();
export const TCAppInstance = new TCApp();


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

export async function initServerSide(siteId: number, sourceKey: string, defaultBehaviour: ETCConsentBehaviour = ETCConsentBehaviour.PB_DEFAULT_BEHAVIOUR)
{
    if (Platform.OS === 'ios')
    {
        await TCServerSideBridge.initServerSide(siteId, sourceKey, defaultBehaviour, onInitializedIOS);
    }
    else if (Platform.OS === 'android')
    {
        await TCServerSideBridge.initServerSide(siteId, sourceKey, defaultBehaviour, onInitializedAndroid);
    }
}

export function execute(event: TCEvent)
{
    TCServerSideBridge.execute(event.name, JSON.stringify(event));
}

export function disableServerSide()
{
    TCServerSideBridge.disableServerSide();
}

export function enableServerSide()
{
    TCServerSideBridge.enableServerSide();
}

export function addAdvertisingID()
{
    TCServerSideBridge.addAdvertisingID();
}

export function getPermanentData(): string
{
    return TCServerSideBridge.getPermanentData();
}

export function addPermanentData(key: string, value: string)
{
    TCServerSideBridge.addPermanentData(key, value);
}

export function enableRunningInBackground()
{
    TCServerSideBridge.enableRunningInBackground();
}

export function useLegacyUniqueIDForAnonymousID()
{
    TCServerSideBridge.useLegacyUniqueIDForAnonymousID(setAnonymousID);
}

export function useLegacyUniqueIDForConsentID()
{
    TCServerSideBridge.useLegacyUniqueIDForConsentID(setConsentID);
}

export enum ETCConsentBehaviour
{
  PB_DEFAULT_BEHAVIOUR = 'PB_DEFAULT_BEHAVIOUR',
  PB_ALWAYS_ENABLED = 'PB_ALWAYS_ENABLED',
  PB_DISABLED_BY_DEFAULT = 'PB_DISABLED_BY_DEFAULT'
}

function onInitializedIOS(schemes: any)
{
    let map = new Map(Object.entries(JSON.parse(schemes)));
    TCAppInstance.initValues(map.get("app"))
    TCDeviceInstance.initValues(map.get("device"))
    TCUserInstance.initValues(map.get("user"))
}

function onInitializedAndroid(schemes: string)
{
    let map = JSON.parse(schemes)
    TCAppInstance.initValues(JSON.parse(map["app"]))
    TCDeviceInstance.initValues(JSON.parse(map["device"]))
    TCUserInstance.initValues(JSON.parse(map["user"]))
}

function setConsentID(consentID: string)
{
    TCUserInstance.consentID = consentID

    console.log("consentID = " + consentID)
}

function setAnonymousID(anonymous_id: string)
{
    TCUserInstance.anonymous_id = anonymous_id

    console.log("anonymousid = " + anonymous_id)
}