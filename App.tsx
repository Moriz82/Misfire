import React, {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';
import {extendTheme, NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen/HomeScreen';

export default function App(): JSX.Element {
  let dataFetched = false;
  const appState = useRef(AppState.currentState);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

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

  // const colorTheme = {
  //   brand: {
  //     backgroundGray: '#222222',
  //     cricketGreen: '#005B04',
  //   },
  // };

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
          {/*<Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false, title: ''}}
          />
          <Stack.Screen
            name="TeamSelection"
            component={TeamSelection}
            options={{headerShown: false, title: ''}}
          />*/}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
