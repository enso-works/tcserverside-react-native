import { NativeModules, Platform } from 'react-native';
import { TCDevice } from './TCDevice';
import { TCApp } from './TCApp';
import {TCEvent} from './events/TCEvent'
import { TCUser } from 'tccore-react-native'; 

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

export enum ETCConsentBehaviour
{
  PB_DEFAULT_BEHAVIOUR = 'PB_DEFAULT_BEHAVIOUR',
  PB_ALWAYS_ENABLED = 'PB_ALWAYS_ENABLED',
  PB_DISABLED_BY_DEFAULT = 'PB_DISABLED_BY_DEFAULT'
}

function onInitializedIOS(schemes: any)
{
    let map = new Map(Object.entries(JSON.parse(schemes)));
    TCApp.getInstance().initValues(map.get("app"))
    TCDevice.getInstance().initValues(map.get("device"))
}

function onInitializedAndroid(schemes: string)
{
    let map = JSON.parse(schemes)
    TCApp.getInstance().initValues(JSON.parse(map["app"]))
    TCDevice.getInstance().initValues(JSON.parse(map["device"]))
    TCUser.getInstance().initValues(JSON.parse(map["user"]))
}
