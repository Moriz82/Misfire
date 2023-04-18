import {Image} from 'react-native';
import React from 'react';
import {Button} from 'native-base';
import CircleImage from './CircleImage';

type Props = {
  onPress: any;
  image: any;
  height: any;
  width: any;
  isDark: boolean;
  isCircle?: boolean;
};

export function ImageButton(props: Props) {
  return (
    <Button
      style={{backgroundColor: props.isDark ? '#434343' : '#605A58'}}
      onPress={props.onPress}>
      {getImage()}
    </Button>
  );

  function getImage() {
    if (props.isCircle) {
      return <CircleImage size={props.height} source={props.image} />;
    }
    return (
      <Image
        style={{height: props.height, width: props.width}}
        source={props.image}
      />
    );
  }
}
