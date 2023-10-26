//
//  TCEventParser.m
//  tc_serverside_plugin
//
//  Created by Abdelhakim SAID on 14/02/2023.
//

#import <Foundation/Foundation.h>
#import "TCEventParser.h"

#if __has_include(<TCServerSide_noIDFA/ServerSide.h>)
#import <TCServerSide_noIDFA/ServerSide.h>
#else
#import <TCServerSide/ServerSide.h>
#endif


@implementation TCEventParser

- (instancetype) init
{
    self = [super init];
    if (self)
    {
    }
    return self;
}

- (id) parseEvent: (NSMutableDictionary *) eventDict withName: eventName
{
    id event;
    
    if ([eventName isEqualToString: @"add_shipping_info"])
    {
        event = [self parseEcommerceEvent: eventDict withEvent: [[TCAddShippingInfoEvent alloc] init]];
    }
    else if ([eventName isEqualToString: @"purchase"])
    {
        event = [self parseEcommerceEvent: eventDict withEvent: [[TCPurchaseEvent alloc] init]];
    }
    else if ([eventName isEqualToString: @"add_payement_info"])
    {
        event = [self parseEcommerceEvent: eventDict withEvent: [[TCAddPaymentInfoEvent alloc] init]];
    }
    else if ([eventName isEqualToString: @"add_to_cart"])
    {
        event = [self parseEcommerceEvent: eventDict withEvent: [[TCAddToCartEvent alloc] init]];
    }
    else if ([eventName isEqualToString: @"add_to_wishlist"])
    {
        event = [self parseEcommerceEvent: eventDict withEvent: [[TCAddToWishlistEvent alloc] init]];
    }
    else if ([eventName isEqualToString: @"refund"])
    {
        event = [self parseEcommerceEvent: eventDict withEvent: [[TCRefundEvent alloc] init]];
    }
    else if ([eventName isEqualToString: @"remove_from_cart"])
    {
        event = [self parseEcommerceEvent: eventDict withEvent: [[TCRemoveFromCartEvent alloc] init]];
    }
    else if ([eventName isEqualToString: @"begin_checkout"])
    {
        event = [self parseEcommerceEvent: eventDict withEvent: [[TCBeginCheckoutEvent alloc] init]];
    }
    else if ([eventName isEqualToString: @"view_cart"])
    {
        event = [self parseEcommerceEvent: eventDict withEvent: [[TCViewCartEvent alloc] init]];
    }
    else if ([eventName isEqualToString: @"view_item"])
    {
        event = [self parseEcommerceEvent: eventDict withEvent: [[TCViewItem alloc] init]];
    }
    else if ([eventName isEqualToString: @"view_item_list"])
    {
        event = [self parseEcommerceEvent: eventDict withEvent: [[TCViewItemListEvent alloc] init]];
    }
    else if ([eventName isEqualToString: @"select_item"])
    {
        event = [self parseEcommerceEvent: eventDict withEvent: [[TCSelectItemEvent alloc] init]];
    }
    else if ([eventName isEqualToString: @"generate_lead"])
    {
        event = [self parseEvent: eventDict withEvent: [[TCGenerateLeadEvent alloc] init]];
    }
    else if ([eventName isEqualToString: @"login"])
    {
        event = [self parseEvent: eventDict withEvent: [[TCLoginEvent alloc] init]];
    }
    else if ([eventName isEqualToString: @"page_view"])
    {
        event = [self parseEvent: eventDict withEvent: [[TCPageViewEvent alloc] init]];
    }
    else if ([eventName isEqualToString: @"search"])
    {
        event = [self parseEvent: eventDict withEvent: [[TCSearchEvent alloc] init]];
    }
    else if ([eventName isEqualToString: @"sign_up"])
    {
        event = [self parseEvent: eventDict withEvent: [[TCSignUpEvent alloc] init]];
    }
    else if ([eventName isEqualToString: @"select_content"])
    {
        event = [self parseEvent: eventDict withEvent: [[TCSelectContentEvent alloc] init]];
    }
    else
    {
        event = [self parseCustomEvent: eventDict withName: eventName];
    }

    return event;
}

- (id) parseCustomEvent: (NSMutableDictionary *) eventDict withName: (NSString *) eventName
{
    TCCustomEvent *event = [[TCCustomEvent alloc] initWithName: eventName];
    
    for (NSString *key in eventDict.allKeys)
    {
        if (![[eventDict objectForKey: key] isEqual: [NSNull null]])
        {
            if ([event respondsToSelector: NSSelectorFromString(key)])
            {
                [self setTCPropertyValue: [eventDict objectForKey: key] forKey: key onTCObject: event];
            }
            else
            {
                [[TCLogger sharedInstance] logMessage: [NSString stringWithFormat: @"EROOR : `%@` is not a property for TCCustomEvent", key] withLevel: TCLogLevel_Error];
                return nil;
            }
        }
    }

    return event;
}

- (id) parseEcommerceEvent: (NSMutableDictionary *) eventDict withEvent: (id) event
{
    [self setItems: eventDict forEvent: event];
    
    for (NSString *key in eventDict.allKeys)
    {
        if (![[eventDict objectForKey: key] isEqual: [NSNull null]])
        {
            if ([event respondsToSelector: NSSelectorFromString(key)])
            {
                [self setTCPropertyValue: [eventDict objectForKey: key] forKey: key onTCObject: event];
            }
            else
            {
                [[TCLogger sharedInstance] logMessage: [NSString stringWithFormat: @"EROOR : `%@` is not a property for %@ !\n", key, event] withLevel: TCLogLevel_Error];
                return nil;
            }
        }
    }

    return event;
}

- (void) setTCPropertyValue: (id) value forKey: (NSString *) key onTCObject: (id) obj
{
    if ([key isEqualToString: @"additionalProperties"])
    {
        [obj setValue: [value mutableCopy] forKey: key];
    }
    else
    {
        [obj setValue: value forKey: key];
    }
}

- (id) parseEvent: (NSMutableDictionary *) eventDict withEvent: (id) event
{
    for (NSString *key in eventDict.allKeys)
    {
        if (![[eventDict objectForKey: key] isEqual: [NSNull null]])
        {
            if ([event respondsToSelector: NSSelectorFromString(key)])
            {
                [self setTCPropertyValue: [eventDict objectForKey: key] forKey: key onTCObject: event];
            }
            else
            {
                [[TCLogger sharedInstance] logMessage: [NSString stringWithFormat: @"EROOR : `%@` is not a property for %@ !\n", key, event] withLevel: TCLogLevel_Error];
                return nil;
            }
        }
    }

    return event;
}

- (void) setItems: (NSMutableDictionary *) eventDict forEvent: (TCECommerceEvent *) event
{
    NSArray *items = [eventDict objectForKey: @"items"];
    
    if (![items isEqual: [NSNull null]])
    {
        for (NSMutableDictionary *itemDict in items)
        {
            TCItem *tc_item = [[TCItem alloc] init];
            [self setProduct: itemDict forTCItem: tc_item];

            for (NSString *key in itemDict.allKeys)
            {
                if (![[itemDict objectForKey: key] isEqual: [NSNull null]])
                {
                    [self setTCPropertyValue: [itemDict objectForKey: key] forKey: key onTCObject: tc_item];
                }
            }
            
            [event.items addObject: tc_item];
        }
        
        [eventDict removeObjectForKey: @"items"];
    }
}

- (void) setProduct: (NSMutableDictionary *) itemDict forTCItem: (TCItem *) item
{
    NSDictionary *productDict = [itemDict objectForKey: @"product"];
    TCProduct *tc_product = [[TCProduct alloc] init];

    for (NSString *key in productDict.allKeys)
    {
        if (![[productDict objectForKey: key] isEqual: [NSNull null]])
        {
            [self setTCPropertyValue: [productDict objectForKey: key] forKey: key onTCObject: tc_product];
        }
    }
    
    item.product = tc_product;
    [itemDict removeObjectForKey: @"product"];
}

@end
