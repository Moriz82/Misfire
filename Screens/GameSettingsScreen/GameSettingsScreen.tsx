import {SafeAreaView} from 'react-native';
import {Box, Slider, Text, View} from 'native-base';
import React, {useState} from 'react';
import {ImageButton} from '../../components/ImageButton';
import homeScreenStyles from '../HomeScreen/HomeScreen.styles';
import {CustomCheckBox} from '../../components/CustomCheckBox';
import {TextStroke} from '../../components/StyledButton';

const GameSettingScreen = (props: {navigation: any}) => {
  const [allowPictures, setAllowPictures] = useState(false);
  const [allowAudio, setAllowAudio] = useState(false);
  const [allowVideo, setAllowVideo] = useState(false);
  const [allowOmissions, setAllowOmissions] = useState(false);

  const handleAllowPicturesChange = (value) => {
    setAllowPictures(value);
  };

  return (
    <SafeAreaView style={homeScreenStyles.safeAreaViewStyle}>
      <ImageButton
        image={require('../../assets/images/backButton.png')}
        onPress={() => props.navigation.navigate('CreateGame')}
        height={50}
        width={50}
        isDark={true}
      />
      <Text>Settings</Text>
      <View alignItems={'flex-start'}>
        <View style={homeScreenStyles.emailTextInput}>
          <CustomCheckBox
            height={50}
            width={50}
            isDark={false}
            displayText={'Allow Pictures'}
            image1={require('../../assets/images/checkImage.png')}
            image2={require('../../assets/images/blankImage.png')}
            handleValChange={handleAllowPicturesChange}
          />
        </View>
        <Box
          w="100%"
          h="10%"
          style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            paddingLeft: 20,
          }}>
          <Box alignItems="center" w="75%" h="85%">
            <Slider
              w="3/4"
              maxW="200"
              defaultValue={250}
              size="lg"
              minValue={1}
              maxValue={500}
              accessibilityLabel="slider"
              step={10}
              colorScheme="orange">
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
          </Box>
          <TextStroke stroke={3} color={'#000000'}>
            <Text>500</Text>
          </TextStroke>
        </Box>
        <View>
          <CustomCheckBox
            height={50}
            width={50}
            isDark={false}
            displayText={'Allow Audio'}
            image1={require('../../assets/images/checkImage.png')}
            image2={require('../../assets/images/blankImage.png')}
            handleValChange={setAllowAudio}
          />
        </View>
        <View>
          <CustomCheckBox
            height={50}
            width={50}
            isDark={false}
            displayText={'Allow Video'}
            image1={require('../../assets/images/checkImage.png')}
            image2={require('../../assets/images/blankImage.png')}
            handleValChange={setAllowVideo}
          />
        </View>
        <View>
          <CustomCheckBox
            height={50}
            width={50}
            isDark={false}
            displayText={'Allow Omissions'}
            image1={require('../../assets/images/checkImage.png')}
            image2={require('../../assets/images/blankImage.png')}
            handleValChange={setAllowOmissions}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GameSettingScreen;
