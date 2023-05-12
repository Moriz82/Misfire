import {View, Text} from 'native-base';
import React, {useState} from 'react';
import {ImageBackground} from 'react-native';
import {StyledButton, TextStroke} from '../../components/StyledButton';
import {ImageButton} from '../../components/ImageButton';
import homeScreenStyles from '../HomeScreen/HomeScreen.styles';
import { selectContact } from "../../Utils/GameLogic";

const HomeScreen = (props: {navigation: any}) => {

  return (
    <ImageBackground
      source={require('../../assets/images/MisfireBackground.png')}
      style={homeScreenStyles.backgroundImage}>
      <View style={{alignItems: 'center'}}>
        <TextStroke stroke={3} color={'#000000'}>
          <Text style={{padding: 10, paddingTop: 90, color: '#FF6C1A'}}>
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
          <StyledButton
            buttonColor={true}
            buttonText={'Contacts'}
            onPress={selectContact}
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
    </ImageBackground>
  );
};

/*<StyledButton
  onPress={() => props.navigation.navigate('SignUp')}
  buttonText={'Sign Up'}
/>*/

export default HomeScreen;
