import React, {useState} from 'react';
import {Button, Text} from 'native-base';
import {StyleSheet} from 'react-native';
import {TextStroke} from './StyledButton';

type Props = {
  buttonText: string;
};

export function ReadyButton(props: Props) {
  const [isReady, setIsReady] = useState(false);
  return (
    <Button
      style={[styles.root, {backgroundColor: isReady ? '#2AC230' : '#FF0F00'}]}
      onPress={() => setIsReady(!isReady)}>
      <TextStroke stroke={3} color={'#000000'}>
        <Text style={styles.buttonText}>{isReady ? 'Ready' : 'UnReady'}</Text>
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
