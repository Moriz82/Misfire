import {View} from 'react-native';
import {Text} from 'native-base';
import React from 'react';
import {ImageButton} from '../../components/ImageButton';
import {TextStroke} from '../../components/StyledButton';
import settingsStyles from './SettingsScreen.styles';

const SettingScreen = (props: {navigation: any}) => {
  return (
    <>
      <View
        style={{
          paddingTop: 20,
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
            paddingTop: 15,
          }}>
          <TextStroke stroke={3} color={'#000000'}>
            <Text style={settingsStyles.buttonText}>Settings</Text>
          </TextStroke>
        </View>
      </View>

      <View style={{backgroundColor: '#605A58', flex: 1}} />
    </>
  );
};

export default SettingScreen;
