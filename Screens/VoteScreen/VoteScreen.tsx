import {View, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {TextStroke} from '../../components/StyledButton';
import {ImageBackground, SafeAreaView} from 'react-native';
import voteStyles from './VoteScreen.styles';
import {StyledButton} from '../../components/StyledButton';
import homeScreenStyles from '../HomeScreen/HomeScreen.styles';
import {
  getAllMessages,
  getLobbyMembers,
  getReadyList,
  getSelectedUser,
  getTime,
  incrementMessageVotes,
  setLobbyTime,
  setSelectedMessage,
  updateLobbyMember,
} from '../../Utils/RemoteDataManager';
import {createGameLobbyID} from '../CreateGame/CreateGame';
import {isNotGameCreator} from '../HomeScreen/HomeScreen';
import {userdata} from '../../Utils/LocalDataManager';
import {ReadyButton} from '../../components/ReadyButton';

const VoteScreen = (props: {navigation: any}) => {
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(-1);
  const [lastSelectedMessageIndex, setLastSelectedMessageIndex] = useState(-1);
  const [messages, setMessages] = useState(['']);
  const [timeText, setTimeText] = useState(100);

  useEffect(() => {
    const effect = async () => {
      const arr = await getAllMessages(createGameLobbyID);
      setMessages(arr);
    };
    effect();
  }, []);

  useEffect(() => {
    const effect = async () => {
      if (selectedMessageIndex !== -1) {
        await incrementMessageVotes(
          createGameLobbyID,
          messages[lastSelectedMessageIndex],
          true,
        );
      }

      await incrementMessageVotes(
        createGameLobbyID,
        messages[selectedMessageIndex],
        false,
      );
    };
    effect();
  }, [messages, selectedMessageIndex]);

  useEffect(() => {
    const intervalQuery = async () => {
      const newTimeText = await getTime(createGameLobbyID);
      let isNav = false;
      let allReady = (await getReadyList(createGameLobbyID)).every(
        user => user.hasVoted,
      );

      if (!isNotGameCreator) {
        await setLobbyTime(
          createGameLobbyID,
          parseFloat((newTimeText - 1).toFixed(2)),
        );
      }

      // @ts-ignore
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
          await setSelectedMessage(createGameLobbyID);
          await setLobbyTime(createGameLobbyID, 100);
        }
        await updateLobbyMember(createGameLobbyID, userdata.username, {
          isReady: true,
          hasVoted: true,
          message: (
            await getLobbyMembers(createGameLobbyID)
          ).find(user => user.username === userdata.username)!.message,
        }).then(async () => {
          if (
            (await getSelectedUser(createGameLobbyID)).username ===
            userdata.username
          ) {
            props.navigation.navigate('YouAreItScreen');
          } else {
            props.navigation.navigate('HeIsItScreen');
          }
        });
      }
    };

    // Call updateUserList every... idek .. it does it alot
    const intervalID = setInterval(intervalQuery, 900);

    // Clear the interval when the component unmounts or when the lobbyID changes
    return () => {
      clearInterval(intervalID);
    };
  }, [selectedMessageIndex, props.navigation]);

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

          <TextStroke stroke={3} color={'#000000'}>
            <Text
              style={{
                padding: 10,
                color: 'white',
                fontSize: 25,
                textAlign: 'center',
                lineHeight: 20,
              }}>
              {`Time: ${timeText}`}
            </Text>
          </TextStroke>
        </View>

        {messages.map((msg, index) => (
          <View style={{padding: 3}} key={index}>
            <View style={voteStyles.emailTextInput}>
              <StyledButton
                onPress={() => {
                  if (selectedMessageIndex !== -1) {
                    setLastSelectedMessageIndex(selectedMessageIndex);
                  }
                  setSelectedMessageIndex(index);
                }}
                buttonText={msg}
                buttonColor={selectedMessageIndex === index}
              />
            </View>
          </View>
        ))}
        <ReadyButton
          onChange={() =>
            updateLobbyMember(createGameLobbyID, userdata.username, {
              hasVoted: true,
            }).then(() => console.log('done'))
          }
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

/*<StyledButton
  onPress={() => props.navigation.navigate('SignUp')}
  buttonText={'Sign Up'}
/>*/

export default VoteScreen;
