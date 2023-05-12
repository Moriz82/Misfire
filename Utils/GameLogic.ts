import firestore from '@react-native-firebase/firestore';
import {selectContactPhone} from 'react-native-select-contact';

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

export const selectContact = async () => {
  try {
    const res = selectContactPhone();
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};
