import {SafeAreaView} from 'react-native';
import {Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import homeScreenStyles from '../HomeScreen/HomeScreen.styles';
import {StyledButton, TextStroke} from '../../components/StyledButton';
import {ImageButton} from '../../components/ImageButton';
import {
  createLobby,
  deleteLobby,
  joinLobby,
} from '../../Utils/RemoteDataManager';
import {userdata} from '../../Utils/LocalDataManager';

const CreateGame = (props: {navigation: any}) => {
  const [lobbyID, setLobbyID] = useState('');

  useEffect(() => {
    const makeLobby = async () => {
      const lobbyID = await createLobby();
      setLobbyID(lobbyID);
      console.log(`created lobby with id ${lobbyID}`);
    };

    makeLobby();
  }, []);

  useEffect(() => {
    if (lobbyID) {
      joinLobby(lobbyID);
      console.log(
        `joined lobby with id: ${lobbyID} and username: ${userdata.username}`,
      );
    }
  }, [lobbyID]);
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
          onPress={() => {
            deleteLobby(`${lobbyID}`).then(
              () => `lobby deleted with code ${lobbyID}`,
            );
            props.navigation.navigate('HomeScreen');
          }}
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
            <Text style={homeScreenStyles.buttonText}>Lobby </Text>
          </TextStroke>
        </View>
      </View>

      <SafeAreaView style={homeScreenStyles.safeAreaViewStyle}>
        <View
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View style={{paddingTop: 25, paddingBottom: 10}}>
            <TextStroke stroke={3} color={'#000000'}>
              <Text style={homeScreenStyles.buttonText}>Game ID: </Text>
            </TextStroke>
            <TextStroke stroke={3} color={'#000000'}>
              <Text style={homeScreenStyles.buttonText}>{lobbyID}</Text>
            </TextStroke>
          </View>
          <View style={[homeScreenStyles.emailTextInput, {paddingLeft: 30}]}>
            <ImageButton
              image={require('../../assets/images/settingsImage.png')}
              onPress={() => props.navigation.navigate('GameSettingsScreen')}
              height={80}
              width={80}
              isDark={false}
            />
          </View>
        </View>

        <View style={{backgroundColor: 'white', flex: 1}} />

        <View style={{padding: 10, paddingBottom: 50, paddingVertical: 0}}>
          <View style={homeScreenStyles.emailTextInput}>
            <StyledButton
              onPress={() => props.navigation.navigate('YouAreItScreen')}
              buttonText={'Start Game'}
              buttonColor={true}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default CreateGame;
