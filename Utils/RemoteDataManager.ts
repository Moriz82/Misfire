import firestore from '@react-native-firebase/firestore';
import 'react-native-get-random-values';
// @ts-ignore
import {nanoid} from 'nanoid';
import {userdata} from './LocalDataManager';

export const createLobby = async () => {
  // this code brought the rage out of me for troubleshooting for hours :D
  const lobbyCode = nanoid(8);
  try {
    //await firestore().collection('lobbies').add(lobbyCode);
    await firestore().collection('lobbies').doc(lobbyCode).set({
      members: [], // Add an empty array to store lobby members
    });
    console.log(`Lobby Created with code ${lobbyCode}`);
  } catch (error) {
    console.log('Error:', error);
  }
  return lobbyCode;
};

export const joinLobby = async (lobbyCode: string) => {
  // Get the lobby document reference
  const lobbyRef = firestore().collection('lobbies').doc(lobbyCode);

  // Add the user to the members thing
  const lobbyDoc = await lobbyRef.get();
  if (lobbyDoc.exists) {
    const lobbyData = lobbyDoc.data();
    if (
      !lobbyData?.members.some(
        (member: {username: any}) => member.username === userdata.username,
      )
    ) {
      await lobbyRef.update({
        members: firestore.FieldValue.arrayUnion({
          username: userdata.username,
          avatarID: userdata.avatarID,
        }),
      });
    } else {
      return 'Username already exists in lobby';
    }
  } else {
    return 'Lobby does not exist';
  }
};

export const leaveLobby = async (lobbyCode: string) => {
  // Get the lobby document reference
  const lobbyRef = firestore().collection('lobbies').doc(lobbyCode);

  // Remove the user from the members thing
  const lobbyDoc = await lobbyRef.get();
  if (lobbyDoc.exists) {
    const lobbyData = lobbyDoc.data();
    const updatedMembers = lobbyData?.members.filter(
      (member: {username: any}) => member.username !== userdata.username,
    );
    await lobbyRef.update({
      members: updatedMembers,
    });

    // Check if the user was the last member, and then yeet it if so
    if (updatedMembers.length === 0) {
      await deleteLobby(lobbyCode);
    }
  } else {
    return 'Lobby does not exist';
  }
};

export const deleteLobby = async (lobbyCode: string) => {
  await firestore().collection('lobbies').doc(lobbyCode).delete();
};

export const getLobbyMembers = async (
  lobbyCode: string,
): Promise<{username: string; avatarID: number}[]> => {
  const lobbyRef = firestore().collection('lobbies').doc(lobbyCode);

  const lobbyDoc = await lobbyRef.get();
  if (lobbyDoc.exists) {
    const lobbyData = lobbyDoc.data();
    return lobbyData?.members as {username: string; avatarID: number}[];
  } else {
    return [];
  }
};
