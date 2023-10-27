#import <React/RCTBridgeModule.h>
#import "TCEventParser.h"

@interface RCT_EXTERN_MODULE(Tcserverside, NSObject)

RCT_EXTERN_METHOD(initServerSide: (double) siteId sourceKey: (NSString *) sourceKey defaultBehaviour: (NSString *) behaviour callback: (RCTResponseSenderBlock) callback)
RCT_EXTERN_METHOD(setStringValue: (NSString *) key value: (NSString *) value className: (NSString *) className)
RCT_EXTERN_METHOD(setNumValue: (NSString *) key value: (double) value className: (NSString *) className)
RCT_EXTERN_METHOD(enableServerSide)
RCT_EXTERN_METHOD(disableServerSide)
RCT_EXTERN_METHOD(clearAdditionalProperties: (NSString *) className)
RCT_EXTERN_METHOD(addAdvertisingID)
RCT_EXTERN_METHOD(removePermanentData: (NSString *) key)
RCT_EXTERN_METHOD(getPermanentData: (NSString *) key callback: (RCTResponseSenderBlock) callback)
RCT_EXTERN_METHOD(addPermanentData: (NSString *) key value: (RCTResponseSenderBlock) value)
RCT_EXTERN_METHOD(enableRunningInBackground)
RCT_EXTERN_METHOD(addAdditionalProperty: (NSString *) key value: (NSString*) value className: (NSString*) className)
RCT_EXTERN_METHOD(addAdditionalPropertyWithMapValue: (NSString *) key value: (NSDictionary*) value className: (NSString*) className)
RCT_EXTERN_METHOD(addAdditionalPropertyWithBooleanValue: (NSString *) key value: (BOOL) value className: (NSString*) className)
RCT_EXTERN_METHOD(addAdditionalPropertyWithNumberValue: (NSString *) key value: (double) value className: (NSString*) className)
RCT_EXTERN_METHOD(removeAdditionalProperty: (NSString *) key className: (NSString*) className)
RCT_EXTERN_METHOD(execute: (NSString *) eventName eventJson: (NSString*) eventStringJson)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
