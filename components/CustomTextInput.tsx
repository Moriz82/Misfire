import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
/*import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';*/

type Props = {
  placeholderText: string;
  value: string | undefined;
  onChangeText: any;
  iconName: string;
  isPassword: boolean;
};

export function CustomTextInput(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      {/*<MaterialCommunityIcons
        name={props.iconName}
        color="gray"
        size={25}
        style={{paddingRight: 5}}
      />*/}
      <TextInput
        style={{
          flex: 1,
          height: 50,
          fontFamily: 'Fredoka One',
          color: 'black',
        }}
        placeholder={props.placeholderText}
        defaultValue={props.value}
        onChangeText={props.onChangeText}
        placeholderTextColor={'gray'}
        secureTextEntry={isPasswordSecure && props.isPassword}
        keyboardType={props.isPassword ? 'default' : 'email-address'}
        autoCapitalize={'none'}
      />
      {/*{props.isPassword ? (
        <MaterialCommunityIcons
          name={isPasswordSecure ? 'eye-off' : 'eye'}
          size={28}
          color="gray"
          onPress={() => {
            isPasswordSecure
              ? setIsPasswordSecure(false)
              : setIsPasswordSecure(true);
          }}
        />
      ) : null}*/}
    </View>
  );
}

// <MaterialCommunityIcons style={styles.root} name="email" color="black" size={25} />
const styles = StyleSheet.create({
  root: {
    backgroundColor: '#F7F8F9',
    borderRadius: 8,
    boxSizing: 'border-box',
  },
  placeholderText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 15,
    fontWeight: '700',
  },
});
