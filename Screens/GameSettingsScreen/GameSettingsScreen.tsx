import {SafeAreaView} from 'react-native';
import {Text} from 'native-base';
import React from 'react';
import {ImageButton} from '../../components/ImageButton';

const GameSettingScreen = (props: {navigation: any}) => {
  return (
    <SafeAreaView>
      <ImageButton
        image={require('../../assets/images/backButton.png')}
        onPress={() => props.navigation.navigate('CreateGame')}
        height={50}
        width={50}
        isDark={true}
      />
      <Text>Settings</Text>
    </SafeAreaView>
  );
};

export default GameSettingScreen;
