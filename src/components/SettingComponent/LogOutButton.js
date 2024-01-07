import React, { useState, useContext } from 'react';
import { TouchableOpacity, View, Text, ToastAndroid,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { MessageContext } from './../../../src/components/Message/MessageProvider';
import { useTranslation } from 'react-i18next';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../../context/appContext';

const LogOutButton = () => {
  const { t } = useTranslation();
  const { clearMessages } = useContext(MessageContext);
  const navigation = useNavigation();
  const { setIsSignedIn } = useContext(AppContext);

  const handleLogout = async () => {

    try {
        Alert.alert(
            t('logout.two'),
            t('logout.three'),
            [
              {
                text: t('logout.four'),
                style: 'cancel',
              },
              {
                text: t("logout.one"),
                onPress: async() => {
                    await SecureStore.deleteItemAsync('authToken');
                    handleDeleteAllChat();
                    setIsSignedIn(false);

                },
                style: 'destructive',
              },
            ],
            { cancelable: true }
          );
   
    } catch (error) {
      console.log('Error Getting Logout', error);
    }
  };

  const handleDeleteAllChat = async () => {
    try {
      await AsyncStorage.removeItem('messages');
      clearMessages();

      // Show a success toast on Android
      ToastAndroid.show('All chat messages deleted successfully!', ToastAndroid.SHORT);
    } catch (error) {
      console.log('Error deleting messages from AsyncStorage:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <View style={styles.buttonContent}>
        <View style={styles.buttonIconContainer}>
          <Ionicons name="trash-outline" size={24} color="red" />
        </View>
        <Text style={styles.buttonText}>{t("logout.one")}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LogOutButton;

const styles = {
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "red",
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIconContainer: {
    marginRight: 15,
  },
  buttonText: {
    fontSize: 18,
    color: 'red',
  },
};
