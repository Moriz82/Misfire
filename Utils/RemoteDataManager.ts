import firestore from '@react-native-firebase/firestore';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

export const createLobby = async () => {
  const lobbyCode = uuid();
  console.log("test")
  try {
    await firestore().collection('lobbies').doc(lobbyCode).set({
      members: [], // Add an empty array to store lobby members
    });
    console.log("test")
  } catch (error) {
    console.log("Error:", error);
  }
  return lobbyCode;
};

export const joinLobby = async (lobbyCode:string , username:string) => {
  // Get the lobby document reference
  const lobbyRef = firestore().collection('lobbies').doc(lobbyCode);

  // Add the user to the members array
  await lobbyRef.update({
    members: firestore.FieldValue.arrayUnion(username),
  });

  // Call a Firebase Cloud Function to update the lobby members on all clients
  //const updateLobbyMembers = functions().httpsCallable('updateLobbyMembers');
  //updateLobbyMembers({ lobbyCode });
};

export const deleteLobby = async (lobbyCode:string) => {
  await firestore().collection('lobbies').doc(lobbyCode).delete();
}
