import {View, Text} from 'native-base';
import React, {useState} from 'react';
import {StyledButton, TextStroke} from '../../components/StyledButton';
import {ImageButton} from '../../components/ImageButton';
import {CustomTextInput} from '../../components/CustomTextInput';
import {getLobbyMembersUser, joinLobby} from '../../Utils/RemoteDataManager';
import {userdata} from '../../Utils/LocalDataManager';
import { ImageBackground } from 'react-native';
import endScreenStyles from './EndScreen.styles';

const EndScreen = (props: {navigation: any}) => {

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          height: '13%',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          flexDirection: 'row',
          alignContent: 'space-between',
          backgroundColor: '#434343'
        }}>
        <ImageButton
          image={require('../../assets/images/backButton.png')}
          onPress={() => props.navigation.navigate('HomeScreen')}
          height={50}
          width={50}
          isDark={true}
        />

        <View style={{paddingLeft: 35, paddingBottom: 15}}>
          <TextStroke stroke={3} color={'#000000'}>
            <Text style={{padding: 3}}>Return Home </Text>
          </TextStroke>
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#605A58',
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
          padding: 13,
        }}>
        
        <View style={{paddingLeft: 0, paddingBottom: 15, paddingTop: 60}}>
          <TextStroke stroke={3} color={'#000000'}>
            <Text style={{padding: 3}}>The message...</Text>
          </TextStroke>
        </View>
        <View style={{paddingLeft: 0, paddingBottom: 15}}>
          <TextStroke stroke={3} color={'#000000'}>
            <Text style={{padding: 3, textAlign: 'center'}}>EXAMPLE MESSAGE</Text>
          </TextStroke>
        </View>
        <View style={{paddingLeft: 0, paddingBottom: 15}}>
          <TextStroke stroke={3} color={'#000000'}>
            <Text style={{padding: 3, textAlign: 'center'}}>was sent to</Text>
          </TextStroke>
        </View>
        <View style={{paddingLeft: 0, paddingBottom: 15}}>
          <TextStroke stroke={3} color={'#000000'}>
            <Text style={{padding: 3, textAlign: 'center', color: 'red'}}>EXAMPLE PERSON</Text>
          </TextStroke>
        </View>
      </View>
    </View>

  );
};

export default EndScreen;
