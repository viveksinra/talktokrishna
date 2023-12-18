// AuthenticatedNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OneChatScreen from '../screens/OneChatScreen';
import ChatHistoryScreen from '../screens/ChatHistoryScreen';
import MainTabNavigator from './MainTabNavigator';
import NotImplementedScreen from '../screens/NotImplementedScreen';

const Stack = createNativeStackNavigator();

const AuthenticatedNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={MainTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="OneChats" component={OneChatScreen} />
      <Stack.Screen
        name="ChatHistoryScreen"
        component={ChatHistoryScreen}
        options={{ title: 'Your Chat History' }}
      />
      <Stack.Screen name="Contacts" component={NotImplementedScreen} />
    </Stack.Navigator>
  );
};

export default AuthenticatedNavigator;
