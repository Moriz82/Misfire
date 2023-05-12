import {View, Text, Button} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ImageBackground, FlatList, TouchableOpacity} from 'react-native';
import {TextStroke} from '../../components/StyledButton';
import {ImageButton} from '../../components/ImageButton';
import homeScreenStyles from '../HomeScreen/HomeScreen.styles';
import Contacts from 'react-native-contacts';
import Popover from 'react-native-popover-view';

const HomeScreen = (props: {navigation: any}) => {
  const [contacts, setContacts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    getContacts();
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
          <Text style={{padding: 10, paddingTop: 90, color: '#FF6C1A'}}>
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

      <View style={{padding: 30, paddingTop: 0}}>
        <View style={homeScreenStyles.emailTextInput}>
          <Button title="Pick a contact" onPress={() => setIsVisible(true)} />
          <Text>{selectedContact}</Text>
        </View>
      </View>

      <View style={{alignItems: 'center'}}>
        <TextStroke stroke={3} color={'#000000'}>
          <Text style={{padding: 30, paddingTop: 45, color: 'white'}}>
            Type the name of ONE contact you would like to omit.{' '}
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
