import {Image} from 'react-native';
import React, {useState} from 'react';
import {Button, Text, View} from 'native-base';
import {TextStroke} from './StyledButton';

type Props = {
  height: any;
  width: any;
  image1: any;
  image2: any;
  isDark: boolean;
  displayText: string;
  initState: boolean;
  onChange: (isChecked: boolean) => void;
};

export function CustomCheckBox(props: Props) {
  const [isChecked, setIsChecked] = useState(props.initState);

  const handlePress = () => {
    const newCheckedValue = !isChecked;
    setIsChecked(newCheckedValue);
    props.onChange(newCheckedValue);
  };

  return (
    <Button
      style={{backgroundColor: props.isDark ? '#434343' : '#605A58'}}
      onPress={handlePress}>
      <View
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            height: props.height,
            width: props.width,
            borderWidth: 5,
            borderColor: 'black',
            borderRadius: 5,
          }}
          source={isChecked ? props.image1 : props.image2}
        />
        <View style={{paddingLeft: 10}}>
          <TextStroke stroke={3} color={'#000000'}>
            <Text style={{padding: 3}}>{props.displayText}</Text>
          </TextStroke>
        </View>
      </View>
    </Button>
  );
}
