import { Platform } from 'react-native';
import { TCEvent } from './events/TCEvent'
import { TCUserInstance } from '@commandersact/tccore-react-native'; 
import { TCDevice } from './TCDevice';
import { TCApp } from './TCApp';
import { TCServerSideBridge } from './TCServerSideBridge';

export const TCDeviceInstance = new TCDevice();
export const TCAppInstance = new TCApp();

export function initServerSide(siteId: number, sourceKey: string, defaultBehaviour: ETCConsentBehaviour = ETCConsentBehaviour.PB_DEFAULT_BEHAVIOUR): Promise<void>
{
    return new Promise((resolve) =>
    {
        if (Platform.OS === 'ios')
        {
            TCServerSideBridge.initServerSide(siteId, sourceKey, defaultBehaviour, (schemes: any) => { onInitializedIOS(schemes); resolve(); });
        }
        else if (Platform.OS === 'android')
        {
            TCServerSideBridge.initServerSide(siteId, sourceKey, defaultBehaviour, (schemes: string) => { onInitializedAndroid(schemes); resolve(); });
        }
    });
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

export function getPermanentData(key: string): Promise<string>
{
    return new Promise((resolve) =>
    {
        TCServerSideBridge.getPermanentData(key, (value: string) => resolve(value));
    });
}

export function addPermanentData(key: string, value: string)
{
    TCServerSideBridge.addPermanentData(key, value);
}

export function removePermanentData(key: string): Promise<string>
{
    return new Promise((resolve) =>
    {
        TCServerSideBridge.removePermanentData(key, (value: string) => resolve(value));
    });
}

export function enableRunningInBackground()
{
    TCServerSideBridge.enableRunningInBackground();
}

// iOS only — Android reads the user-agent synchronously and has no equivalent call.
export function waitForUserAgent()
{
    if (Platform.OS === 'ios')
    {
        TCServerSideBridge.waitForUserAgent();
    }
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