/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../app/App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// handle native driver warning
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.useFakeTimers();

it('renders correctly', () => {
  renderer.create(<App />);
});
