<<<<<<< HEAD
import {
  Box,
  StatusBar,
  View,
  Text,
  Button,
  ScrollView,
  Image,
} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
=======
import {View, Text, Image} from 'native-base';
import React from 'react';
>>>>>>> ba275eba52dc38cacda9aaba971b879e7848c591
import {StyledButton, TextStroke} from '../../components/StyledButton';
import {ImageButton} from '../../components/ImageButton';
import homeScreenStyles from '../HomeScreen/HomeScreen.styles';
import {buttonSelected} from '../HomeScreen/HomeScreen';

const HomeScreen = (props: {navigation: any}) => {
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
            <Text style={homeScreenStyles.buttonText}>Avatar Selection</Text>
          </TextStroke>
        </View>
      </View>

      <View style={{height: '30%', backgroundColor: '#605A58', paddingTop: 10, alignItems: 'center'}}>
        <Image
          style={{height: 160, width: 160}}
          source={require('../../assets/images/backButton.png')}
          alt={"err"}
        />
      </View>
        
      <View style={styles.gridContainer}>
       <View style={styles.gridCell}/>
       <View style={styles.gridCell}/>
       <View style={styles.gridCell}/>
       <View style={styles.gridCell}/>
       <View style={styles.gridCell}/>
       <View style={styles.gridCell}/>
       <View style={styles.gridCell}/>
       <View style={styles.gridCell}/>
       <View style={styles.gridCell}/>
      </View>
      

      <View
        style={{
          backgroundColor: '#605A58',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: 8
        }}>
        <View style={homeScreenStyles.emailTextInput}>
          <StyledButton
            onPress={() => {
              props.navigation.navigate(
                buttonSelected ? 'JoinGame' : 'CreateGame',
              );
            }}
            buttonText={'Create Game'}
            buttonColor={true}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#c7c7c7',
  },
  gridCell: {
    flexBasis: '33.333%',
    height: 100,
    borderWidth: 5,
    borderColor: '#3d3d3d',
  },
});

/*<StyledButton
  onPress={() => props.navigation.navigate('SignUp')}
  buttonText={'Sign Up'}
/>*/

export default HomeScreen;
