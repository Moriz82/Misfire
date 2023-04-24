import {View, Text, Avatar, Badge} from 'native-base';
import React, {useState} from 'react';
import {TextStroke} from '../../components/StyledButton';
import {CustomTextInput} from '../../components/CustomTextInput';
import {ReadyButton} from '../../components/ReadyButton';
import {ImageBackground, SafeAreaView} from 'react-native';
import voteStyles from './VoteScreen.styles';
import {StyledButton} from '../../components/StyledButton';
import homeScreenStyles from '../HomeScreen/HomeScreen.styles';

const VoteScreen = (props: {navigation: any}) => {

  return (
    <ImageBackground
      source={require('../../assets/images/MisfireBackground.png')}
      style={homeScreenStyles.backgroundImage}>
      <SafeAreaView style={{backgroundColor: '#605A58', height: '100%'}}>
        <View style={{alignItems: 'center', paddingTop: 12, width: '100%', backgroundColor: '#605A58'}}>
          <TextStroke stroke={3} color={'#000000'}>
            <Text
              style={{
                padding: 20,
                paddingTop: 30,
                color: 'white',
                fontSize: 40,
                textAlign: 'center',
                lineHeight: 50
              }}>
              Vote On A Message!{' '}
            </Text>
          </TextStroke>
        </View>

        <View style={{padding: 3}}>
          <View style={voteStyles.emailTextInput}>
            <StyledButton
              onPress={() => {
                props.navigation.navigate('VoteScreen');
              }}
              buttonText={'Example Message'}
              buttonColor={false}
            />
          </View>
        </View>

        <View style={{padding: 3}}>
          <View style={voteStyles.emailTextInput}>
            <StyledButton
              onPress={() => {
                props.navigation.navigate('VoteScreen');
              }}
              buttonText={'Example Message'}
              buttonColor={false}
            />
          </View>
        </View>

        <View style={{padding: 3}}>
          <View style={voteStyles.emailTextInput}>
            <StyledButton
              onPress={() => {
                props.navigation.navigate('VoteScreen');
              }}
              buttonText={'Example Message'}
              buttonColor={false}
            />
          </View>
        </View>

        <View style={{padding: 3}}>
          <View style={voteStyles.emailTextInput}>
            <StyledButton
              onPress={() => {
                props.navigation.navigate('VoteScreen');
              }}
              buttonText={'Example Message'}
              buttonColor={true}
            />
          </View>
        </View>

        <View style={{padding: 3}}>
          <View style={voteStyles.emailTextInput}>
            <StyledButton
              onPress={() => {
                props.navigation.navigate('VoteScreen');
              }}
              buttonText={'Example Message'}
              buttonColor={false}
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

/*<StyledButton
  onPress={() => props.navigation.navigate('SignUp')}
  buttonText={'Sign Up'}
/>*/

export default VoteScreen;
