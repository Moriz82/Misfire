import firestore from '@react-native-firebase/firestore';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';
import {userdata} from './LocalDataManager';

export const createLobby = async () => {
  // this code brought the rage out of me for troubleshooting for hours :D
  const lobbyCode = nanoid(8);
  try {
    //await firestore().collection('lobbies').add(lobbyCode);
    await firestore().collection('lobbies').doc(lobbyCode).set({
      isGameStarted: false,
      // Game Settings
      allowPictures: false,
      allowAudio: false,
      allowVideo: false,
      allowProfanity: false,
      maxCharCount: 250,
      roundCount: 3,
      lobbyTime: 0.03,
      selectedMessage: '',
      // Add an empty array to store lobby members
      members: [],
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
          isReady: false,
          message: '',
          messageVotes: 0,
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
    return lobbyData?.members as {
      username: string;
      avatarID: number;
      isReady: boolean;
      message: string;
    }[];
  } else {
    return [];
  }
};

export const getLobbyMembersUser = async (
  lobbyCode: string,
): Promise<{username: string}[]> => {
  const lobbyRef = firestore().collection('lobbies').doc(lobbyCode);

  const lobbyDoc = await lobbyRef.get();
  if (lobbyDoc.exists) {
    const lobbyData = lobbyDoc.data();
    return lobbyData?.members as {
      username: string;
      avatarID: number;
      isReady: boolean;
      message: string;
    }[];
  } else {
    return [];
  }
};

export const remoteStartGame = async (lobbyCode: string) => {
  const lobbyRef = firestore().collection('lobbies').doc(lobbyCode);
  try {
    await lobbyRef.update({isGameStarted: true});
    console.log(`Game started in lobby ${lobbyCode}`);
  } catch (error) {
    console.log('Error:', error);
  }
};

export const isGameStarted = async (lobbyCode: string): Promise<boolean> => {
  const lobbyRef = firestore().collection('lobbies').doc(lobbyCode);
  const lobbyDoc = await lobbyRef.get();

  if (lobbyDoc.exists) {
    const lobbyData = lobbyDoc.data();
    return lobbyData?.isGameStarted;
  } else {
    throw new Error(`Lobby ${lobbyCode} does not exist`);
  }
};

export const setLobbyTime = async (lobbyCode: string, time: number) => {
  const lobbyRef = firestore().collection('lobbies').doc(lobbyCode);

  try {
    await lobbyRef.update({
      lobbyTime: time,
    });
  } catch (error) {
    console.log('Error:', error);
  }
};

export const updateLobbyMember = async (
  lobbyCode: string,
  username: string,
  updates: {
    isReady?: boolean;
    message?: string;
  },
) => {
  const lobbyRef = firestore().collection('lobbies').doc(lobbyCode);

  // Get the current lobby data
  const lobbyDoc = await lobbyRef.get();
  const lobbyData = lobbyDoc.data();

  // Update the member object with the specified fields
  const members = lobbyData!.members;
  const memberIndex = members.findIndex(
    (member: {username: string}) => member.username === username,
  );
  if (memberIndex !== -1) {
    members[memberIndex] = {
      ...members[memberIndex],
      isReady:
        updates.isReady !== undefined
          ? updates.isReady
          : members[memberIndex].isReady,
      message:
        updates.message !== undefined
          ? updates.message
          : members[memberIndex].message,
    };
    await lobbyRef.update({members});
  } else {
    console.error(`Cannot find member ${username} in lobby ${lobbyCode}`);
  }
};

export const getReadyList = async (lobbyCode: string) => {
  const lobbyRef = firestore().collection('lobbies').doc(lobbyCode);

  const lobbyDoc = await lobbyRef.get();
  if (lobbyDoc.exists) {
    const lobbyData = lobbyDoc.data();
    return lobbyData?.members.map(
      (member: {username: string; isReady: boolean}) => ({
        username: member.username,
        isReady: member.isReady,
      }),
    ) as {username: string; isReady: boolean}[];
  } else {
    return [];
  }
};

export const getTime = async (lobbyCode: string) => {
  const lobbyRef = firestore().collection('lobbies').doc(lobbyCode);

  const lobbyDoc = await lobbyRef.get();
  if (lobbyDoc.exists) {
    const lobbyData = lobbyDoc.data();
    return lobbyData?.lobbyTime as number;
  } else {
    throw new Error(`Lobby ${lobbyCode} does not exist`);
  }
};

export const incrementMessageVotes = async (
  lobbyCode: string,
  message: string,
) => {
  const lobbyRef = firestore().collection('lobbies').doc(lobbyCode);

  try {
    // Find the member that posted the message
    const lobbyDoc = await lobbyRef.get();
    const lobbyData = lobbyDoc.data();
    const member = lobbyData?.members.find(
      (member: {username: string}) => member.username === userdata.username,
    );

    if (member) {
      // Find the message and increment its votes
      const messages = lobbyData?.members.map(
        (member: {username: string; messageVotes: number; message: string}) => {
          if (member.message === message) {
            return {
              ...member,
              messageVotes: member.messageVotes + 1,
            };
          }
          return member;
        },
      );

      // Update the lobby with the new messages array
      await lobbyRef.update({members: messages});
    }
  } catch (error) {
    console.log('Error:', error);
  }
};

export const getAllMessages = async (lobbyCode: string): Promise<string[]> => {
  const lobbyRef = firestore().collection('lobbies').doc(lobbyCode);

  const lobbyDoc = await lobbyRef.get();
  if (lobbyDoc.exists) {
    const lobbyData = lobbyDoc.data();
    const members = lobbyData?.members as {
      username: string;
      message: string;
    }[];
    return members.map(member => member.message);
  } else {
    return [];
  }
};
