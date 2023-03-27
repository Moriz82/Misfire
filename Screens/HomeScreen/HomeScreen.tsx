import {Box, StatusBar, Text, View} from 'native-base';
import React, {useState} from 'react';
import {Image, SafeAreaView} from 'react-native';
import {StyledButton} from '../../components/StyledButton';
import {CustomTextInput} from '../../components/CustomTextInput';
import homeScreenStyles from './HomeScreen.styles';

const HomeScreen = (props: {navigation: any}) => {
  const [usernameText, setUsernameText] = useState('');

  return (
    <SafeAreaView style={homeScreenStyles.safeAreaViewStyle}>
      <StatusBar barStyle={'light-content'} />
      <Box style={{padding: 10}}>
        <View style={{alignItems: 'center'}}>
          <Image
            style={{height: 200, width: 200}}
            source={require('../../assets/images/MisfireLogoWithText.png')}
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
            onPress={() => null}
            buttonText={'Create Game'}
            buttonColor={true}
          />
        </View>

        <View style={homeScreenStyles.emailTextInput}>
          <StyledButton
            onPress={() => props.navigation.navigate('JoinGame')}
            buttonText={'Join Game'}
            buttonColor={false}
          />
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
