import { ADD_FRIEND } from '../constants';

export const addFriend = (friendsIndex: number) => (
    {
      type: 'ADD_FRIEND',
      payload: friendsIndex,
    }
  );