import {GestureResponderEvent, Image} from 'react-native';
import React from 'react';
import {Button} from 'native-base';

type Props = {
  onPress: any;
  image: any;
  height: any;
  width: any;
  isDark: boolean;
};

export function ImageButton(props: Props) {
  return (
    <Button
      style={{backgroundColor: props.isDark ? '#434343' : '#605A58'}}
      onPress={props.onPress}>
      <Image
        style={{height: props.height, width: props.width}}
        source={props.image}
      />
    </Button>
  );
}
