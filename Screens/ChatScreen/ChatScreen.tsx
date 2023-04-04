import {Box, StatusBar, View, Text, Button} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {StyledButton, TextStroke} from '../../components/StyledButton';
import {CustomTextInput} from '../../components/CustomTextInput';
import {ImageButton} from '../../components/ImageButton';
import homeScreenStyles from '../HomeScreen/HomeScreen.styles';

const HomeScreen = (props: {navigation: any}) => {
  const [usernameText, setUsernameText] = useState('');
  let clickCount = 0;

  return (  
    <>
      <View
        style={{
          width: '100%',
          height: '13%',
          backgroundColor: '#434343',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          flexDirection: 'row',
          alignContent: 'space-between',
        }}>
        <ImageButton
          image={require('../../assets/images/backButton.png')}
          onPress={() => props.navigation.navigate('HomeScreen')}
          height={50}
          width={50}
          isDark={true}
        />

        <View
          style={{
            alignItems: 'center',
            flex: 1,
            paddingRight: 78,
            paddingBottom: 15,
          }}>
          <TextStroke stroke={3} color={'#000000'}>
            <Text style={homeScreenStyles.buttonText}>Chat</Text>
          </TextStroke>
        </View>
      </View>

      <View style={{flex:1, backgroundColor: '#605A58'}}>

      </View>
    </>
  );
};

/*<StyledButton
  onPress={() => props.navigation.navigate('SignUp')}
  buttonText={'Sign Up'}
/>*/

export default HomeScreen;
