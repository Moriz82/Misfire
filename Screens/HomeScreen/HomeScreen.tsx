import {Box, StatusBar, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {StyledButton} from '../../components/StyledButton';
import {CustomTextInput} from '../../components/CustomTextInput';
import homeScreenStyles from './HomeScreen.styles';
import {ImageButton} from '../../components/ImageButton';
import {setUsername, userdata} from '../../Utils/LocalDataManager';

export var isNotGameCreator = false;

const HomeScreen = (props: {navigation: any}) => {
  const [usernameText, setUsernameText] = useState('');
  let clickCount = 0;

  /* useEffect(() => {
    if (userdata) {
      setUsernameText(userdata.username);
    }
  }, [usernameText]);*/

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
              if (!checkUsername()) {
                return;
              }
              isNotGameCreator = false;
              setUsername(usernameText).then(() =>
                console.log(`username set to ${usernameText}`),
              );
              props.navigation.navigate('AvatarScreen');
            }}
            buttonText={'Create Game'}
            buttonColor={true}
          />
        </View>

        <View style={homeScreenStyles.emailTextInput}>
          <StyledButton
            onPress={() => {
              if (!checkUsername()) {
                return;
              }
              isNotGameCreator = true;
              setUsername(usernameText).then(() =>
                console.log(`username set to ${usernameText}`),
              );
              props.navigation.navigate('AvatarScreen');
            }}
            buttonText={'Join Game'}
            buttonColor={false}
          />
        </View>

        <View style={homeScreenStyles.emailTextInput}>
          <ImageButton
            image={require('../../assets/images/settingsImage.png')}
            onPress={() => props.navigation.navigate('SettingsScreen')}
            height={100}
            width={100}
            isDark={false}
          />
        </View>

        <View style={homeScreenStyles.emailTextInput}>
          <StyledButton
            onPress={() => {
              props.navigation.navigate('MessageScreen');
            }}
            buttonText={'test button delete me'}
            buttonColor={false}
          />
        </View>
      </Box>
    </SafeAreaView>
  );

  function checkUsername(): boolean {
    if (usernameText.length === 0) {
      return false;
    }
    return true;
  }
};

export default HomeScreen;
