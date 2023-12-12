import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MessageContext } from '../components/Message/MessageProvider';
import ChatHistoryItem from '../components/ChatHistoryItem';
import enChats from '../../assets/data/enChats.json';
import lastMsg from '../../assets/data/lastMsg.json';
const image = { uri: "https://images.unsplash.com/photo-1541140134513-85a161dc4a00?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JleSUyMHRleHR1cmV8ZW58MHx8MHx8fDA%3D" };

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

  return (
    <ImageBackground
      source={image} // Update the path accordingly
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