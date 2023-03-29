import {SafeAreaView} from 'react-native';
import {Text, View} from 'native-base';
import React from 'react';
import homeScreenStyles from '../HomeScreen/HomeScreen.styles';
import {StyledButton, TextStroke} from '../../components/StyledButton';

const CreateGame = (props: {navigation: any}) => {
  const gameID: number = 25902398;

  return (
    <SafeAreaView style={homeScreenStyles.safeAreaViewStyle}>
      <View>
        <TextStroke stroke={3} color={'#000000'}>
          <Text style={homeScreenStyles.buttonText}>Game ID: </Text>
        </TextStroke>
        <TextStroke stroke={3} color={'#000000'}>
          <Text style={homeScreenStyles.buttonText}>{gameID}</Text>
        </TextStroke>
      </View>
      <View style={homeScreenStyles.emailTextInput}>
        <StyledButton
          onPress={() => props.navigation.navigate('StartGame')}
          buttonText={'Start Game'}
          buttonColor={true}
        />
      </View>
      <View style={homeScreenStyles.emailTextInput}>
        <StyledButton
          onPress={() => props.navigation.navigate('Chat')}
          buttonText={'Chat'}
          buttonColor={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateGame;
