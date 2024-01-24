import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MessageContext } from '../Message/MessageProvider';

const defaultGodImg = require('./../../../commonAssets/icon.png');
const { DbAndLocalDeleteOneChatId } = require("../../utils/deleteChats");

dayjs.extend(relativeTime);

const ChatListItem = ({ chat }) => {

  const {
    removeFullOneChatId,
  } = useContext(MessageContext);
  const navigation = useNavigation();
  const [imageLoadError, setImageLoadError] = useState(false);

  if (!chat || typeof chat !== 'object' || !chat.user) {
    console.log('Invalid chat object:', chat);
    return null;
  }


  const handleImageError = () => {
    setImageLoadError(true);
  };

  const onDelete = (chatId) => {
    console.log("delete me"+ chatId)
  
    DbAndLocalDeleteOneChatId(removeFullOneChatId,chatId)
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete this chat?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => onDelete(chat.chatId),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };




  const navigateToChat = () => {
    navigation.navigate('OneChats', {
      chatId: chat.chatId,
      id: chat.chatId,
      name: chat.user.name,
      image: chat.user.image,
      link: chat.user.link,
      isRec: false,
      isHistory: true,
    });
  };

  return (
    <Pressable onPress={navigateToChat} style={styles.container}>
      <Image
        source={imageLoadError ? defaultGodImg : { uri: chat.user.image }}
        onError={handleImageError}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.name}>
            {chat.user.name}
          </Text>
          <Text style={styles.subTitle}>
            {dayjs(chat.lastMessageTime).fromNow(true)}
          </Text>
        </View>
        <Text numberOfLines={2} style={styles.message}>
          {chat.lastMessage}
        </Text>
      </View>
      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <Icon name="delete" size={24} color="#FF0000" />
      </TouchableOpacity>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  content: {
    flex: 1,
    borderBottomColor: 'lightgray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
  },
  subTitle: {
    color: 'gray',
    fontSize: 12,
  },
  message: {
    color: '#555',
    fontSize: 14,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatListItem;
