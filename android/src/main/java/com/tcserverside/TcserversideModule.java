package com.tcserverside;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.google.gson.Gson;
import com.tagcommander.lib.core.TCAdditionalProperties;
import com.tagcommander.lib.core.TCDebug;
import com.tagcommander.lib.core.TCLogger;
import com.tagcommander.lib.core.TCUser;
import com.tagcommander.lib.serverside.ETCConsentBehaviour;
import com.tagcommander.lib.serverside.TCPredefinedVariables;
import com.tagcommander.lib.serverside.TCServerSide;
import com.tagcommander.lib.serverside.events.TCAddPaymentInfoEvent;
import com.tagcommander.lib.serverside.events.TCAddShippingInfoEvent;
import com.tagcommander.lib.serverside.events.TCAddToCartEvent;
import com.tagcommander.lib.serverside.events.TCAddToWishlistEvent;
import com.tagcommander.lib.serverside.events.TCBeginCheckoutEvent;
import com.tagcommander.lib.serverside.events.TCCustomEvent;
import com.tagcommander.lib.serverside.events.TCGenerateLeadEvent;
import com.tagcommander.lib.serverside.events.TCLoginEvent;
import com.tagcommander.lib.serverside.events.TCPageViewEvent;
import com.tagcommander.lib.serverside.events.TCPurchaseEvent;
import com.tagcommander.lib.serverside.events.TCRefundEvent;
import com.tagcommander.lib.serverside.events.TCRemoveFromCartEvent;
import com.tagcommander.lib.serverside.events.TCSearchEvent;
import com.tagcommander.lib.serverside.events.TCSelectContentEvent;
import com.tagcommander.lib.serverside.events.TCSelectItemEvent;
import com.tagcommander.lib.serverside.events.TCSignUpEvent;
import com.tagcommander.lib.serverside.events.TCViewCartEvent;
import com.tagcommander.lib.serverside.events.TCViewItem;
import com.tagcommander.lib.serverside.events.TCViewItemListEvent;
import com.tagcommander.lib.serverside.events.base.TCEvent;
import com.tagcommander.lib.serverside.schemas.TCApp;
import com.tagcommander.lib.serverside.schemas.TCDevice;

import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;

@ReactModule(name = TcserversideModule.NAME)
public class TcserversideModule extends ReactContextBaseJavaModule
{
  public static final String NAME = "Tcserverside";
  private TCServerSide tcServerSide;
  private Gson gson = new Gson();

  public TcserversideModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod
  public void initServerSide(int siteId, String sourceKey, String defaultBehaviour, Callback callBack)
  {
    TCDebug.setDebugLevel(Log.VERBOSE);
    tcServerSide = new TCServerSide(siteId, sourceKey, getReactApplicationContext().getApplicationContext(), evaluateBehaviour(defaultBehaviour));
    callBack.invoke(parseSchemes());
  }

  private String parseSchemes()
  {
    JSONObject schemes =  new JSONObject();

    try
    {
      schemes.put("device", getTCDeviceJson());
      schemes.put("app", TCApp.getInstance().getJsonObject().toString());
      schemes.put("user", getTCUserJson());
    }
    catch (JSONException e)
    {
      throw new RuntimeException(e);
    }

    return schemes.toString();
  }

  private String getTCDeviceJson()
  {
    JSONObject rawTCDevice = TCDevice.getInstance().getJsonObject();

    try
    {
      rawTCDevice.put("osName", TCDevice.getInstance().osName);
      rawTCDevice.put("osVersion", TCDevice.getInstance().osVersion);
      rawTCDevice.put("screenWidth", TCDevice.getInstance().screenWidth);
      rawTCDevice.put("screenHeight", TCDevice.getInstance().screenHeight);
    }
    catch (JSONException e)
    {
      e.printStackTrace();
    }

    return rawTCDevice.toString();
  }

  @ReactMethod
  public void execute(String eventName, String eventStringJson)
  {
    if (tcServerSide != null)
    {
      tcServerSide.execute(parseTCEvent(eventName, eventStringJson));
    }
  }

  @ReactMethod
  public void enableRunningInBackground()
  {
    if (tcServerSide != null)
    {
      tcServerSide.enableRunningInBackground();
    }
  }

  @ReactMethod
  public void addPermanentData(String key, String value)
  {
    if (tcServerSide != null)
    {
      tcServerSide.addPermanentData(key, value);
    }
  }

  @ReactMethod
  public void getPermanentData(String key, Callback callback)
  {
    if (tcServerSide != null)
    {
      callback.invoke(tcServerSide.getPermanentData(key));
    }
  }

  @ReactMethod
  public void removePermanentData(String key)
  {
    if (tcServerSide != null)
    {
      tcServerSide.removePermanentData(key);
    }
  }

  @ReactMethod
  public void addAdvertisingID()
  {
    if (tcServerSide != null)
    {
      tcServerSide.addAdvertisingID();
    }
  }

  @ReactMethod
  public void setStringValue(String key, String value, String className)
  {
    Object obj = null;

    if (value != null)
    {
      Class<?> clazz = null;

      if (className.equals("TCDevice"))
      {
        clazz = TCDevice.getInstance().getClass();
        obj = TCDevice.getInstance();
      }
      else if(className.equals("TCApp"))
      {
        clazz = TCApp.getInstance().getClass();
        obj = TCApp.getInstance();
      }

      while (clazz != null)
      {
        try
        {
          Field field = clazz.getDeclaredField(key);
          field.setAccessible(true);
          field.set(obj, value);
          return;
        }
        catch (NoSuchFieldException e)
        {
          clazz = clazz.getSuperclass();
        }
        catch (Exception e)
        {
          TCLogger.getInstance().logMessage("Error while setting field for property {"+ key + "} with value {" + value +"}, :" + e.getMessage(), Log.ERROR);
          return;
        }
      }
    }
  }

  @ReactMethod
  public void setNumValue(String key, Double value, String className)
  {
    Object obj = null;

    if (value != null)
    {
      Class<?> clazz = null;

      if (className.equals("TCDevice"))
      {
        clazz = TCDevice.getInstance().getClass();
        obj = TCDevice.getInstance();
      }
      else if(className.equals("TCApp"))
      {
        clazz = TCApp.getInstance().getClass();
        obj = TCApp.getInstance();
      }

      while (clazz != null)
      {
        try
        {
          Field field = clazz.getDeclaredField(key);
          field.setAccessible(true);
          field.set(obj, value);
          return;
        }
        catch (NoSuchFieldException e)
        {
          clazz = clazz.getSuperclass();
        }
        catch (Exception e)
        {
          TCLogger.getInstance().logMessage("Error while setting field for property {"+ key + "} with value {" + value +"}, :" + e.getMessage(), Log.ERROR);
          return;
        }
      }
    }
  }

  @ReactMethod
  public void removeAdditionalProperty(String key, String className)
  {
    TCAdditionalProperties obj = null;

    switch (className)
    {
      case "TCDevice":
        obj = TCDevice.getInstance();
        break;
      case "TCApp":
        obj = TCApp.getInstance();
        break;
    }

    if (obj != null && key != null)
    {
      obj.removeAdditionalProperty(key);
    }
  }

  @ReactMethod
  public void addAdditionalProperty(String key, String value, String className)
  {
    TCAdditionalProperties obj = null;
    if (value != null)
    {
      switch (className)
      {
        case "TCDevice":
          obj = TCDevice.getInstance();
          break;
        case "TCApp":
          obj = TCApp.getInstance();
          break;
      }

      if (obj != null)
      {
        obj.addAdditionalProperty(key, value);
      }
    }
  }

  @ReactMethod
  public void addAdditionalPropertyWithMapValue(String key, ReadableMap value, String className)
  {
    TCAdditionalProperties obj = null;
    if (value != null)
    {
      switch (className)
      {
        case "TCDevice":
          obj = TCDevice.getInstance();
          break;
        case "TCApp":
          obj = TCApp.getInstance();
          break;
      }

      if (obj != null)
      {
        obj.addAdditionalProperty(key, new JSONObject(value.toHashMap()));
      }
    }
  }

  @ReactMethod
  public void addAdditionalPropertyWithBooleanValue(String key, boolean value, String className)
  {
    TCAdditionalProperties obj = null;

    switch (className)
    {
      case "TCDevice":
        obj = TCDevice.getInstance();
        break;
      case "TCApp":
        obj = TCApp.getInstance();
        break;
    }

    if (obj != null)
    {
      obj.addAdditionalProperty(key, value);
    }
  }


  @ReactMethod
  public void addAdditionalPropertyWithNumberValue(String key, double value, String className)
  {
    TCAdditionalProperties obj = null;

    switch (className)
    {
      case "TCDevice":
        obj = TCDevice.getInstance();
        break;
      case "TCApp":
        obj = TCApp.getInstance();
        break;
    }

    if (obj != null)
    {
      obj.addAdditionalProperty(key, Double.valueOf(value).floatValue());
    }
  }

  @ReactMethod
  public void clearAdditionalProperties(String className)
  {
    TCAdditionalProperties obj = null;

    switch (className)
    {
      case "TCDevice":
        obj = TCDevice.getInstance();
        break;
      case "TCApp":
        obj = TCApp.getInstance();
        break;
    }

    if (obj != null )
    {
      obj.clearAdditionalProperties();
    }
  }

  @ReactMethod
  public void disableServerSide()
  {
    if (tcServerSide != null)
    {
      tcServerSide.disableServerSide();
    }
  }

  @ReactMethod
  public void enableServerSide()
  {
    if (tcServerSide != null)
    {
      tcServerSide.enableServerSide();
    }
  }

  @ReactMethod
  public void useLegacyUniqueIDForAnonymousID(Callback callBack)
  {
    TCPredefinedVariables.getInstance().useLegacyUniqueIDForAnonymousID();
    callBack.invoke(TCUser.getInstance().anonymous_id);
  }

  @ReactMethod
  public void useLegacyUniqueIDForConsentID(Callback callBack)
  {
    TCPredefinedVariables.getInstance().useLegacyUniqueIDForConsentID();
    callBack.invoke(TCUser.getInstance().consentID);
  }

  private ETCConsentBehaviour evaluateBehaviour(String defaultBehavior)
  {
    if (defaultBehavior != null)
    {
      if (defaultBehavior.equals("PB_ALWAYS_ENABLED"))
      {
        return ETCConsentBehaviour.PB_ALWAYS_ENABLED;
      }
      if (defaultBehavior.equals("PB_DISABLED_BY_DEFAULT"))
      {
        return ETCConsentBehaviour.PB_DISABLED_BY_DEFAULT;
      }
    }

    return ETCConsentBehaviour.PB_DEFAULT_BEHAVIOUR;
  }

  public TCEvent parseTCEvent(String eventName, String eventString)
  {
    TCEvent event;

    switch(eventName)
    {
      case "add_shipping_info":
        event = gson.fromJson(eventString, TCAddShippingInfoEvent.class);
        break;
      case "purchase":
        event = gson.fromJson(eventString, TCPurchaseEvent.class);
        break;
      case "add_payment_info":
        event = gson.fromJson(eventString, TCAddPaymentInfoEvent.class);
        break;
      case "add_to_cart":
        event = gson.fromJson(eventString, TCAddToCartEvent.class);
        break;
      case "add_to_wishlist":
        event = gson.fromJson(eventString, TCAddToWishlistEvent.class);
        break;
      case "refund":
        event = gson.fromJson(eventString, TCRefundEvent.class);
        break;
      case "remove_from_cart":
        event = gson.fromJson(eventString, TCRemoveFromCartEvent.class);
        break;
      case "begin_checkout":
        event = gson.fromJson(eventString, TCBeginCheckoutEvent.class);
        break;
      case "view_cart":
        event = gson.fromJson(eventString, TCViewCartEvent.class);
        break;
      case "view_item":
        event = gson.fromJson(eventString, TCViewItem.class);
        break;
      case "view_item_list":
        event = gson.fromJson(eventString, TCViewItemListEvent.class);
        break;
      case "select_item":
        event = gson.fromJson(eventString, TCSelectItemEvent.class);
        break;
      case "generate_lead":
        event = gson.fromJson(eventString, TCGenerateLeadEvent.class);
        break;
      case "login":
        event = gson.fromJson(eventString, TCLoginEvent.class);
        break;
      case "page_view":
        event = gson.fromJson(eventString, TCPageViewEvent.class);
        break;
      case "search":
        event = gson.fromJson(eventString, TCSearchEvent.class);
        break;
      case "sign_up":
        event = gson.fromJson(eventString, TCSignUpEvent.class);
        break;
      case "select_content":
        event = gson.fromJson(eventString, TCSelectContentEvent.class);
        break;
      default:
        event = gson.fromJson(eventString, TCCustomEvent.class);
        break;
    }

    return event;
  }

  private String getTCUserJson()
  {
    try
    {
      return TCUser.getInstance().getJsonObject().put("consentID", TCUser.getInstance().consentID).toString();
    }
    catch (JSONException e)
    {
      e.printStackTrace();
    }
    return "";
  }
}
