import {View, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ImageBackground} from 'react-native';
import {TextStroke} from '../../components/StyledButton';
import {ImageButton} from '../../components/ImageButton';
import {ReadyButton} from '../../components/ReadyButton';
import homeScreenStyles from '../HomeScreen/HomeScreen.styles';
import {getSelectedUser} from '../../Utils/RemoteDataManager';
import {createGameLobbyID} from '../CreateGame/CreateGame';
import {avatarImages} from '../AvatarScreen/AvatarScreen';

const HomeScreen = (props: {navigation: any}) => {
  const [user, setUser] = useState({username: 'test', avatarID: 0, msg: ''});

  useEffect(() => {
    const effect = async () => {
      const user = await getSelectedUser(createGameLobbyID);
      setUser(user);
    };
    effect();
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/images/MisfireBackground.png')}
      style={homeScreenStyles.backgroundImage}>
      <View style={{alignItems: 'center'}}>
        <TextStroke stroke={3} color={'#000000'}>
          <Text style={{padding: 10, paddingTop: 30, color: '#FF6C1A'}}>
            The target is...{' '}
          </Text>
        </TextStroke>
      </View>

      <View style={{alignItems: 'center'}}>
        <ImageButton
          image={avatarImages[user.avatarID]}
          onPress={() => props.navigation.navigate('HomeScreen')}
          height={170}
          width={170}
          isDark={false}
          isCircle={true}
        />
      </View>

      <View style={{padding: 30, paddingTop: 0, alignItems: 'center'}}>
        <TextStroke stroke={3} color={'#000000'}>
          <Text style={{padding: 8}}>{user.username}</Text>
        </TextStroke>
      </View>

      <View style={{padding: 50, paddingTop: 30, alignItems: 'center'}}>
        <TextStroke stroke={3} color={'#000000'}>
          <Text style={{padding: 10, textAlign: 'center'}}>
            The selected message is:{'\n'} '{user.msg}'
          </Text>
        </TextStroke>
      </View>
    </ImageBackground>
  );
};

/*<StyledButton
  onPress={() => props.navigation.navigate('SignUp')}
  buttonText={'Sign Up'}
/>*/

export default HomeScreen;
