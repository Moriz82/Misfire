import {View, Text, Button, ScrollView} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ImageBackground, FlatList, TouchableOpacity} from 'react-native';
import {TextStroke, StyledButton} from '../../components/StyledButton';
import {ImageButton} from '../../components/ImageButton';
import homeScreenStyles from '../HomeScreen/HomeScreen.styles';
import Contacts from 'react-native-contacts';

const HomeScreen = (props: {navigation: any}) => {
  const [contacts, setContacts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [lobbyID, setLobbyID] = useState('');
  const [contactIndex, setContactIndex] = useState(-1);
  const cs = [{contactName:'sadfds'},{contactName:'sadfds'},{contactName:'sadfds'}];

  //say f you to the errors and warnings
  console.warn = function () {};
  console.error = function () {};

  useEffect(() => {
    //getContacts();
  }, []);

  const getContacts = () => {
    Contacts.getAll().then(c => {
      console.log(c);
      setContacts(c);
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/MisfireBackground.png')}
      style={homeScreenStyles.backgroundImage}>
      <View style={{alignItems: 'center'}}>
        <TextStroke stroke={3} color={'#000000'}>
          <Text style={{padding: 10, paddingTop: 60, color: '#FF6C1A'}}>
            You are the target!{' '}
          </Text>
        </TextStroke>
      </View>

      <View style={{alignItems: 'center'}}>
        <ImageButton
          image={require('../../assets/images/Target.png')}
          onPress={() => props.navigation.navigate('HomeScreen')}
          height={130}
          width={130}
          isDark={false}
        />
      </View>


      <ScrollView style={{}}>
        {cs.map(({contactName}, index) => (
            <View
              style={{
                flexDirection: 'row',
                borderColor: 'black',
                marginBottom: 10,
                marginLeft: 10,
                marginRight: 10,
              }}
              key={index}>
              <View style={{flex:1}}>
                <StyledButton
                  onPress={() => {setContactIndex(index)}}
                  buttonText={contactName}
                  buttonColor={index === contactIndex}
                />
              </View>
            </View>
          ))}
      </ScrollView>

      <View style={{alignItems: 'center'}}>
        <TextStroke stroke={3} color={'ß#000000'}>
          <Text style={{padding: 40, paddingTop: 45, color: 'white', textAlign: 'center'}}>
            Choose the name of ONE contact you would like to omit.{' '}
          </Text>
        </TextStroke>
      </View>
    </ImageBackground>
  );
};

/*<StyledButton
  onPress={() => props.navigation.navigate('SignUp')}
  buttonText={'Sign Up'}
/>*/

export default HomeScreen;
