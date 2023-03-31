import {SafeAreaView} from 'react-native';
import {View, Text} from 'native-base';
import React from 'react';
import React, {useState} from 'react';
import {StyledButton, TextStroke} from '../../components/StyledButton';
import {ImageButton} from '../../components/ImageButton';
import {CustomTextInput} from '../../components/CustomTextInput';

import homeScreenStyles from '../HomeScreen/HomeScreen.styles';
import { color } from 'native-base/lib/typescript/theme/styled-system';

const JoinGame = (props: {navigation: any}) => {
  const [usernameText, setUsernameText] = useState('');
  
  return (
    <>
      <View style={{
       width: '100%', 
       height: '13%', 
       backgroundColor: '#434343', 
       justifyContent: 'flex-start',
       alignItems: 'flex-end',
       flexDirection: 'row'
       flexDirection: 'row',
       alignContent: 'space-between'
       }}>

        <ImageButton
          image={require('../../assets/images/backButton.png')}
          onPress={() => props.navigation.navigate('HomeScreen')}
          height={50}
          width={50}
        />

        <TextStroke stroke={3} color={'#000000'}>
          <Text style={{}}>Join Game </Text>
        </TextStroke>
        <View style={{paddingLeft: 50, paddingBottom: 15}}>
          <TextStroke stroke={3} color={'#000000'}>
            <Text style={{}}>Join Game </Text>
          </TextStroke>
        </View>
      </View>
    
      <View style={{backgroundColor: '#605A58', flex:1, alignItems: 'center'}}>
      <View style={{backgroundColor: '#605A58', flex:1, alignItems: 'center', flexDirection: 'column', padding: 13}}>
        <ImageButton
          image={require('../../assets/images/MisfireLogoWithText.png')}
          height={200}
          width={200}
          onPress={() => (props.navigation.navigate('HomeScreen'))}
          height={150}
          width={150}
        />

        <View style={{width: '85%', paddingTop: 50}}>
          <CustomTextInput
            placeholderText={'Enter Game Code...'}
            value={usernameText}
            onChangeText={(newText: any) => setUsernameText(newText)}
            iconName={'email'}
            isPassword={false}
          />
        </View>

        <View style={{width: '85%', paddingTop: 30}}>
          <StyledButton
            onPress={() => props.navigation.navigate('CreateGame')}
            buttonText={'Join'}
            buttonColor={true}
          />
        </View>
      </View>

      
    </>
  );
};

export default JoinGame;
