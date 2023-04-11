var userdata = {
  username : '',
  avatarID: 0
}

export const setUsername = (username:string) => {
  userdata.username = username;
}

export const setAvatarID = (id:number) => {
  userdata.avatarID = id;
}
