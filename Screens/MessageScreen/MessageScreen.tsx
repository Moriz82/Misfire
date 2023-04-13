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
    <SafeAreaView style={messageStyles.safeAreaViewStyle}>
      <View style={{alignItems: 'center'}}>
        <TextStroke stroke={3} color={'#000000'}>
          <Text style={{padding: 10, paddingTop: 30, color: '#FF6C1A'}}>
            The target is...{' '}
          </Text>
        </TextStroke>
      </View>

      <View style={{alignItems: 'center'}}>
        <ImageButton
          image={require('../../assets/images/avatar0.png')}
          onPress={() => props.navigation.navigate('HomeScreen')}
          height={170}
          width={170}
          isDark={false}
        />
      </View>

      <View style={{padding: 30, paddingTop: 0, alignItems: 'center'}}>
        <TextStroke stroke={3} color={'#000000'}>
          <Text style={messageStyles.buttonText}>User 1</Text>
        </TextStroke>
      </View>

      <View style={{padding: 50, paddingTop: 30, alignItems: 'center'}}>
        <TextStroke stroke={3} color={'#000000'}>
          <Text style={messageStyles.buttonText}>
            The game will begin shortly... think of a funny text message!
          </Text>
        </TextStroke>
      </View>

      <View style={{padding: 60}}>
        <ReadyButton />
      </View>
    </SafeAreaView>
  );
};

/*<StyledButton
  onPress={() => props.navigation.navigate('SignUp')}
  buttonText={'Sign Up'}
/>*/

export default HomeScreen;
