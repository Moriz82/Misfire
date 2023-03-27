import {Image, SafeAreaView} from 'react-native';
import {Box, StatusBar, Text, View} from 'native-base';
import React, {useState} from 'react';
import joinGameStyles from './JoinGame.styles';
import {ImageButton} from '../../components/ImageButton';


const JoinGame = (props: {navigation: any}) => {
    return(
    <SafeAreaView>
        <Text>your mom</Text>


        <View style={{width: '10%', height: '10%'}}>
          <ImageButton
            image={require('../../assets/images/MisfireLogo.png')}
            image={require('../../assets/images/backButton.png')}
            onPress={() => props.navigation.navigate('HomeScreen')}
          />
        </View>
    </SafeAreaView>
    );
}

export default JoinGame;