import {SafeAreaView} from 'react-native';
import {Text} from 'native-base';
import React from 'react';
import { ImageButton } from "../../components/ImageButton";

const SettingScreen = (props: {navigation: any}) => {
  return (
    <SafeAreaView>
      <ImageButton
        image={require('../../assets/images/backButton.png')}
        onPress={() => props.navigation.navigate('HomeScreen')}
        height={50}
        width={50}
        isDark={true}
      />
      <Text>Settings</Text>
    </SafeAreaView>
  );
};

export default SettingScreen;
