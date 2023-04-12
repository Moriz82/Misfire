import AsyncStorage from '@react-native-async-storage/async-storage';

export var userdata = {
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

export const fetchData = async () => {
  let data = await getJSONData('userdata');
  if (data != null) {
    userdata = data;
    console.log(`loaded userdata: ${data.username}, ${data.avatarID}`);
  } else {
    console.log('no userdata found');
  }
};
