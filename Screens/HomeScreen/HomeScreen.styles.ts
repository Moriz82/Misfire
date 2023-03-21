import {StyleSheet} from 'react-native';

const homeScreenStyles = StyleSheet.create({
  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: '#222222',
  },
  headerText: {
    fontSize: 30,
    paddingTop: 50,
    textAlign: 'left',
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
});

export default homeScreenStyles;
