import AsyncStorage from '@react-native-async-storage/async-storage';

const { ToastAndroid } = require("react-native");
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { startUrl } from '../Context/ContentContext';
const LocalDeleteAllChat = async (clearMessages) => {
    try {
      await AsyncStorage.removeItem('messages');
      clearMessages();

      // Show a success toast on Android
      ToastAndroid.show('All chat messages removed from this device only', ToastAndroid.SHORT);
    } catch (error) {
      console.log('Error deleting messages from AsyncStorage:', error);
    }
  };
const DbAndLocalDeleteAllChat = async (clearMessages) => {
    try {
      await AsyncStorage.removeItem('messages');
      clearMessages();
      let url = `${startUrl}/api/myApp/api/ttg/getAiResponse/delete/allChatsByUserId`;
      // Retrieve the token from SecureStore
      let token = await SecureStore.getItemAsync('authToken');
      // Set the Authorization header for the request
      const response = await axios.post(
        url,
        {  },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );
      let myRes = response.data;
      if (myRes.variant === 'success') {
        ToastAndroid.show('All chat messages deleted successfully', ToastAndroid.SHORT);
      }
      // Show a success toast on Android
    } catch (error) {
      console.log('Error deleting messages from AsyncStorage:', error);
    }
  };
const DbAndLocalDeleteOneChatId = async (removeFullOneChatId,chatId) => {
    try {
      removeFullOneChatId(chatId);
      let url = `${startUrl}/api/myApp/api/ttg/getAiResponse/delete/deleteChatId`;
      // Retrieve the token from SecureStore
      let token = await SecureStore.getItemAsync('authToken');
      // Set the Authorization header for the request
      const response = await axios.post(
        url,
        { chatId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );
      let myRes = response.data;
      if (myRes.variant === 'success') {
        ToastAndroid.show('One Chat Deleted', ToastAndroid.SHORT);
      }
      // Show a success toast on Android
      
    } catch (error) {
      console.log('Error deleting messages from AsyncStorage:', error);
    }
  };

  module.exports = {LocalDeleteAllChat,DbAndLocalDeleteAllChat,DbAndLocalDeleteOneChatId}