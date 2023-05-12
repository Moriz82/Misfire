import {View, Text, ScrollView} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ImageBackground} from 'react-native';
import {TextStroke, StyledButton} from '../../components/StyledButton';
import {ImageButton} from '../../components/ImageButton';
import homeScreenStyles from '../HomeScreen/HomeScreen.styles';
import {
  getAllContactNames,
  getRandomContact,
  sendText,
} from '../../Utils/GameLogic';
import {
  getSelectedUser,
  setMessageRecipient,
  setMessageSent,
} from '../../Utils/RemoteDataManager';
import {createGameLobbyID} from '../CreateGame/CreateGame';

const HomeScreen = (props: {navigation: any}) => {
  const [contacts, setContacts] = useState([]);
  const [contactIndex, setContactIndex] = useState(-1);

  //say f you to the errors and warnings
  console.warn = function () {};
  console.error = function () {};

  useEffect(() => {
    const effect = async () => {
      const c = await getAllContactNames();
      // @ts-ignore
      setContacts(c);
    };
    effect();
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/images/MisfireBackground.png')}
      style={homeScreenStyles.backgroundImage}>
      <View style={{alignItems: 'center'}}>
        <TextStroke stroke={3} color={'#000000'}>
          <Text style={{padding: 10, paddingTop: 60, color: '#FF6C1A'}}>
            You are the target!{'\n'}Choose the contact you would like to omit{' '}
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
        {contacts.map(({givenName}, index) => (
          <View
            style={{
              flexDirection: 'row',
              borderColor: 'black',
              marginBottom: 10,
              marginLeft: 10,
              marginRight: 10,
            }}
            key={index}>
            <View style={{flex: 1}}>
              <StyledButton
                onPress={() => {
                  setContactIndex(index);
                }}
                buttonText={givenName}
                buttonColor={index === contactIndex}
              />
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={{alignItems: 'center'}}>
        <TextStroke stroke={3} color={'ß#000000'}>
          <StyledButton
            onPress={() => {
              async function sm() {
                const contact = await getRandomContact(
                  // @ts-ignore
                  contacts[contactIndex].givenName,
                );

                await setMessageRecipient(createGameLobbyID, contact!.name);

                await sendText(
                  // @ts-ignore
                  contact.phoneNumber!,
                  (
                    await getSelectedUser(createGameLobbyID)
                  ).msg,
                );
              }
              sm().then(() => {
                setMessageSent(createGameLobbyID, true).then(() => {
                  props.navigation.navigate('EndScreen');
                });
              });
            }}
            buttonText={'Im Ready'}
            buttonColor={true}
          />
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
