import {View} from 'react-native';
import {Text, Slider} from 'native-base';
import React, {useState} from 'react';
import {ImageButton} from '../../components/ImageButton';
import {TextStroke, StyledButton} from '../../components/StyledButton';
import settingsStyles from './SettingsScreen.styles';
import {CustomCheckBox} from '../../components/CustomCheckBox';

const SettingScreen = (props: {navigation: any}) => {
  const [allowPictures, setAllowPictures] = useState(false);
  const [allowAudio, setAllowAudio] = useState(false);
  const [allowVideo, setAllowVideo] = useState(false);
  const [allowOmissions, setAllowOmissions] = useState(false);
  const [allowProfanity, setAllowProfanity] = useState(false);

  return (
    <>
      <View
        style={{
          paddingTop: 25,
          backgroundColor: '#434343',
          alignItems: 'flex-start',
          flexDirection: 'row',
        }}>
        <ImageButton
          image={require('../../assets/images/backButton.png')}
          onPress={() => props.navigation.navigate('HomeScreen')}
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
          defaultValue={70}
          minValue={0}
          maxValue={100}
          accessibilityLabel="hello world"
          step={10}>
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
          defaultValue={70}
          minValue={0}
          maxValue={100}
          accessibilityLabel="hello world"
          step={10}>
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
        />
      </View>

      <View
        style={{
          backgroundColor: '#605A58',
          flex: 1,
          paddingTop: 30,
          width: '100%',
          padding: 25,
        }}>
        <StyledButton
          onPress={() => {
            props.navigation.navigate('HomeScreen');
          }}
          buttonText={'Continue'}
          buttonColor={false}
        />
      </View>
    </>
  );
};

export default SettingScreen;
