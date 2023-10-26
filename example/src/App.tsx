import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import * as TCServerSide from 'tcserverside-react-native';
import { TCApp, TCDevice, TCBeginCheckoutEvent } from 'tcserverside-react-native';
import { TCUser } from 'tccore-react-native';

async function initialiseServerSide()
{
  await TCServerSide.initServerSide(3311, 'a_source_key')
}

export default function App() {
  initialiseServerSide()

  return (
    <View style={styles.appContainer}>
      <ButtonRow />
    </View>
  );
}

const ButtonRow = () => {

  return (
  <View style={styles.container}>


    <TouchableOpacity
      style={styles.button}
      onPress={initialiseServerSide}>
      <Text style={styles.buttonText}>init ServerSide</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.button}
      onPress={printValues}>
      <Text style={styles.buttonText}>Print values</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.button}
      onPress={editTCUser}>
      <Text style={styles.buttonText}>Edit TCUser</Text>
    </TouchableOpacity>


    <TouchableOpacity
      style={styles.button}
      onPress={() => TCServerSide.execute(new TCBeginCheckoutEvent())}>
      <Text style={styles.buttonText}>Send custom Event</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.button}
      onPress={setAdditionalValues}>
      <Text style={styles.buttonText}>Add Additional properties</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.button}
      onPress={TCServerSide.disableServerSide}>
      <Text style={styles.buttonText}>Disable ServerSide</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.button}
      onPress={TCServerSide.enableServerSide}>
      <Text style={styles.buttonText}>Enable ServerSide</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.button}
      onPress={TCServerSide.addAdvertisingID}>
      <Text style={styles.buttonText}>addAdvertisingID</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.button}
      onPress={TCServerSide.enableRunningInBackground}>
      <Text style={styles.buttonText}>enableRunningInBackground</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.button}
      onPress={removeAdditionalValues}>
      <Text style={styles.buttonText}>Remove Addional Value</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.button}
      onPress={clearAdditionalProperties}>
      <Text style={styles.buttonText}>Clear Addional Value</Text>
    </TouchableOpacity>
  </View>
);
};

function editTCUser()
{
  TCUser.getInstance().anonymous_id = "test_anonymous_value25" 
  TCUser.getInstance().email_md5 = "email>33"
}

function printValues()
{
  
  console.log("TCAPP values")

  console.log(TCApp.getInstance().name)
  console.log(TCApp.getInstance().version)
  console.log(TCApp.getInstance().build)
  console.log(TCApp.getInstance().nameSpace)
  console.log(TCApp.getInstance().coreVersion)
  console.log(TCApp.getInstance().serverSideVersion)


  console.log("TCDevice values")

  console.log(TCDevice.getInstance().sdkID)
  console.log(TCDevice.getInstance().manufacturer)
  console.log(TCDevice.getInstance().model)
  console.log(TCDevice.getInstance().name)
  console.log(TCDevice.getInstance().type)
  console.log(TCDevice.getInstance().timezone)
  console.log(TCDevice.getInstance().osName)
  console.log(TCDevice.getInstance().osVersion)
  console.log(TCDevice.getInstance().screenWidth)
  console.log(TCDevice.getInstance().screenHeight)

  console.log("TCUser values")

  console.log(TCUser.getInstance().consentID)
  console.log(TCUser.getInstance().anonymous_id)

}

function clearAdditionalProperties()
{
  TCServerSide.TCDevice.getInstance().clearAdditionalProperties()

  TCServerSide.TCApp.getInstance().clearAdditionalProperties()

}

function removeAdditionalValues()
{
  TCDevice.getInstance().removeAdditionalProperty("additional_string")
  TCDevice.getInstance().removeAdditionalProperty("additional_num")
  TCDevice.getInstance().removeAdditionalProperty("additional_int")
  TCDevice.getInstance().removeAdditionalProperty("additional_bool")
  TCDevice.getInstance().removeAdditionalProperty("additional_list_int")
  TCDevice.getInstance().removeAdditionalProperty("additional_list_string")
  TCDevice.getInstance().removeAdditionalProperty("additional_map")

  TCApp.getInstance().removeAdditionalProperty("additional_string")
  TCApp.getInstance().removeAdditionalProperty("additional_num")
  TCApp.getInstance().removeAdditionalProperty("additional_int")
  TCApp.getInstance().removeAdditionalProperty("additional_bool")
  TCApp.getInstance().removeAdditionalProperty("additional_list_int")
  TCApp.getInstance().removeAdditionalProperty("additional_list_string")

}

function setAdditionalValues()
{
  TCDevice.getInstance().addAdditionalProperty("additional_string", "additional_val_string")
  TCDevice.getInstance().addAdditionalPropertyWithNumberValue("additional_num", 31.03)
  TCDevice.getInstance().addAdditionalPropertyWithNumberValue("additional_int", 31)
  TCDevice.getInstance().addAdditionalPropertyWithBooleanValue("additional_bool", true)
  TCDevice.getInstance().addAdditionalPropertyWithArrayValue("additional_list_int",[21,31,41])
  TCDevice.getInstance().addAdditionalPropertyWithArrayValue("additional_list_string",["STRING_VAL_1","STRING_VAL_2"])

  TCApp.getInstance().addAdditionalProperty("additional_string", "additional_val_string")
  TCApp.getInstance().addAdditionalPropertyWithNumberValue("additional_num", 31.03)
  TCApp.getInstance().addAdditionalPropertyWithNumberValue("additional_int", 31)
  TCApp.getInstance().addAdditionalPropertyWithBooleanValue("additional_bool", true)
  TCApp.getInstance().addAdditionalPropertyWithArrayValue("additional_list_int",[21,31,41])
  TCApp.getInstance().addAdditionalPropertyWithArrayValue("additional_list_string",["STRING_VAL_1","STRING_VAL_2"])

  let map = { shape: "Shape", xPos: "number" , age: 121}

  TCServerSide.TCDevice.getInstance().addAdditionalPropertyWithMapValue("additional_map", map)
  TCServerSide.TCApp.getInstance().addAdditionalPropertyWithMapValue("additional_map", map)
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
