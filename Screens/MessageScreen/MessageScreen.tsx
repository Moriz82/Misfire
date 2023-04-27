import {View, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {TextStroke} from '../../components/StyledButton';
import {CustomTextInput} from '../../components/CustomTextInput';
import messageStyles from '../MessageScreen/MessageScreen.styles';
import {ReadyButton} from '../../components/ReadyButton';
import {ImageBackground} from 'react-native';
import {
  getLobbyMembers,
  getReadyList,
  getTime,
  setLobbyTime,
  updateLobbyMember,
} from '../../Utils/RemoteDataManager';
import {createGameLobbyID} from '../CreateGame/CreateGame';
import {avatarImages} from '../AvatarScreen/AvatarScreen';
import CircleImage from '../../components/CircleImage';
import {userdata} from '../../Utils/LocalDataManager';
import homeScreenStyles from '../HomeScreen/HomeScreen.styles';
import {isNotGameCreator} from '../HomeScreen/HomeScreen';

const MessageScreen = (props: {navigation: any}) => {
  const [messageText, setMessageText] = useState('');
  const [userList, setUserList] = useState([]);
  const [timeText, setTimeText] = useState(100);

  useEffect(() => {
    const intervalQuery = async () => {
      const newUserList = await getLobbyMembers(createGameLobbyID);
      const newTimeText = await getTime(createGameLobbyID);
      let isNav = false;
      let allReady = (await getReadyList(createGameLobbyID)).every(
        user => user.isReady,
      );
      // @ts-ignore
      setUserList(newUserList);
      setTimeText(prevTimeText => {
        // Update timeText only when it has changed
        if (newTimeText !== prevTimeText) {
          // Check if time is up and navigate to VoteScreen
          if (newTimeText <= 0 || allReady) {
            isNav = true;
            clearInterval(intervalID);
          }
          return newTimeText;
        }
        return prevTimeText;
      });

      if (isNav) {
        if (!isNotGameCreator) {
          await setLobbyTime(createGameLobbyID, 100);
        }
        await updateLobbyMember(createGameLobbyID, userdata.username, {
          isReady: true,
          message: messageText,
        }).then(props.navigation.navigate('VoteScreen'));
      }

      if (!isNotGameCreator) {
        await setLobbyTime(
          createGameLobbyID,
          parseFloat((newTimeText - 1).toFixed(2)),
        );
      }
    };

    // Call updateUserList every... idek .. it does it alot
    const intervalID = setInterval(intervalQuery, 900);

    // Clear the interval when the component unmounts or when the lobbyID changes
    return () => {
      clearInterval(intervalID);
    };
  }, [messageText, props.navigation]);

  return (
    <ImageBackground
      source={require('../../assets/images/MisfireBackground.png')}
      style={homeScreenStyles.backgroundImage}>
      <View style={{alignItems: 'center', paddingTop: 10}}>
        <TextStroke stroke={3} color={'#000000'}>
          <Text
            style={{
              padding: 10,
              paddingTop: 30,
              color: 'white',
              fontSize: 40,
            }}>
            Time Left:{' '}
          </Text>
        </TextStroke>

        <TextStroke stroke={3} color={'#000000'}>
          <Text
            style={{
              padding: 10,
              paddingTop: 30,
              color: 'white',
              fontSize: 60,
            }}>
            {timeText + 's'}
          </Text>
        </TextStroke>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: '17%',
          justifyContent: 'space-around',
          backgroundColor: 'rgba(52, 52, 52, 0)',
        }}>
        {userList.map(({username, avatarID, isReady}, _) => (
          <View
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}>
            <CircleImage source={avatarImages[avatarID]} size={50} />
            <TextStroke stroke={3} color={'#000000'}>
              <Text
                style={{
                  padding: 10,
                  color: isReady ? 'green' : 'red',
                  fontSize: 18,
                }}>
                {username}
              </Text>
            </TextStroke>
          </View>
        ))}
      </View>

      <View
        style={{
          width: '100%',
          height: '15%',
          paddingBottom: 10,
          padding: 15,
          backgroundColor: 'rgba(52, 52, 52, 0)',
        }}>
        <View style={messageStyles.emailTextInput}>
          <CustomTextInput
            placeholderText={'Type a funny message...'}
            value={messageText}
            onChangeText={(newText: any) => setMessageText(newText)}
            iconName={'email'}
            isPassword={false}
          />
        </View>
      </View>

      <View style={{alignItems: 'center', padding: 20}}>
        <ReadyButton
          onChange={() =>
            updateLobbyMember(createGameLobbyID, userdata.username, {
              isReady: true,
              message: messageText,
            }).then(() => console.log('done'))
          }
          message={messageText}
        />
      </View>
    </ImageBackground>
  );
};

/*<StyledButton
  onPress={() => props.navigation.navigate('SignUp')}
  buttonText={'Sign Up'}
/>*/

export default MessageScreen;
