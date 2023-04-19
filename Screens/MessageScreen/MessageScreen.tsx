import {View, Text, Avatar} from 'native-base';
import React, {useState} from 'react';
import {TextStroke} from '../../components/StyledButton';
import {CustomTextInput} from '../../components/CustomTextInput';
import messageStyles from '../MessageScreen/MessageScreen.styles';
import {ReadyButton} from '../../components/ReadyButton';

const MessageScreen = (props: {navigation: any}) => {
  const [usernameText, setUsernameText] = useState('');

  return (
    <>
      <View style={{backgroundColor: '#605A58', height: '100%'}}>
        <View style={{alignItems: 'center', paddingTop: 10}}>
          <TextStroke stroke={3} color={'#000000'}>
            <Text
              style={{
                padding: 10,
                paddingTop: 30,
                color: 'white',
                fontSize: 40,
              }}>
              Time Left:{' '}
            </Text>
          </TextStroke>

          <TextStroke stroke={3} color={'#000000'}>
            <Text
              style={{
                padding: 10,
                paddingTop: 30,
                color: 'white',
                fontSize: 60,
              }}>
              5:21{' '}
            </Text>
          </TextStroke>
        </View>

        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#605A58',
            width: '100%',
            height: '17%',
            justifyContent: 'space-around',
          }}>
          <Avatar style={{width: '20%', height: '65%'}}>
            <TextStroke stroke={3} color={'#000000'}>
              <Text
                style={{
                  padding: 10,
                  paddingTop: 90,
                  color: 'white',
                  fontSize: 18,
                }}>
                User 1{' '}
              </Text>
            </TextStroke>
          </Avatar>

          <Avatar style={{width: '20%', height: '65%'}}>
            <TextStroke stroke={3} color={'#000000'}>
              <Text
                style={{
                  padding: 10,
                  paddingTop: 90,
                  color: 'white',
                  fontSize: 18,
                }}>
                User 1{' '}
              </Text>
            </TextStroke>
          </Avatar>

          <Avatar style={{width: '20%', height: '65%'}}>
            <TextStroke stroke={3} color={'#000000'}>
              <Text
                style={{
                  padding: 10,
                  paddingTop: 90,
                  color: 'white',
                  fontSize: 18,
                }}>
                User 1{' '}
              </Text>
            </TextStroke>
          </Avatar>

          <Avatar style={{width: '20%', height: '65%'}}>
            <TextStroke stroke={3} color={'#000000'}>
              <Text
                style={{
                  padding: 10,
                  paddingTop: 90,
                  color: 'white',
                  fontSize: 18,
                }}>
                User 1{' '}
              </Text>
            </TextStroke>
          </Avatar>
        </View>

        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#605A58',
            width: '100%',
            height: '17%',
            justifyContent: 'space-around',
          }}>
          <Avatar style={{width: '20%', height: '65%'}}>
            <TextStroke stroke={3} color={'#000000'}>
              <Text
                style={{
                  padding: 10,
                  paddingTop: 90,
                  color: 'white',
                  fontSize: 18,
                }}>
                User 1{' '}
              </Text>
            </TextStroke>
          </Avatar>

          <Avatar style={{width: '20%', height: '65%'}}>
            <TextStroke stroke={3} color={'#000000'}>
              <Text
                style={{
                  padding: 10,
                  paddingTop: 90,
                  color: 'white',
                  fontSize: 18,
                }}>
                User 1{' '}
              </Text>
            </TextStroke>
          </Avatar>

          <Avatar style={{width: '20%', height: '65%'}}>
            <TextStroke stroke={3} color={'#000000'}>
              <Text
                style={{
                  padding: 10,
                  paddingTop: 90,
                  color: 'white',
                  fontSize: 18,
                }}>
                User 1{' '}
              </Text>
            </TextStroke>
          </Avatar>

          <Avatar style={{width: '20%', height: '65%'}}>
            <TextStroke stroke={3} color={'#000000'}>
              <Text
                style={{
                  padding: 10,
                  paddingTop: 90,
                  color: 'white',
                  fontSize: 18,
                }}>
                User 1{' '}
              </Text>
            </TextStroke>
          </Avatar>
        </View>

        <View
          style={{
            width: '100%',
            height: '15%',
            backgroundColor: '#605A58',
            paddingBottom: 10,
            padding: 15,
          }}>
          <View style={messageStyles.emailTextInput}>
            <CustomTextInput
              placeholderText={'Type a funny message...'}
              value={usernameText}
              onChangeText={(newText: any) => setUsernameText(newText)}
              iconName={'email'}
              isPassword={false}
            />
          </View>
        </View>

        <View style={{alignItems: 'center', padding: 20}}>
          <ReadyButton />
        </View>
      </View>
    </>
  );
};

/*<StyledButton
  onPress={() => props.navigation.navigate('SignUp')}
  buttonText={'Sign Up'}
/>*/

export default MessageScreen;
