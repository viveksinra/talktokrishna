import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MessageContext } from '../components/Message/MessageProvider';
import ChatHistoryItem from '../components/ChatHistoryItem';
import NoChatHistory from '../components/ChatHistoryItem/NoChatHistory';
import lastMsg from '../../assets/data/lastMsg.json';
import ContentContext from '../Context/ContentContext';
const image = { uri: ContentContext.chatHisBag };

const ChatHistoryScreen = () => {
  const { messages } = useContext(MessageContext);
  function limitCharacters(inputString) {
    return inputString?.slice(0, 100);
  }
  function mergeArrays( gods, lastMessage) {
    const allMsgId = Object.keys(messages);

    const mergedArray = [];
  
  
    allMsgId.forEach((chatId) => {
      const message = messages[chatId];
      const godLink =  "krishna";
      const god = gods.find((g) => g.link === godLink);
      const last = message.length > 0 ? message[0] : lastMessage.find((msg) => msg.link === godLink);
      let lastMessage = limitCharacters(last?.text)
      const lastMessageTime = last.createdAt
      
      const mergedObject = {
        chatId: chatId,
        user: god,
        lastMessage,
        lastMessageTime
      };
  
      mergedArray.push(mergedObject);
    });
    // Rest of your code...
  
    return mergedArray;
  }
         
  function sortMessagesByCreatedAt(messages) {
    messages.sort((a, b) => {
      const dateA = new Date(a.lastMessageTime);
      const dateB = new Date(b.lastMessageTime);
      return dateB - dateA; // Sort in descending order
    });
    return messages;
  }
  const { t } = useTranslation();
  const gods = t('gods');
  const foGods = JSON.parse(gods);
  const mergedData = sortMessagesByCreatedAt(mergeArrays(foGods, lastMsg));

  if (mergedData.length === 0) {
    return (
    <NoChatHistory />
    );
  }

  return (
    <ImageBackground
      source={image}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <FlatList data={mergedData} renderItem={({ item }) => <ChatHistoryItem chat={item} />} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    // Add more styles as needed
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    justifyContent: 'center',
    // Add more styles as needed
  },
  
});

export default ChatHistoryScreen;