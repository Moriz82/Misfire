import firestore from '@react-native-firebase/firestore';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';
import {userdata} from './LocalDataManager';
import {checkForProfanity} from './Util';
import {gameSettings} from './GameLogic';

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
      lobbyTime: 100,
      selectedMessage: '',
      selectedUser: '',
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
          hasVoted: false,
          hasNav: false,
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
): Promise<
  {
    username: string;
    avatarID: number;
    isReady: boolean;
    hasVoted: boolean;
    message: string;
    hasNav: boolean;
  }[]
> => {
  const lobbyRef = firestore().collection('lobbies').doc(lobbyCode);

  const lobbyDoc = await lobbyRef.get();
  if (lobbyDoc.exists) {
    const lobbyData = lobbyDoc.data();
    return lobbyData?.members as {
      username: string;
      avatarID: number;
      isReady: boolean;
      hasVoted: boolean;
      message: string;
      hasNav: boolean; // add new property
    }[];
  } else {
    return [];
  }
};

export const getSelectedUser = async (
  lobbyCode: string,
): Promise<{avatarID: any; username: any; msg: any}> => {
  const lobbyRef = firestore().collection('lobbies').doc(lobbyCode);
  const lobbyDoc = await lobbyRef.get();

  if (lobbyDoc.exists) {
    const lobbyData = lobbyDoc.data();
    const selectedUsername = lobbyData?.selectedUser;
    const selectedMessage = lobbyData?.selectedMessage;

    if (selectedUsername) {
      const selectedUser = lobbyData?.members.find(
        (member: {username: any}) => member.username === selectedUsername,
      );

      if (selectedUser) {
        return {
          username: selectedUser.username,
          avatarID: selectedUser.avatarID,
          msg: selectedMessage,
        };
      }
      else {
        console.log('no sleected user');
      }
    } else {
      console.log('no username var');
    }
  }else {
    console.log('no lobby?');
  }

  return {
    username: 'selectedUser.username',
    avatarID: 'selectedUser.avatarID',
    msg: 'test',
  };
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
      hasVoted: boolean;
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
    hasVoted?: boolean;
    message?: string;
  },
) => {
  if (checkForProfanity(updates.message!) && !gameSettings.allowProfanity) {
    updates.message = 'im in love with you';
  }

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
      hasVoted:
        updates.hasVoted !== undefined
          ? updates.hasVoted
          : members[memberIndex].hasVoted,
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
      (member: {username: string; isReady: boolean; hasVoted: boolean}) => ({
        username: member.username,
        isReady: member.isReady,
        hasVoted: member.hasVoted,
      }),
    ) as {username: string; isReady: boolean; hasVoted: boolean}[];
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
  decrement: boolean,
) => {
  const lobbyRef = firestore().collection('lobbies').doc(lobbyCode);

  try {
    // Find the member that posted the message
    const lobbyDoc = await lobbyRef.get();
    const lobbyData = lobbyDoc.data();
    const member = lobbyData?.members.find(
      // eslint-disable-next-line @typescript-eslint/no-shadow
      (member: {username: string}) => member.username === userdata.username,
    );

    if (member) {
      // Find the message and increment its votes
      const messages = lobbyData?.members.map(
        // eslint-disable-next-line @typescript-eslint/no-shadow
        (member: {username: string; messageVotes: number; message: string}) => {
          if (member.message === message) {
            return {
              ...member,
              messageVotes: decrement
                ? member.messageVotes - 1
                : member.messageVotes + 1,
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

export const setMemberNav = async (
  lobbyCode: string,
  username: string,
  isNav: boolean,
) => {
  const lobbyRef = firestore().collection('lobbies').doc(lobbyCode);

  try {
    const lobbyDoc = await lobbyRef.get();
    if (lobbyDoc.exists) {
      const lobbyData = lobbyDoc.data();
      const updatedMembers = lobbyData?.members.map((member: any) => {
        if (member.username === username) {
          return {
            ...member,
            hasNav: isNav,
          };
        }
        return member;
      });
      await lobbyRef.update({
        members: updatedMembers,
      });
    } else {
      throw new Error(`Lobby ${lobbyCode} does not exist`);
    }
  } catch (error) {
    console.log('Error:', error);
  }
};

export const setSelectedUser = async (lobbyCode: string, username: string) => {
  const lobbyRef = firestore().collection('lobbies').doc(lobbyCode);

  try {
    await lobbyRef.update({
      selectedUser: username,
    });
  } catch (error) {
    console.log('Error:', error);
  }
};

export const setSelectedMessage = async (lobbyCode: string) => {
  const lobbyRef = firestore().collection('lobbies').doc(lobbyCode);

  // Get the lobby document to access the member messages and votes
  const lobbyDoc = await lobbyRef.get();

  if (lobbyDoc.exists) {
    const lobbyData = lobbyDoc.data();
    const rIndex = Math.floor(Math.random() * lobbyData?.members.length);
    const selUser = lobbyData?.members[rIndex].username;

    // Create an array with the messages and their votes
    // @ts-ignore
    const messagesWithVotes = lobbyData.members.map(
      (member: {username: any; message: string; messageVotes: number}) => ({
        message: member.message,
        votes: member.messageVotes,
      }),
    );

    // Sort the array by the number of votes
    messagesWithVotes.sort(
      (a: {votes: number}, b: {votes: number}) => b.votes - a.votes,
    );

    // Check if there is a tie for the most voted message
    const maxVotes = messagesWithVotes[0].votes;
    const mostVotedMessages = messagesWithVotes.filter(
      (message: {votes: any}) => message.votes === maxVotes,
    );

    // If there is no tie, select the most voted message
    if (mostVotedMessages.length === 1) {
      await lobbyRef.update({
        selectedMessage: mostVotedMessages[0].message,
        selectedUser: selUser,
      });
    } else {
      // If there is a tie, select one at random
      const randomIndex = Math.floor(Math.random() * mostVotedMessages.length);
      await lobbyRef.update({
        selectedMessage: mostVotedMessages[randomIndex].message,
        selectedUser: selUser,
      });
    }
  } else {
    throw new Error(`Lobby ${lobbyCode} does not exist`);
  }
};
