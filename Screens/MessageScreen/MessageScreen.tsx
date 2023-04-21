import {View, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {TextStroke} from '../../components/StyledButton';
import {CustomTextInput} from '../../components/CustomTextInput';
import messageStyles from '../MessageScreen/MessageScreen.styles';
import {ReadyButton} from '../../components/ReadyButton';
import {SafeAreaView} from 'react-native';
import {
  getLobbyMembers,
  getTime,
  updateLobbyMember,
} from '../../Utils/RemoteDataManager';
import {createGameLobbyID} from '../CreateGame/CreateGame';
import {avatarImages} from '../AvatarScreen/AvatarScreen';
import CircleImage from '../../components/CircleImage';
import {userdata} from '../../Utils/LocalDataManager';

const MessageScreen = (props: {navigation: any}) => {
  const [messageText, setMessageText] = useState('');
  const [userList, setUserList] = useState([]);
  const [timeText, setTimeText] = useState(0);

  useEffect(() => {
    const intervalQuery = async () => {
      const newUserList = await getLobbyMembers(createGameLobbyID);
      const newTimeText = await getTime(createGameLobbyID);
      // @ts-ignore
      setUserList(newUserList);
      setTimeText(newTimeText);
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
    </>
  );
};

/*<StyledButton
  onPress={() => props.navigation.navigate('SignUp')}
  buttonText={'Sign Up'}
/>*/

export default MessageScreen;
