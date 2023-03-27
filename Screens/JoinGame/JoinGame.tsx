import {SafeAreaView} from 'react-native';
import {View} from 'native-base';
import React from 'react';
import {ImageButton} from '../../components/ImageButton';

import homeScreenStyles from '../HomeScreen/HomeScreen.styles';

const JoinGame = (props: {navigation: any}) => {
  return (
    <SafeAreaView style={homeScreenStyles.safeAreaViewStyle}>
      <View style={{}}>
        <ImageButton
          image={require('../../assets/images/backButton.png')}
          onPress={() => props.navigation.navigate('HomeScreen')}
          height={50}
          width={50}
        />
      </View>
    </SafeAreaView>
  );
};

export default JoinGame;
