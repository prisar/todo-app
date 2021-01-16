import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from '../screens/Home/HomeScreen';
import AddTodoScreen from '../screens/AddTodo/AddTodoScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarLabel: ({focused}) => {
          const routeName = route.name;
          return null; // remove tab names, translaton not working
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName: any;
          let iconSize;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'AddTodo') {
            iconName = focused ? 'plus-circle' : 'plus-circle';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user';
          }

          if (route.name === 'AddTodo') {
            iconSize = 52;
          } else {
            iconSize = size;
          }

          return <Icon name={iconName} size={iconSize} color={color} />;
        },
        tabBarButton: ['Login'].includes(route.name)
          ? () => {
              return null;
            }
          : undefined,
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      }}
      initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="AddTodo" component={AddTodoScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const AppNavigator = React.forwardRef(() => {
  // const routeNameRef = React.useRef();
  // const navigationRef = React.useRef();

  // const [state, dispatch] = React.useReducer(
  //   (prevState, action) => {
  //     switch (action.type) {
  //       case 'RESTORE_TOKEN':
  //         return {
  //           ...prevState,
  //           userToken: action.token,
  //           isLoading: false,
  //         };
  //       case 'SIGN_IN':
  //         return {
  //           ...prevState,
  //           isSignout: false,
  //           userToken: action.token,
  //         };
  //       case 'SIGN_OUT':
  //         return {
  //           ...prevState,
  //           isSignout: true,
  //           userToken: null,
  //         };
  //     }
  //   },
  //   {
  //     isLoading: true,
  //     isSignout: false,
  //     userToken: null,
  //   },
  // );

  // React.useEffect(() => {
  //   // Fetch the token from storage then navigate to our appropriate place
  //   const bootstrapAsync = async () => {
  //     let userToken;

  //     try {
  //       userToken = await AsyncStorage.getItem('userToken');
  //     } catch (e) {
  //       // Restoring token failed
  //     }

  //     // After restoring token, we may need to validate it in production apps

  //     // This will switch to the App screen or Auth screen and this loading
  //     // screen will be unmounted and thrown away.
  //     dispatch({type: 'RESTORE_TOKEN', token: userToken});
  //   };

  //   bootstrapAsync();
  // }, []);

  // const authContext = React.useMemo(
  //   () => ({
  //     signIn: async (data) => {
  //       // In a production app, we need to send some data (usually username, password) to server and get a token
  //       // We will also need to handle errors if sign in failed
  //       // After getting token, we need to persist the token using `AsyncStorage`
  //       // In the example, we'll use a dummy token

  //       // await AsyncStorage.setItem('userToken', data.token);
  //       console.log('sigin context');

  //       dispatch({type: 'SIGN_IN', token: 'b3ScJaP67wX2WxJ0p6K9vacHbQh2n'});
  //     },
  //     signOut: () => dispatch({type: 'SIGN_OUT'}),
  //     signUp: async (data) => {
  //       // In a production app, we need to send user data to server and get a token
  //       // We will also need to handle errors if sign up failed
  //       // After getting token, we need to persist the token using `AsyncStorage`
  //       // In the example, we'll use a dummy token

  //       dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
  //     },
  //   }),
  //   [],
  // );

  return (
    <NavigationContainer
      // ref={navigationRef}
      // onReady={() =>
      //   (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      // }
      onStateChange={() => {
      }}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {/* <RootStack.Screen name="Splash" component={SplashScreen} />
                <RootStack.Screen
                  name="Onboarding"
                  component={OnboardingScreen}
                /> */}
        <RootStack.Screen name="HomeTabs" component={HomeTabs} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
});

export default AppNavigator;
