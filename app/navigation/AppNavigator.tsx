import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from '../screens/Home/HomeScreen';
import AddTodoScreen from '../screens/AddTodo/AddTodoScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import DetailScreen from '../screens/Detail/DetailScreen';

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
            iconName = focused ? 'list' : 'list';
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
        tabBarButton: ['Detail'].includes(route.name)
          ? () => {
              return null;
            }
          : undefined,
      })}
      tabBarOptions={{
        activeTintColor: '#1654f0',
        inactiveTintColor: 'black',
      }}
      initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="AddTodo" component={AddTodoScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Detail" component={DetailScreen} />
    </Tab.Navigator>
  );
}

const AppNavigator = React.forwardRef(() => {
  return (
    <NavigationContainer
      // ref={navigationRef}
      // onReady={() =>
      //   (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      // }
      onStateChange={() => {}}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {/* <RootStack.Screen name="Splash" component={SplashScreen} /> */}
        <RootStack.Screen name="HomeTabs" component={HomeTabs} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
});

export default AppNavigator;
