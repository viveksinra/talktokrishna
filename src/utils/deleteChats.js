import AsyncStorage from '@react-native-async-storage/async-storage';

const { ToastAndroid } = require("react-native");

const LocalDeleteAllChat = async (clearMessages) => {
    try {
      await AsyncStorage.removeItem('messages');
      clearMessages();

      // Show a success toast on Android
      ToastAndroid.show('All chat messages deleted successfully!', ToastAndroid.SHORT);
    } catch (error) {
      console.log('Error deleting messages from AsyncStorage:', error);
    }
  };
const DbAndLocalDeleteAllChat = async (clearMessages) => {
    try {
      await AsyncStorage.removeItem('messages');
      clearMessages();
 

      // Show a success toast on Android
      ToastAndroid.show('All chat messages deleted successfully!', ToastAndroid.SHORT);
    } catch (error) {
      console.log('Error deleting messages from AsyncStorage:', error);
    }
  };

  module.exports = {LocalDeleteAllChat,DbAndLocalDeleteAllChat}