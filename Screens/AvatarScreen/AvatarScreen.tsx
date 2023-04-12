import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Image} from 'native-base';
import {StyledButton, TextStroke} from '../../components/StyledButton';
import {ImageButton} from '../../components/ImageButton';
import homeScreenStyles from '../HomeScreen/HomeScreen.styles';
import {buttonSelected} from '../HomeScreen/HomeScreen';
import {setAvatarID} from '../../Utils/LocalDataManager';

const HomeScreen = (props: {navigation: any}) => {
  const [avatarID, setLAvatarID] = useState(0);
  let clickCount = 0;
  const avatarImages = [
    require('../../assets/images/avatar0.png'),
    require('../../assets/images/avatar1.png'),
    require('../../assets/images/avatar2.png'),
    require('../../assets/images/avatar3.png'),
    require('../../assets/images/avatar4.png'),
    require('../../assets/images/avatar5.png'),
    require('../../assets/images/avatar6.png'),
    require('../../assets/images/avatar7.png'),
    require('../../assets/images/avatar8.png'),
    require('../../assets/images/secret.png'),
  ];

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
          }}>
          <TextStroke stroke={3} color={'#000000'}>
            <Text style={homeScreenStyles.buttonText}>Avatar Selection</Text>
          </TextStroke>
        </View>
      </View>

      <View
        style={{
          height: '30%',
          backgroundColor: '#605A58',
          paddingTop: 10,
          alignItems: 'center',
        }}>
        <Image
          key={avatarID}
          style={{height: 160, width: 160}}
          source={avatarImages[avatarID]}
          alt={'err'}
        />
        <ImageButton
          onPress={() => {
            clickCount++;
            if (clickCount >= 100) {
              setLAvatarID(9);
              clickCount = 0;
            }
          }}
          image={avatarImages[avatarID]}
          height={160}
          width={160}
          isDark={false}
        />
      </View>

      <View style={styles.gridContainer}>
        <View style={styles.gridCell}>
          <ImageButton
            onPress={() => setLAvatarID(0)}
            image={require('../../assets/images/avatar0.png')}
            height={50}
            width={50}
            isDark={false}
          />
        </View>
        <View style={styles.gridCell}>
          <ImageButton
            onPress={() => setLAvatarID(1)}
            image={require('../../assets/images/avatar1.png')}
            height={50}
            width={50}
            isDark={false}
          />
        </View>
        <View style={styles.gridCell}>
          <ImageButton
            onPress={() => setLAvatarID(2)}
            image={require('../../assets/images/avatar2.png')}
            height={50}
            width={50}
            isDark={false}
          />
        </View>
        <View style={styles.gridCell}>
          <ImageButton
            onPress={() => setLAvatarID(3)}
            image={require('../../assets/images/avatar3.png')}
            height={50}
            width={50}
            isDark={false}
          />
        </View>
        <View style={styles.gridCell}>
          <ImageButton
            onPress={() => setLAvatarID(4)}
            image={require('../../assets/images/avatar4.png')}
            height={50}
            width={50}
            isDark={false}
          />
        </View>
        <View style={styles.gridCell}>
          <ImageButton
            onPress={() => setLAvatarID(5)}
            image={require('../../assets/images/avatar5.png')}
            height={50}
            width={50}
            isDark={false}
          />
        </View>
        <View style={styles.gridCell}>
          <ImageButton
            onPress={() => setLAvatarID(6)}
            image={require('../../assets/images/avatar6.png')}
            height={50}
            width={50}
            isDark={false}
          />
        </View>
        <View style={styles.gridCell}>
          <ImageButton
            onPress={() => setLAvatarID(7)}
            image={require('../../assets/images/avatar7.png')}
            height={50}
            width={50}
            isDark={false}
          />
        </View>
        <View style={styles.gridCell}>
          <ImageButton
            onPress={() => setLAvatarID(8)}
            image={require('../../assets/images/avatar8.png')}
            height={50}
            width={50}
            isDark={false}
          />
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#605A58',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: 8,
        }}>
        <View style={homeScreenStyles.emailTextInput}>
          <StyledButton
            onPress={() => {
              setAvatarID(avatarID).then(() =>
                console.log(`avatar id set to: ${avatarID}`),
              );
              props.navigation.navigate(
                buttonSelected ? 'JoinGame' : 'CreateGame',
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

export default HomeScreen;
