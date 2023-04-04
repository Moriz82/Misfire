import {SafeAreaView} from 'react-native';
import {Text, View} from 'native-base';
import React from 'react';
import homeScreenStyles from '../HomeScreen/HomeScreen.styles';
import {StyledButton, TextStroke} from '../../components/StyledButton';
import {ImageButton} from '../../components/ImageButton';

const CreateGame = (props: {navigation: any}) => {
  const gameID: number = 25902398;

  return (
    <>
      <View
        style={{
          width: '100%',
          height: '13%',
          backgroundColor: '#434343',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          flexDirection: 'row',
          alignContent: 'space-between',
        }}>
        <ImageButton
          image={require('../../assets/images/backButton.png')}
          onPress={() => props.navigation.navigate('HomeScreen')}
          height={50}
          width={50}
          isDark={true}
        />

        <View
          style={{
            alignItems: 'center',
            flex: 1,
            paddingRight: 78,
            paddingBottom: 15,
          }}>
          <TextStroke stroke={3} color={'#000000'}>
            <Text style={homeScreenStyles.buttonText}>Create Game </Text>
          </TextStroke>
        </View>
      </View>

      <SafeAreaView style={homeScreenStyles.safeAreaViewStyle}>
        <View style={{alignItems: 'center'}}>
          <View style={{paddingTop: 25, paddingBottom: 10}}>
            <TextStroke stroke={3} color={'#000000'}>
              <Text style={homeScreenStyles.buttonText}>Game ID: </Text>
            </TextStroke>
            <TextStroke stroke={3} color={'#000000'}>
              <Text style={homeScreenStyles.buttonText}>{gameID}</Text>
            </TextStroke>
          </View>
        </View>

        <View style={{backgroundColor: 'white', flex: 1}} />

        <View style={{padding: 10, paddingBottom: 50, paddingVertical: 0}}>
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
        </View>
      </SafeAreaView>
    </>
  );
};

export default CreateGame;
