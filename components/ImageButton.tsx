import {GestureResponderEvent, Image} from 'react-native';
import React from 'react';
import {Button} from 'native-base';

type Props = {
  onPress: (event: GestureResponderEvent) => void;
  image: any;
  height: number;
  width: number;
};

export function ImageButton(props: Props) {
  return (
    <Button style={{backgroundColor: '#605A58'}} onPress={props.onPress}>
      <Image
        style={{height: props.height, width: props.width}}
        source={props.image}
      />
    </Button>
  );
}
