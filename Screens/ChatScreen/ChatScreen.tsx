import {View, Text, ScrollView} from 'native-base';
import React, {useState} from 'react';
import {TextStroke} from '../../components/StyledButton';
import {CustomTextInput} from '../../components/CustomTextInput';
import {ImageButton} from '../../components/ImageButton';
import homeScreenStyles from '../HomeScreen/HomeScreen.styles';
import { ImageBackground } from 'react-native';

const HomeScreen = (props: {navigation: any}) => {
  const [fieldText, setText] = useState('');

  return (
    <ImageBackground
      source={require('../../assets/images/MisfireBackground.png')}
      style={homeScreenStyles.backgroundImage}>
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

      <View style={{flex: 1, backgroundColor: '#605A58'}}>
        <ScrollView
          style={{flex: 1, backgroundColor: '#605A58', paddingTop: 50}}>
          <View style={{backgroundColor: 'red', width: '50%', height: '50%'}}>
            <View />
          </View>
        </ScrollView>

        <View style={{paddingBottom: 25, padding: 20, backgroundColor: 'blue'}}>
          <View style={homeScreenStyles.emailTextInput}>
            <CustomTextInput
              placeholderText={'Send A Message...'}
              value={fieldText}
              onChangeText={(newText: any) => setText(newText)}
              iconName={'email'}
              isPassword={false}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

/*<StyledButton
  onPress={() => props.navigation.navigate('SignUp')}
  buttonText={'Sign Up'}
/>*/

export default HomeScreen;
