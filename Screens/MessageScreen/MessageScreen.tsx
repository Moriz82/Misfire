import {View, Text} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {TextStroke} from '../../components/StyledButton';
import {CustomTextInput} from '../../components/CustomTextInput';
import {ImageButton} from '../../components/ImageButton';
import messageStyles from '../MessageScreen/MessageScreen.styles';
import {ReadyButton} from '../../components/ReadyButton';

const HomeScreen = (props: {navigation: any}) => {
  const [usernameText, setUsernameText] = useState('');

  return (
    <>
      <View style={{backgroundColor: '#605A58', height: '15%'}}>
        
      </View>
    </>
  );
};

/*<StyledButton
  onPress={() => props.navigation.navigate('SignUp')}
  buttonText={'Sign Up'}
/>*/

export default HomeScreen;
