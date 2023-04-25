import {View, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {TextStroke} from '../../components/StyledButton';
import {ImageBackground, SafeAreaView} from 'react-native';
import voteStyles from './VoteScreen.styles';
import {StyledButton} from '../../components/StyledButton';
import homeScreenStyles from '../HomeScreen/HomeScreen.styles';
import {getAllMessages} from '../../Utils/RemoteDataManager';
import {createGameLobbyID} from '../CreateGame/CreateGame';

const VoteScreen = (props: {navigation: any}) => {
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(-1);
  const [messages, setMessages] = useState(['']);

  useEffect(() => {
    const effect = async () => {
      const arr = await getAllMessages(createGameLobbyID);
      setMessages(arr);
    };
    effect();
  });

  return (
    <ImageBackground
      source={require('../../assets/images/MisfireBackground.png')}
      style={homeScreenStyles.backgroundImage}>
      <SafeAreaView style={{backgroundColor: '#605A58', height: '100%'}}>
        <View
          style={{
            alignItems: 'center',
            paddingTop: 12,
            width: '100%',
            backgroundColor: '#605A58',
          }}>
          <TextStroke stroke={3} color={'#000000'}>
            <Text
              style={{
                padding: 20,
                paddingTop: 30,
                color: 'white',
                fontSize: 40,
                textAlign: 'center',
                lineHeight: 50,
              }}>
              Vote On A Message!{' '}
            </Text>
          </TextStroke>
        </View>

        {messages.map((msg, index) => (
          <View style={{padding: 3}} key={index}>
            <View style={voteStyles.emailTextInput}>
              <StyledButton
                onPress={() => {
                  setSelectedMessageIndex(index);
                }}
                buttonText={msg}
                buttonColor={selectedMessageIndex === index}
              />
            </View>
          </View>
        ))}
      </SafeAreaView>
    </ImageBackground>
  );
};

/*<StyledButton
  onPress={() => props.navigation.navigate('SignUp')}
  buttonText={'Sign Up'}
/>*/

export default VoteScreen;
