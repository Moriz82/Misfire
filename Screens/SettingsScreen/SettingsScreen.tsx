import {ImageBackground, View} from 'react-native';
import {Text, Slider} from 'native-base';
import React, {useState} from 'react';
import {ImageButton} from '../../components/ImageButton';
import {TextStroke} from '../../components/StyledButton';
import settingsStyles from './SettingsScreen.styles';
import {CustomCheckBox} from '../../components/CustomCheckBox';
import {gameSettings, setGameSettings} from '../../Utils/GameLogic';
import {createGameLobbyID} from '../CreateGame/CreateGame';
import homeScreenStyles from '../HomeScreen/HomeScreen.styles';

const SettingScreen = (props: {navigation: any}) => {
  const [allowPictures, setAllowPictures] = useState(
    gameSettings.allowPictures,
  );
  const [allowAudio, setAllowAudio] = useState(gameSettings.allowAudio);
  const [allowVideo, setAllowVideo] = useState(gameSettings.allowVideo);
  const [allowProfanity, setAllowProfanity] = useState(
    gameSettings.allowProfanity,
  );
  const [maxCharCount, setMaxCharCount] = useState(gameSettings.maxCharCount);
  const [roundCount, setRoundCount] = useState(gameSettings.roundCount);

  return (
    <ImageBackground
      source={require('../../assets/images/MisfireBackground.png')}
      style={homeScreenStyles.backgroundImage}>
      <View
        style={{
          paddingTop: 25,
          backgroundColor: '#434343',
          alignItems: 'flex-start',
          flexDirection: 'row',
        }}>
        <ImageButton
          image={require('../../assets/images/backButton.png')}
          onPress={() => {
            setGameSettings(
              createGameLobbyID,
              allowPictures,
              allowAudio,
              allowVideo,
              allowProfanity,
              maxCharCount,
              roundCount,
            ).then(() =>
              console.log(
                `Game Settings set to : ${JSON.stringify(gameSettings)}`,
              ),
            );
            props.navigation.navigate('CreateGame');
          }}
          height={50}
          width={50}
          isDark={true}
        />

        <View
          style={{
            alignItems: 'center',
            flex: 1,
            paddingRight: 70,
            paddingTop: 20,
          }}>
          <TextStroke stroke={3} color={'#000000'}>
            <Text style={settingsStyles.buttonText}>Settings</Text>
          </TextStroke>
        </View>
      </View>

      <View style={{backgroundColor: '#605A58', height: '10%', paddingTop: 10}}>
        <View style={{width: '100%'}}>
          <CustomCheckBox
            displayText="Profanity"
            width={45}
            height={45}
            isDark={false}
            image1={require('../../assets/images/checkImage.png')}
            image2={require('../../assets/images/blankImage.png')}
            onChange={isChecked => setAllowProfanity(isChecked)}
            initState={allowProfanity}
          />
        </View>
      </View>

      <View style={{backgroundColor: '#605A58', height: '4%'}} />

      <View
        style={{
          backgroundColor: '#605A58',
          height: '5%',
          alignItems: 'center',
        }}>
        <TextStroke stroke={3} color={'#000000'}>
          <Text style={settingsStyles.buttonText}>Max Character Count</Text>
        </TextStroke>
      </View>

      <View
        style={{
          backgroundColor: '#605A58',
          height: '5%',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <TextStroke stroke={3} color={'#000000'}>
          <Text style={settingsStyles.buttonText}>1</Text>
        </TextStroke>

        <Slider
          w="3/4"
          colorScheme="orange"
          maxW="300"
          defaultValue={250}
          minValue={1}
          maxValue={500}
          accessibilityLabel="ge1"
          step={1}
          onChangeEnd={v => {
            v && setMaxCharCount(Math.floor(v));
          }}>
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>

        <TextStroke stroke={3} color={'#000000'}>
          <Text style={settingsStyles.buttonText}>500</Text>
        </TextStroke>
      </View>

      <View
        style={{
          backgroundColor: '#605A58',
          height: '10%',
          alignItems: 'center',
          paddingTop: 45,
        }}>
        <TextStroke stroke={3} color={'#000000'}>
          <Text style={settingsStyles.buttonText}>Number of Rounds</Text>
        </TextStroke>
      </View>

      <View
        style={{
          backgroundColor: '#605A58',
          height: '5%',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <TextStroke stroke={3} color={'#000000'}>
          <Text style={settingsStyles.buttonText}>1</Text>
        </TextStroke>

        <Slider
          w="3/4"
          colorScheme="orange"
          maxW="300"
          defaultValue={3}
          minValue={1}
          maxValue={20}
          accessibilityLabel="hello world"
          step={1}
          onChangeEnd={v => {
            v && setRoundCount(Math.floor(v));
          }}>
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>

        <TextStroke stroke={3} color={'#000000'}>
          <Text style={settingsStyles.buttonText}>20</Text>
        </TextStroke>
      </View>

      <View
        style={{
          backgroundColor: '#605A58',
          height: '10%',
          paddingTop: 10,
          width: '100%',
        }}>
        <CustomCheckBox
          displayText="Allow Pictures"
          width={45}
          height={45}
          isDark={false}
          image1={require('../../assets/images/checkImage.png')}
          image2={require('../../assets/images/blankImage.png')}
          onChange={isChecked => setAllowPictures(isChecked)}
          initState={allowPictures}
        />
      </View>
      <View
        style={{
          backgroundColor: '#605A58',
          height: '10%',
          paddingTop: 10,
          width: '100%',
        }}>
        <CustomCheckBox
          displayText="Allow Audio"
          width={45}
          height={45}
          isDark={false}
          image1={require('../../assets/images/checkImage.png')}
          image2={require('../../assets/images/blankImage.png')}
          onChange={isChecked => setAllowAudio(isChecked)}
          initState={allowAudio}
        />
      </View>
      <View
        style={{
          backgroundColor: '#605A58',
          height: '10%',
          paddingTop: 10,
          width: '100%',
        }}>
        <CustomCheckBox
          displayText="Allow Video"
          width={45}
          height={45}
          isDark={false}
          image1={require('../../assets/images/checkImage.png')}
          image2={require('../../assets/images/blankImage.png')}
          onChange={isChecked => setAllowVideo(isChecked)}
          initState={allowVideo}
        />
      </View>

      <View
        style={{
          backgroundColor: '#605A58',
          flex: 1,
          paddingTop: 30,
          width: '100%',
          padding: 25,
        }}
      />
    </ImageBackground>
  );
};

export default SettingScreen;
