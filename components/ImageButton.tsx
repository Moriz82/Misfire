import React from 'react';
import {Avatar, Button} from 'native-base';

type Props = {
  onPress: any;
  image: any;
  height: any;
  width: any;
  isDark: boolean;
  key?: any;
};

export function ImageButton(props: Props) {
  return (
    <Button
      style={{backgroundColor: props.isDark ? '#434343' : '#605A58'}}
      onPress={props.onPress}>
      {/* <Image
        style={{height: props.height, width: props.width}}
        source={props.image}
        key={props.key}
      /> */}
      <Avatar source={props.image} size='2xl'></Avatar>
    </Button>
  );
}
