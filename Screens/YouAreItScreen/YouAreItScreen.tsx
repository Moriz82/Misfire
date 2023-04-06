import {Box, StatusBar, View, Text, Button} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {StyledButton, TextStroke} from '../../components/StyledButton';
import {CustomTextInput} from '../../components/CustomTextInput';
import {ImageButton} from '../../components/ImageButton';
import homeScreenStyles from '../HomeScreen/HomeScreen.styles';
import {ReadyButton} from '../../components/ReadyButton';

const HomeScreen = (props: {navigation: any}) => {
  const [usernameText, setUsernameText] = useState('');
  let clickCount = 0;

  return (
    <SafeAreaView style={homeScreenStyles.safeAreaViewStyle}>
      <View style={{alignItems: 'center'}}>
        <TextStroke stroke={3} color={'#000000'}>
          <Text style={{padding: 10, paddingTop: 30, color: '#FF6C1A'}}>
            You are the target!{' '}
          </Text>
        </TextStroke>
      </View>

      <View style={{alignItems: 'center'}}>
        <ImageButton
          image={require('../../assets/images/Target.png')}
          onPress={() => props.navigation.navigate('HomeScreen')}
          height={130}
          width={130}
          isDark={false}
        />
      </View>

      <View style={{padding: 30, paddingTop: 0}}>
        <View style={homeScreenStyles.emailTextInput}>
          <CustomTextInput
            placeholderText={'Name...'}
            value={usernameText}
            onChangeText={(newText: any) => setUsernameText(newText)}
            iconName={'email'}
            isPassword={false}
          />
        </View>
      </View>

      <View style={{alignItems: 'center'}}>
        <TextStroke stroke={3} color={'#000000'}>
          <Text style={{padding: 30, paddingTop: 45, color: 'white'}}>
            Type the name of ONE contact you would like to omit.{' '}
          </Text>
        </TextStroke>
      </View>

      <View style={{alignItems: 'center', padding: 15}}>
        <ReadyButton />
      </View>
    </SafeAreaView>
  );
};

/*<StyledButton
  onPress={() => props.navigation.navigate('SignUp')}
  buttonText={'Sign Up'}
/>*/

export default HomeScreen;
