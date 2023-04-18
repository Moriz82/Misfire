import {Box, StatusBar, Text, View} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {StyledButton} from '../../components/StyledButton';
import {CustomTextInput} from '../../components/CustomTextInput';
import homeScreenStyles from './HomeScreen.styles';
import {ImageButton} from '../../components/ImageButton';
import {setUsername} from '../../Utils/LocalDataManager';
import {checkForProfanity} from '../../Utils/Util';

export var isNotGameCreator = false;

const HomeScreen = (props: {navigation: any}) => {
  const [usernameText, setUsernameText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  let clickCount = 0;

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
          <StyledButton
            onPress={() => {
              props.navigation.navigate('MessageScreen');
            }}
            buttonText={'test button delete me'}
            buttonColor={false}
          />
        </View>
        <View>
          <Text style={{color: 'red'}}>{errorMsg}</Text>
        </View>
      </Box>
    </SafeAreaView>
  );

  function checkUsername(): boolean {
    if (usernameText.length === 0) {
      setErrorMsg('Please enter a username');
      return false;
    }
    if (checkForProfanity(usernameText)) {
      setErrorMsg('Inappropriate username');
      return false;
    }
    setErrorMsg('');
    return true;
  }
};

export default HomeScreen;
