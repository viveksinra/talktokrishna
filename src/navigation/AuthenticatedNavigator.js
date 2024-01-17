// AuthenticatedNavigator.js
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OneChatScreen from '../screens/OneChatScreen';
import ChatHistoryScreen from '../screens/ChatHistoryScreen';
import MainTabNavigator from './MainTabNavigator';
import NotImplementedScreen from '../screens/NotImplementedScreen';
import { useTranslation } from 'react-i18next';
import ProfileScreen from '../screens/ProfileScreen';
import { TouchableOpacity } from 'react-native';
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
            <TouchableOpacity onPress={() => checkAndUpdateChatHistory(messages,clearMessages,replaceMessagesInAsyncStorageAndContext)}>
              {/* Make sure to pass dispatch and state as arguments */}
              <Ionicons name="refresh" size={24} color="black" />
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
