import {SafeAreaView} from 'react-native';
import {Box, Slider, Text, View} from 'native-base';
import React from 'react';
import {ImageButton} from '../../components/ImageButton';
import homeScreenStyles from '../HomeScreen/HomeScreen.styles';
import {CustomCheckBox} from '../../components/CustomCheckBox';
import { TextStroke } from '../../components/StyledButton';
import Svg from "react-native-svg";

const GameSettingScreen = (props: {navigation: any}) => {
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
          <Svg height="60" width="200">
            <Text stroke="black" fontSize="20" fontWeight="bold" x="100" y="20" textAnchor="middle">
              STROKED TEXT
            </Text>
          </Svg>
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
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GameSettingScreen;