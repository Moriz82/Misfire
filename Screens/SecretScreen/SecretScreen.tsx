import {SafeAreaView} from 'react-native';
import React from 'react';
import {ImageButton} from '../../components/ImageButton';
import { View } from "native-base";

const SecretScreen = (props: {navigation: any}) => {
  return (
    <SafeAreaView>
      <View>
        <ImageButton
          onPress={() => props.navigation.navigate('HomeScreen')}
          image={require('../../assets/images/Secret.png')}
          height={1000}
          width={1000}
        />
      </View>
    </SafeAreaView>
  );
};

export default SecretScreen;
