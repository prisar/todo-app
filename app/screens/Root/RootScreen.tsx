import React, {useState} from 'react';
import HomeScreen from '../Home/HomeScreen';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import friendsReducer from '../../reducers/FriendsReducer';

const store = createStore(friendsReducer);

const RootScreen = () => {
  return (
    <>
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    </>
  );
};

export default RootScreen;
