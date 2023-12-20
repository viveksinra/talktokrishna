// PublicNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OneChatScreen from '../screens/OneChatScreen';
import ChatHistoryScreen from '../screens/ChatHistoryScreen';
import MainTabNavigator from './MainTabNavigator';
import NotImplementedScreen from '../screens/NotImplementedScreen';
import MobileLoginScreen from '../authentication/authScreen/mobileLoginScreen';

const Stack = createNativeStackNavigator();

const PublicNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LogIn" component={MobileLoginScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default PublicNavigator;
