import React from 'react';
import {View, Text, StyleSheet, GestureResponderEvent} from 'react-native';

type Props = {
  displayText: string;
  onPress: (event: GestureResponderEvent) => void;
};

export function CustomLinkedText(props: Props) {
  return (
    <View>
      <Text style={styles.linkedtext} onPress={props.onPress}>
        {props.displayText}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'rgb(255, 255, 255)',
  },
  linkedtext: {
    color: 'rgb(106, 112, 124)',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
  },
});
