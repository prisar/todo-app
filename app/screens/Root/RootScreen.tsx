import React from 'react';
import AppNavigator from '../../navigation/AppNavigator';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import friendsReducer from '../../reducers/FriendsReducer';

const store = createStore(friendsReducer);

const RootScreen = () => {
  return (
    <>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </>
  );
};

export default RootScreen;
