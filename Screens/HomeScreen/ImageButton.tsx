import {GestureResponderEvent, Image} from 'react-native';
import React from 'react';
import {Button} from 'native-base';

type Props = {
  onPress: (event: GestureResponderEvent) => void;
  image: any;
};

export function ImageButton(props: Props) {
  return (
    <Button style={{backgroundColor: '#605A58'}} onPress={props.onPress}>
      <Image style={{height: 100, width: 100}} source={props.image} />
    </Button>
  );
}
