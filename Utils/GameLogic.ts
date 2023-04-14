import {remoteStartGame} from './RemoteDataManager';

export const startGame = async (lobbyCode: string) => {
  await remoteStartGame(lobbyCode);
};
