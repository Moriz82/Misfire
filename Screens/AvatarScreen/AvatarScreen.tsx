import {
  Box,
  StatusBar,
  View,
  Text,
  Button,
  ScrollView,
  Image,
} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {StyledButton, TextStroke} from '../../components/StyledButton';
import {CustomTextInput} from '../../components/CustomTextInput';
import {ImageButton} from '../../components/ImageButton';
import homeScreenStyles from '../HomeScreen/HomeScreen.styles';

const HomeScreen = (props: {navigation: any}) => {
  const [fieldText, setText] = useState('');
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
            <Text style={homeScreenStyles.buttonText}>Avatar Selection</Text>
          </TextStroke>
        </View>
      </View>

      <View style={{height: '30%', backgroundColor: '#605A58', paddingTop: 10}}>
        <Image
          style={{height: 160, width: 160}}
          source={require('../../assets/images/backButton.png')}
        />
      </View>

      <View
        style={{backgroundColor: 'white', height: '13%', flexDirection: 'row'}}>
        <View style={{backgroundColor: 'blue', flex: 1}} />
        <View style={{backgroundColor: 'green', flex: 1}} />
        <View style={{backgroundColor: 'blue', flex: 1}} />
      </View>

      <View
        style={{backgroundColor: 'white', height: '13%', flexDirection: 'row'}}>
        <View style={{backgroundColor: 'green', flex: 1}} />
        <View style={{backgroundColor: 'blue', flex: 1}} />
        <View style={{backgroundColor: 'green', flex: 1}} />
      </View>

      <View
        style={{backgroundColor: 'white', height: '13%', flexDirection: 'row'}}>
        <View style={{backgroundColor: 'blue', flex: 1}} />
        <View style={{backgroundColor: 'green', flex: 1}} />
        <View style={{backgroundColor: 'blue', flex: 1}} />
      </View>

      <View
        style={{
          backgroundColor: '#605A58',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <View style={homeScreenStyles.emailTextInput}>
          <StyledButton
            onPress={() => props.navigation.navigate('AvatarScreen')}
            buttonText={'Create Game'}
            buttonColor={true}
          />
        </View>
      </View>
    </>
  );
};

/*<StyledButton
  onPress={() => props.navigation.navigate('SignUp')}
  buttonText={'Sign Up'}
/>*/

export default HomeScreen;
