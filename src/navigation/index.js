// Navigator.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthenticatedNavigator from './AuthenticatedNavigator';
import MobileLoginScreen from '../authentication/authScreen/mobileLoginScreen';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check the authentication status and update the state accordingly
    // You may use AsyncStorage, context, or any other method for authentication check
    // For demonstration purposes, let's assume isAuthenticated is set to true when the user is authenticated.
    // Replace the following line with your actual authentication check.
    setIsAuthenticated(false);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen
            name="Authenticated"
            component={AuthenticatedNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Home"
            component={MobileLoginScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
