import React, {useState} from 'react';
import {TextInput, View} from 'react-native';

type Props = {
  placeholderText: string;
  value?: string; // Make value prop optional
  onChangeText: any;
  iconName: string;
  isPassword: boolean;
};

export function CustomTextInput(props: Props) {
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  return (
    <View
      style={{
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <TextInput
        style={{
          flex: 1,
          marginLeft: 10,
          height: 50,
          fontFamily: 'Fredoka One',
          color: 'black',
        }}
        placeholder={props.placeholderText}
        defaultValue={props.value} // Set the default value here
        onChangeText={props.onChangeText}
        placeholderTextColor={'gray'}
        secureTextEntry={isPasswordSecure && props.isPassword}
        keyboardType={props.isPassword ? 'default' : 'email-address'}
        autoCapitalize={'none'}
      />
    </View>
  );
}
