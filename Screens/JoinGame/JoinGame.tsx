import {SafeAreaView} from 'react-native';
import {View} from 'native-base';
import React from 'react';
import {ImageButton} from '../../components/ImageButton';

import homeScreenStyles from '../HomeScreen/HomeScreen.styles';
import {color} from 'native-base/lib/typescript/theme/styled-system';

const JoinGame = (props: {navigation: any}) => {
  return (
    <SafeAreaView style={homeScreenStyles.safeAreaViewStyle}>
      <View
        style={{
          width: '100%',
          height: '13%',
          backgroundColor: '#434343',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
        }}>
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
