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
import {Linking} from 'react-native';

export const sendText = (phoneNumber, message) => {
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
};
