import {Box, StatusBar, Text, View} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {StyledButton} from '../../components/StyledButton';
import {CustomTextInput} from '../../components/CustomTextInput';
import homeScreenStyles from './HomeScreen.styles';
import {CustomLinkedText} from '../../components/CustomLinkedText';
import {ThirdPartyLoginButton} from '../../components/ThirdPartyLoginButton';

const HomeScreen = (props: {navigation: any}) => {
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');

  return (
    <SafeAreaView style={homeScreenStyles.safeAreaViewStyle}>
      <StatusBar barStyle={'light-content'} />
      <Box style={{padding: 10}}>
        <Text style={homeScreenStyles.headerText}>Welcome Back!</Text>

        <View style={homeScreenStyles.emailTextInput}>
          <CustomTextInput
            placeholderText={'Enter Email'}
            value={emailText}
            onChangeText={(newText: any) => setEmailText(newText)}
            iconName={'email'}
            isPassword={false}
          />
        </View>

        <View style={homeScreenStyles.passwordTextInput}>
          <CustomTextInput
            placeholderText={'Enter Password'}
            value={passwordText}
            onChangeText={(newText: any) => setPasswordText(newText)}
            iconName={'lock'}
            isPassword={true}
          />
        </View>

        <View style={homeScreenStyles.forgotPasswordText}>
          <CustomLinkedText
            displayText={'Forgot Password?'}
            onPress={() => props.navigation.navigate('ForgotPassword')}
          />
        </View>

        <View style={homeScreenStyles.forgotPasswordText}>
          <CustomLinkedText
            displayText={'GO TO TEAM SELECTION LOL'}
            onPress={() => props.navigation.navigate('TeamSelection')}
          />
        </View>

        <StyledButton onPress={() => null} buttonText={'Login'} />

        <View style={homeScreenStyles.registerNowText}>
          <CustomLinkedText
            displayText={'Register Now'}
            onPress={() => props.navigation.navigate('SignUp')}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              flex: 1,
              paddingTop: 20,
            }}>
            <ThirdPartyLoginButton
              logoImage={require('../../assets/images/facebookLogo.jpg')}
              onPress={() => {}}
            />
            <ThirdPartyLoginButton
              logoImage={require('../../assets/images/googleLogo.jpg')}
              onPress={() => {}}
            />
          </View>
        </View>
      </Box>
    </SafeAreaView>
  );
};

/*<StyledButton
  onPress={() => props.navigation.navigate('SignUp')}
  buttonText={'Sign Up'}
/>*/

export default HomeScreen;
