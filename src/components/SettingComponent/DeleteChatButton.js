import React, { useState, useContext } from 'react';
import { TouchableOpacity, View, Text, Modal, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { MessageContext } from './../../../src/components/Message/MessageProvider';
import {useTranslation} from 'react-i18next';
const { LocalDeleteAllChat, DbAndLocalDeleteAllChat } = require("../../utils/deleteChats");
const DeleteChatButton = () => {
    const { t } = useTranslation();
  const { clearMessages } = useContext(MessageContext);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleDelete = async () => {
    try {
      console.log("got called")
     await DbAndLocalDeleteAllChat(clearMessages)
     setDeleteModalVisible(false);
    } catch (error) {
      console.log('Error deleting messages from AsyncStorage:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.option}
        onPress={() => setDeleteModalVisible(true)}
      >
        <View style={styles.optionContent}>
          <View style={styles.optionTextContainer}>
            <Ionicons name="trash-outline" size={24} color="black" />
            <Text style={styles.optionText}>{t('delete.first')}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <Modal visible={deleteModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{t('delete.confirm1')}</Text>
          <Text style={styles.modalText}>{t('delete.confirm2')}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={() => handleDelete()}>
            <Text style={styles.modalButtonText}>{t('delete.confirm3')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setDeleteModalVisible(false)}>
            <Text style={styles.modalButtonText}>{t('delete.confirm4')}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default DeleteChatButton;

const styles = {
    option: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
      optionContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      optionTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      optionText: {
        marginLeft: 15,
        fontSize: 18,
        color: '#333',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      modalText: {
        marginBottom: 20,
      },
      modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#007AFF',
        borderRadius: 10,
        marginBottom: 10,
      },
      cancelButton: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#FF0000',
        borderRadius: 5,
        marginBottom: 10,
      },
      modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
      },
};
