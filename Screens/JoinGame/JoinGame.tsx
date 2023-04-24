import {View, Text} from 'native-base';
import React, {useState} from 'react';
import {StyledButton, TextStroke} from '../../components/StyledButton';
import {ImageButton} from '../../components/ImageButton';
import {CustomTextInput} from '../../components/CustomTextInput';
import {getLobbyMembersUser, joinLobby} from '../../Utils/RemoteDataManager';
import {userdata} from '../../Utils/LocalDataManager';
import { ImageBackground } from 'react-native';
import homeScreenStyles from './JoinGame.styles';

export var joinGameCode = '';

const JoinGame = (props: {navigation: any}) => {
  const [gameCode, setGameCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  return (
    <View style={{flex: 1}}>
    <ImageBackground
      source={require('../../assets/images/MisfireBackground.png')}
      resizeMode='cover'
      style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          height: '13%',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          flexDirection: 'row',
          alignContent: 'space-between',
        }}>
        <ImageButton
          image={require('../../assets/images/backButton.png')}
          onPress={() => props.navigation.navigate('HomeScreen')}
          height={50}
          width={50}
          isDark={true}
        />

        <View style={{paddingLeft: 50, paddingBottom: 15}}>
          <TextStroke stroke={3} color={'#000000'}>
            <Text style={{}}>Join Game </Text>
          </TextStroke>
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#605A58',
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
          padding: 13,
        }}>
        <ImageButton
          image={require('../../assets/images/MisfireLogoWithText.png')}
          onPress={() => props.navigation.navigate('HomeScreen')}
          height={150}
          width={150}
          isDark={false}
        />

        <View style={{width: '85%', paddingTop: 50}}>
          <CustomTextInput
            placeholderText={'Enter Game Code...'}
            value={gameCode}
            onChangeText={(newText: any) => setGameCode(newText)}
            iconName={'email'}
            isPassword={false}
          />
        </View>

        <View style={{width: '85%', paddingTop: 30}}>
          <StyledButton
            onPress={() => {
              searchForUser().then(value => {
                if (!value) {
                  joinLobby(gameCode).then(() =>
                    console.log(`joined game with code: ${gameCode}`),
                  );
                  joinGameCode = gameCode;
                  props.navigation.navigate('CreateGame');
                } else {
                  setErrorMsg('Duplicate username');
                }
              });
            }}
            buttonText={'Join'}
            buttonColor={true}
          />
        </View>
        <View>
          <Text style={{color: 'red'}}>{errorMsg}</Text>
        </View>
      </View>
    </ImageBackground>
    </View>

  );

  async function searchForUser(): Promise<boolean> {
    const arr = await getLobbyMembersUser(gameCode);
    return arr.some(obj => obj.username === userdata.username);
  }
};

export default JoinGame;
