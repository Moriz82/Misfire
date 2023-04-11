import firestore from '@react-native-firebase/firestore';
import 'react-native-get-random-values';
// @ts-ignore
import {v4 as uuid} from 'uuid';

export const createLobby = async () => {
  const lobbyCode = uuid();
  try {
    await firestore().collection('lobbies').add(lobbyCode);
    await firestore().collection('lobbies').doc(lobbyCode).set({
      members: [], // Add an empty array to store lobby members
    });
    console.log(`Lobby Created with code ${lobbyCode}`);
  } catch (error) {
    console.log('Error:', error);
  }
  return lobbyCode;
};

export const joinLobby = async (
  lobbyCode: string,
  username: string,
  avatarID: number,
) => {
  // Get the lobby document reference
  const lobbyRef = firestore().collection('lobbies').doc(lobbyCode);

  // Add the user to the members array
  if (!(await lobbyRef.get())) {
    await lobbyRef.update({
      members: firestore.FieldValue.arrayUnion({
        username: username,
        avatarID: avatarID,
      }),
    });
  } else {
    return 'Username already exists in lobby';
  }
};

export const deleteLobby = async (lobbyCode: string) => {
  await firestore().collection('lobbies').doc(lobbyCode).delete();
};
