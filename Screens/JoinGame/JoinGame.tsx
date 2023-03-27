import {Image, SafeAreaView} from 'react-native';
import {Box, StatusBar, Text, View} from 'native-base';
import React, {useState} from 'react';
import joinGameStyles from './JoinGame.styles';
import {ImageButton} from '../../components/ImageButton';

import homeScreenStyles from '../HomeScreen/HomeScreen.styles';

const JoinGame = (props: {navigation: any}) => {
    return(
    <SafeAreaView>
        <Text>your mom</Text>
    <SafeAreaView style={homeScreenStyles.safeAreaViewStyle}>


        <View style={{width: '10%', height: '10%'}}>
        <View style={{}}>
          <ImageButton
            image={require('../../assets/images/MisfireLogo.png')}
            image={require('../../assets/images/backButton.png')}
            onPress={() => props.navigation.navigate('HomeScreen')}
            height={50}
            width={50}
          />
        </View>
    </SafeAreaView>
    );
}

export default JoinGame;