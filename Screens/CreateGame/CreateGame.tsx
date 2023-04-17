import {SafeAreaView} from 'react-native';
import {ScrollView, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import homeScreenStyles from '../HomeScreen/HomeScreen.styles';
import {StyledButton, TextStroke} from '../../components/StyledButton';
import {ImageButton} from '../../components/ImageButton';
import {
  createLobby,
  deleteLobby,
  getLobbyMembers,
  isGameStarted,
  joinLobby,
  leaveLobby,
} from '../../Utils/RemoteDataManager';
import {isNotGameCreator} from '../HomeScreen/HomeScreen';
import {joinGameCode} from '../JoinGame/JoinGame';
import {userdata} from '../../Utils/LocalDataManager';
import {avatarImages} from '../AvatarScreen/AvatarScreen';
import {bgColor} from '../../App';
import {fetchGameSettings} from '../../Utils/GameLogic';
import CircleImage from '../../components/CircleImage';

export var createGameLobbyID = '';

const CreateGame = (props: {navigation: any}) => {
  const [lobbyID, setLobbyID] = useState('');
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (!isNotGameCreator) {
      const makeLobby = async () => {
        const lobbyID = await createLobby();
        setLobbyID(lobbyID);
        console.log(`joined game with code: ${lobbyID}`);
      };

      makeLobby();
    } else {
      setLobbyID(joinGameCode);
    }
  }, []);

  useEffect(() => {
    if (lobbyID) {
      createGameLobbyID = lobbyID;
      if (!isNotGameCreator) {
        joinLobby(lobbyID);
        console.log(
          `joined lobby with id: ${lobbyID} and username: ${userdata.username}`,
        );
      }
    }
  }, [lobbyID]);

  useEffect(() => {
    const intervalQuery = async () => {
      const newUserList = await getLobbyMembers(lobbyID);
      // @ts-ignore
      setUserList(newUserList);
      if (await isGameStarted(lobbyID)) {
        await fetchGameSettings(lobbyID);
        props.navigation.navigate('MessageScreen');
      }
    };

    intervalQuery();

    // Call updateUserList every... idek .. it does it alot
    const intervalId = setInterval(intervalQuery, 1000);

    // Clear the interval when the component unmounts or when the lobbyID changes
    return () => {
      clearInterval(intervalId);
    };
  });

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
            if (!isNotGameCreator) {
              deleteLobby(`${lobbyID}`).then(
                () => `lobby deleted with code ${lobbyID}`,
              );
            } else {
              leaveLobby(lobbyID).then(() => `lobby left with code ${lobbyID}`);
            }
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
            {renderSettings(props)}
          </View>
        </View>

        <View style={{backgroundColor: bgColor, flex: 1}}>
          <ScrollView>
            {userList.map(({username, avatarID}, index) => (
              <View
                style={{
                  flexDirection: 'row',
                  borderColor: 'black',
                  borderWidth: 3,
                  borderRadius: 10,
                  backgroundColor: 'white',
                  marginBottom: 10,
                }}>
                <CircleImage source={avatarImages[avatarID]} size={16} />
                <TextStroke stroke={3} color={'#000000'}>
                  <Text
                    key={index}
                    style={{padding: 10, marginLeft: 10, color: 'white'}}>
                    {username}
                  </Text>
                </TextStroke>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={{padding: 10, paddingBottom: 50, paddingVertical: 0}}>
          <View style={homeScreenStyles.emailTextInput}>
            {buttonToRender(props)}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

function renderSettings(props: {navigation: any}) {
  if (!isNotGameCreator) {
    return (
      <ImageButton
        image={require('../../assets/images/settingsImage.png')}
        onPress={() => {
          props.navigation.navigate('SettingsScreen');
        }}
        height={80}
        width={80}
        isDark={false}
      />
    );
  }
}

function buttonToRender(props: {navigation: any}) {
  if (!isNotGameCreator) {
    return (
      <StyledButton
        onPress={() => props.navigation.navigate('YouAreItScreen')}
        buttonText={'Start Game'}
        buttonColor={true}
      />
    );
  }
  return (
    <TextStroke stroke={3} color={'#000000'}>
      <Text style={homeScreenStyles.buttonText}>Waiting For Players...</Text>
    </TextStroke>
  );
}

export default CreateGame;
