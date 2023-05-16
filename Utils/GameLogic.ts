import firestore from '@react-native-firebase/firestore';

export var gameSettings = {
  allowPictures: false,
  allowAudio: false,
  allowVideo: false,
  allowProfanity: false,
  maxCharCount: 250,
  roundCount: 3,
};

export const setGameSettings = async (
  lobbyCode: string,
  allowPictures: boolean,
  allowAudio: boolean,
  allowVideo: boolean,
  allowProfanity: boolean,
  maxCharCount: number,
  roundCount: number,
) => {
  gameSettings = {
    allowPictures: allowPictures,
    allowAudio: allowAudio,
    allowVideo: allowVideo,
    allowProfanity: allowProfanity,
    maxCharCount: maxCharCount,
    roundCount: roundCount,
  };

  const lobbyRef = firestore().collection('lobbies').doc(lobbyCode);
  try {
    await lobbyRef.update({
      allowPictures,
      allowAudio,
      allowVideo,
      allowProfanity,
      maxCharCount,
      roundCount,
    });
    console.log(`Game settings updated for lobby ${lobbyCode}`);
  } catch (error) {
    console.log('Error:', error);
  }
};

export const fetchGameSettings = async (lobbyCode: string) => {
  const lobbyRef = firestore().collection('lobbies').doc(lobbyCode);
  const lobbyDoc = await lobbyRef.get();

  if (lobbyDoc.exists) {
    const lobbyData = lobbyDoc.data();
    gameSettings = {
      allowPictures: lobbyData?.allowPictures,
      allowAudio: lobbyData?.allowAudio,
      allowVideo: lobbyData?.allowVideo,
      allowProfanity: lobbyData?.allowProfanity,
      maxCharCount: lobbyData?.maxCharCount,
      roundCount: lobbyData?.roundCount,
    };
  } else {
    throw new Error(`Lobby ${lobbyCode} does not exist`);
  }
};

// a function that sends a text message through react-native and requests permision beforehand
//import the SendSMS class from the module
import {Linking, Platform} from 'react-native';
import {PermissionsAndroid, ToastAndroid} from 'react-native';
import SmsAndroid from 'react-native-sms';

export const sendText = async (phoneNumber: string, message: string) => {
  if (Platform.OS === 'ios') {
    const url = `sms:${phoneNumber}&body=${message}`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log('SMS is not available');
        } else {
          return Linking.openURL(url);
        }
      })
      .then(result => {
        console.log('Message sent:', result);
      })
      .catch(error => {
        console.log('An error occurred:', error);
      });
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        {
          title: 'SMS Permission',
          message: 'App needs SMS permission to send messages',
          buttonPositive: 'OK',
        },
      );
      console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('1');
        const options = {
          body: message,
          recipients: [phoneNumber],
          successTypes: ['sent', 'queued'],
        };
        // @ts-ignore
        await SmsAndroid.send(options, (completed, cancelled, error) => {
          if (completed) {
            console.log('SMS sent successfully');
          } else if (cancelled) {
            console.log('SMS sending cancelled');
          } else if (error) {
            console.log('Error sending SMS');
          }
          console.log('2');
        });
      } else {
        ToastAndroid.show('SMS permission denied', ToastAndroid.SHORT);
      }
    } catch (err) {
      console.warn(err);
    }
  }
};

import Contacts from 'react-native-contacts';

interface Contact {
  name: string;
  phoneNumber: string;
}

export const getRandomContact = async (
  excludeName: string | null,
): Promise<Contact | null> => {
  const permission = await Contacts.requestPermission();

  if (permission === 'authorized') {
    const contacts = await Contacts.getAll();

    // Filter out contacts with the excluded name
    const filteredContacts = excludeName
      ? contacts.filter(contact => `${contact.givenName}` !== excludeName)
      : contacts;

    if (filteredContacts.length === 0) {
      console.log(
        `Error: No contacts found that exclude name "${excludeName}"`,
      );
      return null;
    }

    const randomIndex = Math.floor(Math.random() * filteredContacts.length);
    const randomContact = filteredContacts[randomIndex];

    const name = `${randomContact.givenName}`;
    const phoneNumber = randomContact.phoneNumbers[0]!.number;

    if (!name || !phoneNumber) {
      console.log('Error: Failed to extract contact information');
      return null;
    }

    return {name, phoneNumber};
  } else {
    console.log('Permission to access contacts denied');
    return null;
  }
};

export const getAllContactNames = async (): Promise<
  {
    givenName: string;
    familyName: string;
  }[]
> => {
  const permission = await Contacts.requestPermission();

  if (permission === 'authorized') {
    const contacts = await Contacts.getAll();

    const contactNames = contacts.map(contact => ({
      givenName: contact.givenName,
      familyName: contact.familyName,
    }));

    return contactNames;
  } else {
    console.log('Permission to access contacts denied');
    return [];
  }
};
