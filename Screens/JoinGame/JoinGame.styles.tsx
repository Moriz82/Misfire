import {StyleSheet} from 'react-native';

const homeScreenStyles = StyleSheet.create({
  headerText: {
    fontSize: 30,
    paddingTop: 50,
    textAlign: 'left',
    fontFamily: 'Fredoka One',
  },
  emailTextInput: {
    paddingTop: 30,
  },
  passwordTextInput: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  forgotPasswordText: {
    paddingBottom: 30,
  },
  registerNowText: {
    paddingTop: 30,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default homeScreenStyles;