import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'native-base';
import {StyledButton, TextStroke} from '../../components/StyledButton';
import {ImageButton} from '../../components/ImageButton';
import homeScreenStyles from '../HomeScreen/HomeScreen.styles';
import {isNotGameCreator} from '../HomeScreen/HomeScreen';
import {setAvatarID, userdata} from '../../Utils/LocalDataManager';

export const avatarImages = [
  require('../../assets/images/avatar0.png'),
  require('../../assets/images/avatar1.png'),
  require('../../assets/images/avatar2.png'),
  require('../../assets/images/avatar3.png'),
  require('../../assets/images/avatar4.png'),
  require('../../assets/images/avatar5.png'),
  require('../../assets/images/avatar6.png'),
  require('../../assets/images/avatar7.png'),
  require('../../assets/images/avatar8.png'),
  require('../../assets/images/Secret.png'),
];

const AvatarScreen = (props: {navigation: any}) => {
  const [avatarID, setLAvatarID] = useState(userdata.avatarID);
  let clickCount = 0;

  //say f you to the errors and warnings
  console.warn = function () {};
  console.error = function () {};

  return (
    <>
      <View
        style={{
          width: '100%',
          height: '13%',
          backgroundColor: '#434343',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          flexDirection: 'row',
          alignContent: 'space-between',
        }}>
        <ImageButton
          image={require('../../assets/images/backButton.png')}
          onPress={() => props.navigation.navigate('HomeScreen')}
          height={50}
          width={50}
          isDark={true}
        />

        <View
          style={{
            alignItems: 'center',
            flex: 1,
            paddingRight: 78,
            paddingBottom: 15,
            paddingTop: 52,
            paddingLeft: 30
          }}>
          <TextStroke stroke={3} color={'#000000'}>
            <Text style={{padding: 5, width: '100%'}}>Avatar Selection</Text>
          </TextStroke>
        </View>
      </View>

      <View
        style={{
          height: '30%',
          backgroundColor: '#605A58',
          paddingTop: 0,
          alignItems: 'center',
        }}>
        {/*<Image
          key={avatarID}
          style={{height: 160, width: 160}}
          source={avatarImages[avatarID]}
          alt={'err'}
        />*/}
        <ImageButton
          onPress={() => {
            clickCount++;
            if (clickCount >= 1) {
              setLAvatarID(9);
              clickCount = 0;
            }
          }}
          image={avatarImages[avatarID]}
          height={160}
          width={160}
          isDark={false}
          key={avatarID}
          isCircle={true}
        />
      </View>

      <View style={styles.gridContainer}>
        {avatarImages.slice(0, -1).map((_, index) => (
          <View style={styles.gridCell} key={index}>
            <ImageButton
              onPress={() => setLAvatarID(index)}
              image={avatarImages[index]}
              height={70}
              width={70}
              isDark={false}
              isCircle={true}
              key={index}
            />
          </View>
        ))}
      </View>

      <View
        style={{
          backgroundColor: '#605A58',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: 8,
          paddingBottom: 60
        }}>
        <View style={homeScreenStyles.emailTextInput}>
          <StyledButton
            onPress={() => {
              setAvatarID(avatarID).then(() =>
                console.log(`avatar id set to: ${avatarID}`),
              );
              props.navigation.navigate(
                isNotGameCreator ? 'JoinGame' : 'CreateGame',
              );
            }}
            buttonText={'Continue'}
            buttonColor={true}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#c7c7c7',
  },
  gridCell: {
    flexBasis: '33.333%',
    height: 100,
    borderWidth: 5,
    borderColor: '#3d3d3d',
  },
});

/*<StyledButton
  onPress={() => props.navigation.navigate('SignUp')}
  buttonText={'Sign Up'}
/>*/

export default AvatarScreen;
