import React from 'react';
<<<<<<< HEAD
import {Avatar, Button} from 'native-base';
=======
import {Button} from 'native-base';
import CircleImage from './CircleImage';
>>>>>>> fe065ca3a3d28abb417b3b242e4a260df628818d

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
<<<<<<< HEAD
      {/* <Image
        style={{height: props.height, width: props.width}}
        source={props.image}
        key={props.key}
      /> */}
      <Avatar source={props.image} size='2xl'></Avatar>
    </Button>
  );
=======
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
>>>>>>> fe065ca3a3d28abb417b3b242e4a260df628818d
}
