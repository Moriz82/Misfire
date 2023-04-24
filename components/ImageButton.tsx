import {Button} from 'native-base';
import CircleImage from './CircleImage';
import {Image} from 'react-native';

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
      style={{backgroundColor: props.isDark ? 'rgba(52, 52, 52, 0.0)' : 'rgba(52, 52, 52, 0.0)'}}
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
        style={{height: props.height, width: props.width, opacity: 1}}
        source={props.image}
      />
    );
  }
}
