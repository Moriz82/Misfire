import {View, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {TextStroke} from '../../components/StyledButton';
import {CustomTextInput} from '../../components/CustomTextInput';
import messageStyles from '../MessageScreen/MessageScreen.styles';
import {ReadyButton} from '../../components/ReadyButton';
import {ImageBackground, SafeAreaView} from 'react-native';
import {
  getLobbyMembers,
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
  const [timeText, setTimeText] = useState(3.3);

  useEffect(() => {
    const intervalQuery = async () => {
      const newUserList = await getLobbyMembers(createGameLobbyID);
      const newTimeText = await getTime(createGameLobbyID);
      parseFloat(newTimeText.toFixed(2));
      // @ts-ignore
      setUserList(newUserList);
      setTimeText(newTimeText);

      if (!isNotGameCreator) {
        await setLobbyTime(
          createGameLobbyID,
          parseFloat((newTimeText - 0.01).toFixed(2)),
        );
      }

      if (timeText - 0.01 <= 0) {
        props.navigation.navigate('VoteScreen');
      }
    };

    // Call updateUserList every... idek .. it does it alot
    const intervalId = setInterval(intervalQuery, 900);

    // Clear the interval when the component unmounts or when the lobbyID changes
    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <ImageBackground
      source={require('../../assets/images/MisfireBackground.png')}
      style={homeScreenStyles.backgroundImage}>
      <SafeAreaView style={{backgroundColor: '#605A58', height: '100%'}}>
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
              {timeText}
            </Text>
          </TextStroke>
        </View>

        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#605A58',
            width: '100%',
            height: '17%',
            justifyContent: 'space-around',
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
            backgroundColor: '#605A58',
            paddingBottom: 10,
            padding: 15,
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
      </SafeAreaView>
    </ImageBackground>
  );
};

/*<StyledButton
  onPress={() => props.navigation.navigate('SignUp')}
  buttonText={'Sign Up'}
/>*/

export default MessageScreen;
