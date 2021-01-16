import React from 'react';
import AppNavigator from '../../navigation/AppNavigator';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {rootReducer} from '../../store/rootReducer';

const store = createStore(rootReducer);

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
