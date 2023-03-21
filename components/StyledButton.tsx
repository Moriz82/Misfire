import React from 'react';
import {Button, Text} from 'native-base';
import {GestureResponderEvent, StyleSheet} from 'react-native';

type Props = {
  buttonText: string;
  onPress: (event: GestureResponderEvent) => void;
};

export function StyledButton(props: Props) {
  return (
    <Button style={styles.root} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.buttonText}</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#005B04',
    borderRadius: 8,
    height: 56,
  },
  buttonText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 15,
    fontWeight: '700',
  },
});
