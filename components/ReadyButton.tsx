import React, {useState} from 'react';
import {Button, Text} from 'native-base';
import {StyleSheet} from 'react-native';
import {TextStroke} from './StyledButton';
import {createGameLobbyID} from '../Screens/CreateGame/CreateGame';
import {userdata} from '../Utils/LocalDataManager';
import { updateLobbyMember } from "../Utils/RemoteDataManager";

type Props = {
  onChange: (
    lobbyCode: string,
    username: string,
    updates: {
      isReady?: boolean;
      message?: string;
    },
  ) => void;
  message: string;
};

export function ReadyButton(props: Props) {
  const [isReady, setIsReady] = useState(false);
  return (
    <Button
      style={[styles.root, {backgroundColor: isReady ? '#FF0F00' : '#2AC230'}]}
      onPress={() => {
        setIsReady(!isReady);
        updateLobbyMember(createGameLobbyID, userdata.username, {
          isReady: !isReady,
          message: props.message,
        })
          .then(() => {
            console.log('Lobby member updated successfully.');
          })
          .catch(error => {
            console.log('Error updating lobby member:', error);
          });

        console.log(!isReady);
      }}>
      <TextStroke stroke={1} color={'#000000'}>
        <Text style={styles.buttonText}>{isReady ? 'UNREADY' : 'READY'}</Text>
      </TextStroke>
    </Button>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 64,
    borderWidth: 3,
    borderColor: '#00000',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 10,
  },
  buttonText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 25,
    fontWeight: '700',
  },
});
