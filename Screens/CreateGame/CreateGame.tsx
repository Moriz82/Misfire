import {SafeAreaView} from 'react-native';
import {Text, View} from 'native-base';
import React from 'react';
import homeScreenStyles from '../HomeScreen/HomeScreen.styles';
import {StyledButton} from '../../components/StyledButton';

const CreateGame = (props: {navigation: any}) => {
  return (
    <SafeAreaView style={homeScreenStyles.safeAreaViewStyle}>
      <Text>your mom</Text>
      <View style={homeScreenStyles.emailTextInput}>
        <StyledButton
          onPress={() => props.navigation.navigate('StartGame')}
          buttonText={'Start Game'}
          buttonColor={true}
        />
      </View>
      <View style={homeScreenStyles.emailTextInput}>
        <StyledButton
          onPress={() => props.navigation.navigate('Chat')}
          buttonText={'Chat'}
          buttonColor={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateGame;
