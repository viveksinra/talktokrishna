// AuthenticatedNavigator.js
import React, { useContext, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OneChatScreen from '../screens/OneChatScreen';
import ChatHistoryScreen from '../screens/ChatHistoryScreen';
import MainTabNavigator from './MainTabNavigator';
import NotImplementedScreen from '../screens/NotImplementedScreen';
import { useTranslation } from 'react-i18next';
import ProfileScreen from '../screens/ProfileScreen';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// Import the checkAndUpdateChatHistory function
import checkAndUpdateChatHistory from '../utils/checkAndUpdateChatHistory';
import { MessageContext } from '../components/Message/MessageProvider';

const Stack = createNativeStackNavigator();

const AuthenticatedNavigator = () => {
  const { t } = useTranslation();
  const { messages } = useContext(MessageContext);
  const { clearMessages } = useContext(MessageContext);
  const { replaceMessagesInAsyncStorageAndContext } = useContext(MessageContext);
  const [loading, setLoading] = useState(false);
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={MainTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="OneChats" component={OneChatScreen} />
      <Stack.Screen
        name="ChatHistoryScreen"
        component={ChatHistoryScreen}
        options={({ navigation }) => ({
          title: t('chatHis.one'),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                if (!loading) { // Check if loading is false
                  setLoading(true);
                  checkAndUpdateChatHistory(messages, clearMessages, replaceMessagesInAsyncStorageAndContext)
                    .finally(() => setLoading(false));
                }
              }}
              disabled={loading} // Disable touch if loading is true
            >
              {/* Conditionally render either the refresh icon or the loading spinner */}
              {loading ? (
                <ActivityIndicator size="small" color="black" />
              ) : (
                <Ionicons name="refresh" size={24} color="black" />
              )}
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Stack.Screen name="Contacts" component={NotImplementedScreen} />
    </Stack.Navigator>
  );
};

export default AuthenticatedNavigator;
