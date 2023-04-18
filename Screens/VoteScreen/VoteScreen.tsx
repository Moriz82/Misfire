import {View, Text, Avatar} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {TextStroke} from '../../components/StyledButton';
import {CustomTextInput} from '../../components/CustomTextInput';
import {ImageButton} from '../../components/ImageButton';
import voteStyles from '../MessageScreen/MessageScreen.styles';
import {ReadyButton} from '../../components/ReadyButton';

const VoteScreen = (props: {navigation: any}) => {
  const [usernameText, setUsernameText] = useState('');

  return (
    <>
      
    </>
  );
};

/*<StyledButton
  onPress={() => props.navigation.navigate('SignUp')}
  buttonText={'Sign Up'}
/>*/

export default VoteScreen;
