import { Box, StatusBar, View } from "native-base";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { StyledButton } from "../../components/StyledButton";
import { CustomTextInput } from "../../components/CustomTextInput";
import homeScreenStyles from "./HomeScreen.styles";
import { ImageButton } from "../../components/ImageButton";
import firestore from "@react-native-firebase/firestore";
import firebase from "@react-native-firebase/app";

export var buttonSelected = false;

const HomeScreen = (props: {navigation: any}) => {
  const [usernameText, setUsernameText] = useState('');
  let clickCount = 0;


  async function handleButtonPress() {
    /*try{
      lobbyCode = await createLobby();
      console.log(lobbyCode)
      console.log(await firestore().collection('lobbies').doc(lobbyCode));
    }
    catch (error) {
      console.log(error)
    }*/

    const userDoc = await firestore().collection('lobbies').doc('DeaSRa18ztQl032x80ZX').get()
    console.log(userDoc);

  }

  async function checkConnection() {
    await fetch('http://www.google.com', { method: 'HEAD' })
      .then((response) => {
        if (response.ok) {
          console.log('Connection successful!');
        } else {
          console.log('Connection failed.');
        }
      })
      .catch((error) => {
        console.log(`Error: ${error.message}`);
      });
  }

  checkConnection().then(r => console.log(r));

  return (
    <SafeAreaView style={homeScreenStyles.safeAreaViewStyle}>
      <StatusBar barStyle={'light-content'} />
      <Box style={{padding: 10}}>
        <View style={{alignItems: 'center'}}>
          <ImageButton
            onPress={() => {
              clickCount += 1;
              if (clickCount >= 100) {
                clickCount = 0;
                props.navigation.navigate('SecretScreen');
              }
            }}
            image={require('../../assets/images/MisfireLogoWithText.png')}
            height={200}
            width={200}
            isDark={false}
          />
        </View>

        <View style={homeScreenStyles.emailTextInput}>
          <CustomTextInput
            placeholderText={'Name...'}
            value={usernameText}
            onChangeText={(newText: any) => setUsernameText(newText)}
            iconName={'email'}
            isPassword={false}
          />
        </View>

        <View style={homeScreenStyles.emailTextInput}>
          <StyledButton
            onPress={() => {
              buttonSelected = false;
              props.navigation.navigate('AvatarScreen');
            }}
            buttonText={'Create Game'}
            buttonColor={true}
          />
        </View>

        <View style={homeScreenStyles.emailTextInput}>
          <StyledButton
            onPress={() => {
              buttonSelected = true;
              props.navigation.navigate('AvatarScreen');
            }}
            buttonText={'Join Game'}
            buttonColor={false}
          />
        </View>

        <View style={homeScreenStyles.emailTextInput}>
          <ImageButton
            image={require('../../assets/images/settingsImage.png')}
            onPress={() => handleButtonPress()}// props.navigation.navigate('SettingsScreen')}
            height={100}
            width={100}
            isDark={false}
          />
        </View>
      </Box>
    </SafeAreaView>
  );


};

let lobbyCode = "";

/*<StyledButton
  onPress={() => props.navigation.navigate('SignUp')}
  buttonText={'Sign Up'}
/>*/

export default HomeScreen;
