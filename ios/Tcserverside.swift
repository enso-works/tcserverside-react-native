import React
import tcserverside_react_native
import TCServerSide_noIDFA

@objc(Tcserverside)
class Tcserverside: NSObject {

    private var tc:ServerSide? = nil;
    private var eventParser:TCEventParser? = nil;

    @objc(initServerSide:sourceKey:defaultBehaviour:callback:)
    func initServerSide(siteId: Double, sourceKey: String, defaultBehaviour: String, callback: RCTResponseSenderBlock) -> Void
    {
        TCDebug.setDebugLevel(TCLogLevel_Info)
        eventParser = TCEventParser()
        tc = ServerSide(siteID: Int32(siteId), andSourceKey: sourceKey, andDefaultBehaviour: evaluateBehaviour(stringBehaviour: defaultBehaviour))
        TCApp.sharedInstance().addAdditionalProperty("bridge", withStringValue: "react-native")
        TCApp.sharedInstance().addAdditionalProperty("tcserverside_react_native_plugin_version", withStringValue: TCServerSideReactNativeGenerated.version)

        callback([parseSchemes()])
    }
    
    @objc(setStringValue:value:className:)
    func setStringValue(key: String, value: String, className: String) -> Void
    {
        if (className == "TCDevice")
        {
            TCDevice.sharedInstance().setValue(value, forKey: key)
        }
        else if (className == "TCApp")
        {
            TCApp.sharedInstance().setValue(value, forKey: key)
        }
    }
    
    @objc(setNumValue:value:className:)
    func setNumValue(key: String, value: Double, className: String) -> Void
    {
        if (className == "TCDevice")
        {
            TCDevice.sharedInstance().setValue(value, forKey: key)
        }
        else if (className == "TCApp")
        {
            TCApp.sharedInstance().setValue(value, forKey: key)
        }
    }

    @objc(enableServerSide)
    func enableServerSide() -> Void
    {
        self.tc?.enable()
    }

    @objc(disableServerSide)
    func disableServerSide() -> Void
    {
        self.tc?.disableServerSide()
    }

    @objc(clearAdditionalProperties:)
    func clearAdditionalProperties(className: String) -> Void
    {
        if (className == "TCDevice")
        {
            TCDevice.sharedInstance().clearAdditionalProperties()
        }
        else if (className == "TCApp")
        {
            TCApp.sharedInstance().clearAdditionalProperties()
        }
    }

    @objc(addAdvertisingID)
    func addAdvertisingID() -> Void
    {
        tc?.addAdvertisingIDs()
    }

    @objc(removePermanentData:)
    func removePermanentData(key: String) -> Void
    {
        tc?.removePermanentData(key)
    }

    @objc(getPermanentData:callBack:)
    func getPermanentData(key: String, callback: RCTResponseSenderBlock) -> Void
    {
        callback([tc?.getPermanentData(key) as Any])
    }

    @objc(addPermanentData:value:)
    func addPermanentData(key: String, value: String) -> Void
    {
        tc?.addPermanentData(key, withValue: value)
    }
    
    @objc(enableRunningInBackground)
    func enableRunningInBackground()
    {
        tc?.enableRunningInBackground()
    }
    
    @objc(addAdditionalProperty:value:className:)
    func addAdditionalProperty(key: String, value: String, className: String)
    {
        if (className == "TCDevice")
        {
            TCDevice.sharedInstance().addAdditionalProperty(key, withStringValue: value)
        }
        else if (className == "TCApp")
        {
            TCApp.sharedInstance().addAdditionalProperty(key, withStringValue: value)
        }
    }
    
    @objc(addAdditionalPropertyWithMapValue:value:className:)
    func addAdditionalPropertyWithMapValue(key: String, value: Dictionary<String, Any>, className: String)
    {
        if (className == "TCDevice")
        {
            TCDevice.sharedInstance().addAdditionalProperty(key, withDictValue: value)
        }
        else if (className == "TCApp")
        {
            TCApp.sharedInstance().addAdditionalProperty(key, withDictValue: value)
        }
    }
    
    @objc(addAdditionalPropertyWithBooleanValue:value:className:)
    func addAdditionalPropertyWithBooleanValue(key: String, value: Bool, className: String)
    {
        if (className == "TCDevice")
        {
            TCDevice.sharedInstance().addAdditionalProperty(key, withBoolValue: value)
        }
        else if (className == "TCApp")
        {
            TCApp.sharedInstance().addAdditionalProperty(key, withBoolValue: value)
        }
    }
    
    @objc(addAdditionalPropertyWithNumberValue:value:className:)
    func addAdditionalPropertyWithNumberValue(key: String, value: Double, className: String)
    {
        if (className == "TCDevice")
        {
            TCDevice.sharedInstance().addAdditionalProperty(key, withNumberValue: NSDecimalNumber(value:value))
        }
        else if (className == "TCApp")
        {
            TCApp.sharedInstance().addAdditionalProperty(key, withNumberValue: NSDecimalNumber(value:value))
        }
    }
    
    @objc(removeAdditionalProperty:className:)
    func removeAdditionalProperty(key: String, className: String)
    {
        if (className == "TCDevice")
        {
            TCDevice.sharedInstance().removeAdditionalProperty(key)
        }
        else if (className == "TCApp")
        {
            TCApp.sharedInstance().removeAdditionalProperty(key)
        }
    }

    @objc(execute:eventJson:)
    func execute(eventName: String, eventJson: String)
    {
        if let data = eventJson.data(using: .utf8)
        {
            do
            {
                if let eventDict = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any]
                {
                    if let event = eventParser?.parseEvent(NSMutableDictionary(dictionary: eventDict), withName: eventName)
                    {
                        tc?.execute(event as? TCEvent)
                    }
                }
            }
            catch
            {
                print("Error parsing JSON: \(error)")
            }
        }
    }

    @objc(useLegacyUniqueIDForConsentID:)
    func useLegacyUniqueIDForConsentID(callback: RCTResponseSenderBlock)
    {
        TCPredefinedVariables.sharedInstance().useLegacyUniqueIDForConsentID()
        callback([TCUser.sharedInstance().consentID!])
    }
    
    @objc(useLegacyUniqueIDForAnonymousID:)
    func useLegacyUniqueIDForAnonymousID(callback: RCTResponseSenderBlock)
    {
        TCPredefinedVariables.sharedInstance().useLegacyUniqueIDForAnonymousID()
        callback([TCUser.sharedInstance().anonymous_id!])
    }
    
    func evaluateBehaviour(stringBehaviour: String) -> ETCConsentBehaviour
    {
        if (stringBehaviour == "PB_ALWAYS_ENABLED")
        {
            return PB_ALWAYS_ENABLED;
        }
        else if (stringBehaviour == "PB_DISABLED_BY_DEFAULT")
        {
            return PB_DISABLED_BY_DEFAULT;
        }

        return PB_DEFAULT_BEHAVIOUR;
    }
    
    func parseSchemes() -> String
    {
        var TCDeviceJson = TCDevice.sharedInstance().getJsonObject()
        TCDeviceJson?["osName"] = TCDevice.sharedInstance().osName
        TCDeviceJson?["osVersion"] = TCDevice.sharedInstance().osVersion
        TCDeviceJson?["screenWidth"] = TCDevice.sharedInstance().screenWidth
        TCDeviceJson?["screenHeight"] = TCDevice.sharedInstance().screenHeight
        
        var TCUserJson = TCUser.sharedInstance().getJsonObject()
        TCUserJson?["consentID"] = TCUser.sharedInstance().consentID
        
        
        let map: [String: Any] = [
            "device": TCDeviceJson ?? "",
            "app": TCApp.sharedInstance().getJsonObject() ?? "",
            "user": TCUserJson ?? ""
        ]
        
        do
        {
            let jsonData = try JSONSerialization.data(withJSONObject: map)
            if let jsonString = String(data: jsonData, encoding: .utf8) {
                return jsonString
            }
        } catch {
            print("Error converting TCServerSide intialisation JSON: \(error)")
        }

        return "";
    }
}
