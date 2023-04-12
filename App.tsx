import React, {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';
import {extendTheme, NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import JoinGame from './Screens/JoinGame/JoinGame';
import CreateGame from './Screens/CreateGame/CreateGame';
import SettingsScreen from './Screens/SettingsScreen/SettingsScreen';
import SecretScreen from './Screens/SecretScreen/SecretScreen';
import YouAreItScreen from './Screens/YouAreItScreen/YouAreItScreen';
import ChatScreen from './Screens/ChatScreen/ChatScreen';
import GameSettingScreen from './Screens/GameSettingsScreen/GameSettingsScreen';
import AvatarScreen from './Screens/AvatarScreen/AvatarScreen';
import {fetchData} from './Utils/LocalDataManager';

export default function App(): JSX.Element | null {
  let dataFetched = false;
  const appState = useRef(AppState.currentState);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  fetchData().then(() => console.log());

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      async nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          if (!dataFetched) {
            //await fetchData();
            // eslint-disable-next-line react-hooks/exhaustive-deps
            dataFetched = true;
          } else {
            //await storeData();
          }
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        if (!dataFetched) {
          //await fetchData();
          dataFetched = true;
        } else {
          //await storeData();
        }
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const Stack = createNativeStackNavigator();

  const theme = extendTheme({
    components: {
      Text: {
        baseStyle: {
          fontFamily: 'Fredoka One',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: 30,
          lineHeight: 36,
          color: 'white',
        },
      },
      Button: {
        baseStyle: {
          backgroundColor: '#005B04',
          borderRadius: 8,
        },
      },
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{headerShown: false, title: ''}}
          />
          <Stack.Screen
            name="JoinGame"
            component={JoinGame}
            options={{headerShown: false, title: ''}}
          />
          <Stack.Screen
            name="CreateGame"
            component={CreateGame}
            options={{headerShown: false, title: ''}}
          />
          <Stack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{headerShown: false, title: ''}}
          />
          <Stack.Screen
            name="GameSettingsScreen"
            component={GameSettingScreen}
            options={{headerShown: false, title: ''}}
          />
          <Stack.Screen
            name="SecretScreen"
            component={SecretScreen}
            options={{headerShown: false, title: ''}}
          />
          <Stack.Screen
            name="YouAreItScreen"
            component={YouAreItScreen}
            options={{headerShown: false, title: ''}}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{headerShown: false, title: ''}}
          />
          <Stack.Screen
            name="AvatarScreen"
            component={AvatarScreen}
            options={{headerShown: false, title: ''}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
