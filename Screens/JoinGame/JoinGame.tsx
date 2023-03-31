import {SafeAreaView} from 'react-native';
import {View, Text} from 'native-base';
import React from 'react';
import {StyledButton, TextStroke} from '../../components/StyledButton';
import {ImageButton} from '../../components/ImageButton';

import homeScreenStyles from '../HomeScreen/HomeScreen.styles';
import { color } from 'native-base/lib/typescript/theme/styled-system';

const JoinGame = (props: {navigation: any}) => {
  return (
    <>
      <View style={{
       width: '100%', 
       height: '13%', 
       backgroundColor: '#434343', 
       justifyContent: 'flex-start',
       alignItems: 'flex-end',
       flexDirection: 'row'
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
      </View>
    
      <View style={{backgroundColor: '#605A58', flex:1, alignItems: 'center'}}>
        <ImageButton
          image={require('../../assets/images/MisfireLogoWithText.png')}
          height={200}
          width={200}
        />
      </View>

      
    </>
  );
};

export default JoinGame;
