import AsyncStorage from '@react-native-async-storage/async-storage';

var userdata = {
  username: '',
  avatarID: 0,
};

export const setUsername = async (username: string) => {
  userdata.username = username;
  await storeJSONData('userdata', userdata);
};

export const setAvatarID = async (id: number) => {
  userdata.avatarID = id;
  await storeJSONData('userdata', userdata);
};

const storeJSONData = async (
  key: string,
  value: {username: string; avatarID: number},
) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`@${key}`, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getJSONData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`@${key}`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};
