# @commandersact/tcserverside-react-native

This package is a React Native bridge for TCServerSide — see the native [iOS](https://github.com/CommandersAct/iOSV5/tree/master/TCServerSide) and [Android](https://github.com/CommandersAct/AndroidV5/tree/master/TCServerSide) documentation for the full native behaviour and payload structure.

## Table of Contents

- [Installation](#installation)
  - [1. Install](#1-install)
  - [2. iOS setup](#2-ios-setup)
  - [3. Android setup](#3-android-setup)
  - [Minimum requirements](#minimum-requirements)
- [Quick start](#quick-start)
- [API Reference](#api-reference)
  - [Initialisation](#initialisation)
  - [Consent behaviour](#consent-behaviour)
  - [Executing events](#executing-events)
  - [Event Reference](#event-reference)
  - [Custom events](#custom-events)
  - [TCApp & TCDevice](#tcapp--tcdevice)
  - [How to customise your payload](#how-to-customise-your-payload)
  - [Permanent Data](#permanent-data)
  - [Background mode](#background-mode)
  - [Disabling / enabling](#disabling--enabling)
  - [Advertising ID](#advertising-id)
  - [Waiting for the user-agent (iOS)](#waiting-for-the-user-agent-ios)
  - [Migrating a legacy unique ID](#migrating-a-legacy-unique-id)
- [Quick Reference — Function Recap](#quick-reference--function-recap)
- [Related Documentation](#related-documentation)
- [Demo App](#demo-app)
- [Versions compatibility](#versions-compatibility)
- [Troubleshooting](#troubleshooting)
- [Support & Contact](#support--contact)

## Installation

### 1. Install

```sh
npm install @commandersact/tcserverside-react-native @commandersact/tccore-react-native
```

or

```sh
yarn add @commandersact/tcserverside-react-native @commandersact/tccore-react-native
```

> [!NOTE]
> `@commandersact/tccore-react-native` is a required peer dependency — it provides `TCUserInstance` (user identification, forwarded with every hit) and `TCDebugInstance` (native debug logging). See [Related Documentation](#related-documentation).

### 2. iOS setup

No manual Podfile edits are required — the package autolinks via CocoaPods. Once installed, navigate to your `ios/` directory and run:

```sh
pod install
```

### 3. Android setup

No extra step is needed — the module is autolinked.

### Minimum requirements

- iOS 13.0+
- Android API 21+

> [!NOTE]
> This package works with Expo apps using `expo prebuild` or a custom development client. Expo Go / the managed-only workflow is not supported (native code is required).

## Quick start

```tsx
import * as TCServerSide from '@commandersact/tcserverside-react-native';
import { TCBeginCheckoutEvent } from '@commandersact/tcserverside-react-native';

// Initialise ServerSide as early as possible — e.g. your app's root component
await TCServerSide.initServerSide(3311, 'a_source_key');

// Instantiate the event, then populate it according to your tagging plan
const event = new TCBeginCheckoutEvent();
event.currency = 'USD';
event.value = 12;

// Execute it
TCServerSide.execute(event);
```

Once initialised, you can read or override the automatically gathered context at any time:

```tsx
import { TCAppInstance, TCDeviceInstance } from '@commandersact/tcserverside-react-native';
import { TCUserInstance } from '@commandersact/tccore-react-native';

console.log(TCDeviceInstance.sdkID);
console.log(TCAppInstance.nameSpace);

TCDeviceInstance.sdkID = 'my_custom_sdk_id';
TCAppInstance.nameSpace = 'my_custom_namespace';
TCUserInstance.email = 'user@example.com';
```

If you need the full payload schema for a given event — every field, its type, and where it ends up in the JSON sent to our servers — see [Events Reference](#related-documentation) and [Mobile SDK Event Specificity](#related-documentation).

## API Reference

### Initialisation

```ts
TCServerSide.initServerSide(
  siteId: number,
  sourceKey: string,
  defaultBehaviour?: TCServerSide.ETCConsentBehaviour // PB_DEFAULT_BEHAVIOUR (default) | PB_ALWAYS_ENABLED | PB_DISABLED_BY_DEFAULT
): Promise<void>
```

Initialise `TCServerSide` as early as possible — typically your app's root component or entry point — so it is ready before any event is executed. You will need two values from your consulting team:

- **siteID** — identifies your web platform setup
- **sourceKey** — identifies this mobile source within your configuration

If you are using the Consent module, you can also set the default ServerSide behaviour while waiting for user consent — see [Consent behaviour](#consent-behaviour) below.

Once the returned promise resolves, `TCAppInstance` and `TCDeviceInstance` (below), as well as `TCUserInstance` from `@commandersact/tccore-react-native`, are populated with the values read from the native SDK (SDK version, device model, generated anonymous ID, …).

### Consent behaviour

By default, if `@commandersact/tcconsent-react-native` is present, ServerSide enters a "waiting for consent" state: it records hits locally but does not send them until consent is given. If the Consent module isn't present, ServerSide is enabled by default. `defaultBehaviour` lets you override this at initialisation time:

| Behaviour | Description |
|---|---|
| `PB_DEFAULT_BEHAVIOUR` | Waits for consent if `@commandersact/tcconsent-react-native` is present; enabled immediately otherwise. |
| `PB_ALWAYS_ENABLED` | Always sends hits regardless of consent state. Use for tags that do not require consent. |
| `PB_DISABLED_BY_DEFAULT` | Starts disabled and does not queue hits before consent is given. Use when you manage consent yourself, outside of our Consent module. |

Consent, once known, is forwarded inside `TCUserInstance` (from `@commandersact/tccore-react-native`). For the full behaviour and setup, see the [Consent module](#related-documentation).

### Executing events

```ts
TCServerSide.execute(event: TCEvent): void
```

Instantiate the relevant event class, populate it according to your tagging plan, then call `execute`. The event — combined with the `TCApp`, `TCDevice`, and `TCUser` context gathered automatically — is packaged into a JSON payload and sent to Commanders Act's servers (or queued, per [Consent behaviour](#consent-behaviour)).

> [!IMPORTANT]
> The standard event classes below only accept their own declared fields (plus whatever you add via `addAdditionalProperty*`, see [Custom events](#custom-events)). Setting an arbitrary extra property directly on a standard event object (e.g. `purchaseEvent.somethingElse = 'x'`) has no effect on iOS/Android event parsing — anything outside the class's declared fields must go through `addAdditionalProperty*`.

### Event Reference

An event represents something happening inside your application — for example "add to cart" or "login". Each event type is represented by a dedicated class that describes the data it requires; a "view cart" event, for instance, expects a list of cart items plus optional fields like `value` and `currency` that are commonly used by downstream solutions. Your consulting team will typically define which events to implement and what parameters each destination requires, usually via a tagging plan.

Every event extends the abstract `TCEvent`, which carries `name` (the native event key — already set by each subclass' constructor), `pageType`, and `pageName`, plus the [`addAdditionalProperty*` family](#custom-events) inherited from `TCAdditionalProperties`. E-commerce events additionally extend `TCECommerceEvent`, adding `currency` and `items: TCItem[]`.

| Class | Native event name | Constructor | Extra fields |
|---|---|---|---|
| `TCCustomEvent` | *(your own name)* | `(eventName?: string)` | none — use `addAdditionalProperty*` for everything |
| `TCPageViewEvent` | `page_view` | `(type?: string)` → sets `pageType` | `pageName` |
| `TCLoginEvent` | `login` | `()` | `method` |
| `TCSignUpEvent` | `sign_up` | `()` | `method` |
| `TCSearchEvent` | `search` | `(searchTerm?: string)` | `searchTerm` |
| `TCGenerateLeadEvent` | `generate_lead` | `(value?, currency?)` | `value`, `currency`, `ID` |
| `TCSelectContentEvent` | `select_content` | `()` | `contentType`, `itemID` |
| `TCSelectItemEvent` | `select_item` | `(items?: TCItem[])` | `itemListName`, `items` |
| `TCViewItemListEvent` | `view_item_list` | `(items?: TCItem[])` | `itemListName`, `items` |
| `TCViewItem` | `view_item` | `()` | `revenue` *(+ e-commerce fields)* |
| `TCViewCartEvent` | `view_cart` | `(items?: TCItem[])` | `value` *(+ e-commerce fields)* |
| `TCAddToCartEvent` | `add_to_cart` | `(items?, value?, currency?)` | `value` *(+ e-commerce fields)* |
| `TCAddToWishlistEvent` | `add_to_wishlist` | `(items?: TCItem[])` | `value` *(+ e-commerce fields)* |
| `TCRemoveFromCartEvent` | `remove_from_cart` | `(items?: TCItem[])` | `value` *(+ e-commerce fields)* |
| `TCAddShippingInfoEvent` | `add_shipping_info` | `(value?, currency?, items?)` | `value`, `coupon`, `shippingTier` *(+ e-commerce fields)* |
| `TCAddPaymentInfoEvent` | `add_payment_info` | `(paymentMethod?: string)` | `paymentMethod`, `coupon`, `revenue` *(+ e-commerce fields)* |
| `TCBeginCheckoutEvent` | `begin_checkout` | `()` | `revenue`, `value`, `coupon` *(+ e-commerce fields)* |
| `TCPurchaseEvent` | `purchase` | `(ID?, revenue?, value?, currency?, type?, paymentMethod?, status?, items?)` | `ID`, `revenue`, `value`, `shippingAmount`, `taxAmount`, `coupon`, `type`, `paymentMethod`, `status`, `url` *(+ e-commerce fields)* |
| `TCRefundEvent` | `refund` | `(ID?, revenue?, value?, currency?, type?, items?)` | `ID`, `revenue`, `value`, `shippingAmount`, `taxAmount`, `coupon`, `type`, `url` *(+ e-commerce fields)* |

Two supporting classes are used inside `items`:

```ts
class TCItem extends TCAdditionalProperties {
  ID?: string;
  product?: TCProduct;
  variant?: string;
  list_position?: number;
  discount?: number;
  quantity?: number;
  affiliation?: string;
  coupon?: string;
}

class TCProduct extends TCAdditionalProperties {
  ID?: string;
  name?: string;
  price?: number;
  currency?: string;
  categories?: string[];
  brand?: string;
  colors?: string[];
  size?: string;
}
```

Example with items:

```ts
import { TCPurchaseEvent, TCItem, TCProduct } from '@commandersact/tcserverside-react-native';

const item = new TCItem();
item.ID = 'iID1';
item.quantity = 1;
item.product = Object.assign(new TCProduct(), { ID: 'pID1', name: 'pName1', price: 1.5 });

const event = new TCPurchaseEvent('ID', 1.1, 12.2, 'EUR', 'purchase', 'CreditCard', 'waiting', [item]);
TCServerSide.execute(event);
```

### Custom events

When a standard class doesn't fit, send a fully custom event. Give it a meaningful name — it is used to route the event to your destinations.

```ts
import { TCCustomEvent } from '@commandersact/tcserverside-react-native';

const event = new TCCustomEvent('eventName');
event.addAdditionalProperty('myParam', 'myValue');
TCServerSide.execute(event);
```

`TCAdditionalProperties` (the base class of every event, `TCItem`, and `TCProduct`) exposes the same family everywhere:

```ts
addAdditionalProperty(key: string, value: string): void
addAdditionalPropertyWithMapValue(key: string, value: Object): void
addAdditionalPropertyWithBooleanValue(key: string, value: boolean): void
addAdditionalPropertyWithNumberValue(key: string, value: number): void
addAdditionalPropertyWithArrayValue(key: string, value: Array<any>): void

getAdditionalProperties(): { [key: string]: any }
removeAdditionalProperty(key: string): void
clearAdditionalProperties(): void
```

### TCApp & TCDevice

`TCApp` and `TCDevice` are singletons — exposed as `TCAppInstance` and `TCDeviceInstance` — backing the `context.app` and `context.device` sections of every event's payload. Edit them once and every event sent afterwards picks up the change. (The equivalent `TCUser` singleton lives in `@commandersact/tccore-react-native` as `TCUserInstance` — see [Related Documentation](#related-documentation).)

```ts
class TCApp {
  name?: string;
  version?: string;
  build?: string;
  nameSpace?: string;
  coreVersion?: string;
  serverSideVersion?: string;
  consentVersion?: string; // recomputed automatically if the Consent module is present
  // + the addAdditionalProperty* family
}

class TCDevice {
  sdkID?: string;
  manufacturer?: string;
  model?: string;
  name?: string;
  type?: string;
  timezone?: string;
  osName?: string;
  osVersion?: string;
  screenWidth?: number;
  screenHeight?: number;
  language?: string;
  region?: string;
  // + the addAdditionalProperty* family
}
```

Every field is a plain getter/setter — reading returns the last value set locally (or read from native at init); writing pushes the change straight to native.

```ts
TCDeviceInstance.timezone = 'Europe/Paris';
TCAppInstance.addAdditionalProperty('bridge_flavor', 'expo');
```

> [!NOTE]
> `getAdditionalProperties()` on `TCApp`/`TCDevice` returns the local JS-side map of what you've added through this session — it is not read back from native.

### How to customise your payload

Every field in the final JSON payload can be customised through three independent mechanisms — you can combine them freely:

| You want to… | Use | Scope |
|---|---|---|
| Add data to one specific event | `event.addAdditionalProperty(...)` | That `execute` call only |
| Add or override a field in `context.app` / `context.device` | `TCAppInstance.addAdditionalProperty(...)` / `TCDeviceInstance.addAdditionalProperty(...)` | All events, until changed again |
| Attach an arbitrary key/value to every event | `TCServerSide.addPermanentData(...)` | All events, until removed |

### Permanent Data

```ts
TCServerSide.addPermanentData(key: string, value: string): void
TCServerSide.getPermanentData(key: string): Promise<string>
TCServerSide.removePermanentData(key: string): Promise<string> // resolves with the removed value
```

Use this when you need to attach an arbitrary key/value to every event without going through a singleton — useful for values that never change at runtime (e.g. a vendor ID). Permanent Data entries persist across all `execute` calls until you explicitly remove them.

```ts
TCServerSide.addPermanentData('VENDOR_ID', 'UE-556XXXXX-01');
const value = await TCServerSide.getPermanentData('VENDOR_ID');
const removedValue = await TCServerSide.removePermanentData('VENDOR_ID');
```

> [!NOTE]
> Permanent Data has lower priority than a value set via `addAdditionalProperty` on an individual event — if the same key is set both ways, the per-event value wins.

### Background mode

When the application goes to the background, ServerSide flushes any queued data and then stops, to preserve battery and avoid unnecessary data usage. For apps with real background activity (e.g. audio playback), you can bypass this behaviour:

```ts
TCServerSide.enableRunningInBackground(): void
```

One consequence: in normal mode, unsent hits are saved to disk when going to the background. In background mode this is not guaranteed, so the SDK saves pending hits to disk more frequently to reduce the risk of loss.

### Disabling / enabling

If you need to stop tracking based on user preference, outside of the Consent module's flow:

```ts
TCServerSide.disableServerSide(): void
TCServerSide.enableServerSide(): void
```

This stops all internal systems — background handling, reachability listeners, and hit processing — and causes all subsequent calls to be ignored until ServerSide is re-enabled. You do not need to guard calls in your own code.

### Advertising ID

```ts
TCServerSide.addAdvertisingID(): void
```

For privacy reasons, the ServerSide module does not read the advertising identifier (IDFA on iOS, AAID on Android) automatically. You must first confirm that the user has accepted the relevant consent category — on iOS 14+, you also need to present the system ATT prompt before calling this. Once authorised, call `addAdvertisingID`: it checks for and adds (where available) the identifier and its tracking-enabled flag to `context.device` for use on subsequent events.

### Waiting for the user-agent (iOS)

```ts
TCServerSide.waitForUserAgent(): void
```

iOS-only — no-op on Android, which reads the user-agent synchronously and doesn't need this. Apple removed the synchronous API for reading the user-agent; the value is now obtained asynchronously, and on real devices the delay can sometimes exceed a minute. If a destination requires the user-agent, call this — it will be appended to all hits waiting to be sent once it becomes available.

### Migrating a legacy unique ID

Carried over from the SDK's v4→v5 migration path — only relevant if you were using `TC_UNIQUEID` in v4:

```ts
TCServerSide.useLegacyUniqueIDForAnonymousID(): void
TCServerSide.useLegacyUniqueIDForConsentID(): void
```

Each pushes the legacy ID into the corresponding `TCUserInstance` field (`anonymous_id` or `consentID`) so continuity is preserved across the upgrade. If you were using `TC_IDFA`, `TC_SDK_ID`, or `TC_NORMALIZED_ID`, no changes are needed.

## Quick Reference — Function Recap

| Function | Notes |
|---|---|
| `initServerSide` | Call once, first. Returns once native context (`TCApp`/`TCDevice`/`TCUser`) is populated. |
| `execute` | Send any `TCEvent` instance. |
| `addPermanentData` / `getPermanentData` / `removePermanentData` | Arbitrary key/values attached to every event. `getPermanentData`/`removePermanentData` are async. |
| `enableRunningInBackground` | Opt in to keep sending while backgrounded. |
| `disableServerSide` / `enableServerSide` | Manual opt-out/opt-in, outside of Consent module flow. |
| `addAdvertisingID` | Call only after consent/ATT is confirmed. |
| `waitForUserAgent` | iOS only — no-op on Android. |
| `useLegacyUniqueIDForAnonymousID` / `useLegacyUniqueIDForConsentID` | v4 → v5 migration only. |
| `TCAppInstance` / `TCDeviceInstance` | Singletons backing `context.app` / `context.device` on every event. |
| `TCUserInstance` (via `@commandersact/tccore-react-native`) | User identification and consent, forwarded with every event. |
| `TCDebugInstance` (via `@commandersact/tccore-react-native`) | Native debug logging — see [Troubleshooting](#troubleshooting). |

## Related Documentation

| Document | When you need it |
|---|---|
| [`tccore-react-native`](https://www.npmjs.com/package/@commandersact/tccore-react-native) | `TCUserInstance` (user identification, consent forwarding) and `TCDebugInstance` (native debug logging) — required alongside this package. |
| Native SDK documentation (`androidsdk/TCServerSide`, `iossdk/TCServerSide`) | Full native behaviour this bridge wraps: exact payload structure, the Firebase destination, and background-mode internals. Ask your consultant for the latest guide. |
| [Events Reference](https://doc.commandersact.com/developers/tracking/events-reference) | Full list of events and payloads, with code examples. |
| [Mobile SDK Event Specificity](https://community.commandersact.com/platform-x/developers/tracking/about-events/mobile-sdk-event-specificity) | Mapping between event names, SDK class names, and payload content. |
| [`tcconsent-react-native`](https://www.npmjs.com/package/@commandersact/tcconsent-react-native) | Managing user consent and its effect on this module — install alongside this package if you need it. |

## Demo App

A full working React Native app integrating this library: [TCDemoReactNative](https://github.com/CommandersAct/TCDemoReactNative)

## Versions compatibility

This package depends on `@commandersact/tccore-react-native` as a peer dependency, pinned to a specific version each release — npm will warn you of a mismatch. If you also use `@commandersact/tcconsent-react-native`, keep all three in sync:

```sh
npm install @commandersact/tccore-react-native@latest
npm install @commandersact/tcserverside-react-native@latest
npm install @commandersact/tcconsent-react-native@latest
```

> [!NOTE]
> Native iOS dependencies use fixed versions in the podspec to prevent unwanted auto-upgrades. Mixing versions across packages may cause linking failures.

## Troubleshooting

### Debugging — TCDebug

Without enabling logging first, the native SDKs produce no console output at all — this is the first thing to check if you're not seeing what you expect. Logging is controlled by the native `TCDebug` class, bridged through `@commandersact/tccore-react-native`:

```tsx
import { TCDebugInstance } from '@commandersact/tccore-react-native';

TCDebugInstance.enableNativeDebug();
// TCDebugInstance.disableNativeDebug();
```

Once enabled, check your **Xcode console** on iOS, or filter **Android Studio's Logcat** by tag `CommandersAct` on Android, for two log patterns that confirm an event actually reached our servers:

**Event queued** — recorded by the SDK, waiting on consent and/or connectivity:

```
CommandersAct: {"event_name":"purchase","id":"ID","revenue":1.1, ...}
```

**Event sent** — the SDK actually made the HTTP request:

```
CommandersAct: sending: https://collect.commander1.com/events?tc_s=...&tc_skey=...
CommandersAct: with POST data: {"event_name":"purchase", ...}
```

If you only ever see the first line, check your consent state and network connectivity. Neither log line prints the HTTP response code — use a network proxy (Charles, Wireshark) to confirm the server returned `200`.

> [!NOTE]
> Hits are sampled server-side, so a missing hit in the platform doesn't necessarily mean it wasn't received. To bypass sampling while testing, add a `test_code` additional property to your event (ask your consultant for the value):
>
> ```ts
> event.addAdditionalProperty('test_code', 'your_test_code');
> ```

### iOS build issues

On iOS, library linking can be fragile and cached build artifacts may become corrupted. If you encounter dependency issues, `_OBJ_CLASS_$_` errors, or "not found" build failures, work through these steps in order:

1. Delete your `node_modules` folder.
2. Remove `package-lock.json`.
3. Close Xcode if it's open.
4. Run `npm install` to reinstall dependencies.
5. Delete `ios/Podfile.lock`.
6. Remove the `ios/Pods` folder.
7. Run `pod install` inside the `ios/` directory.
8. If the issue persists, open Xcode, clean the build folder (⌘⇧K), and run the app from the `.xcworkspace` file.

## Support & Contact

Support: support@commandersact.com

http://www.commandersact.com

Commanders Act | 25 rue de Tolbiac - 75013 PARIS - France

![Commanders Act logo](res/ca_logo.png)
