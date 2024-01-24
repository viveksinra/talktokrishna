import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MessageContext } from '../components/Message/MessageProvider';
import ChatHistoryItem from '../components/ChatHistoryItem';
import NoChatHistory from '../components/ChatHistoryItem/NoChatHistory';
import lastMsg from '../../commonAssets/data/lastMsg.json';
import ContentContext from '../Context/ContentContext';
import checkAndUpdateChatHistory from '../utils/checkAndUpdateChatHistory';
import GeneralLoading from '../components/General/GeneralLoading';

const image = { uri: ContentContext.chatHisBag };

const ChatHistoryScreen = () => {
  const {
   
    messages,
    clearMessages,
    replaceMessagesInAsyncStorageAndContext,
  } = useContext(MessageContext);
  const [loading, setLoading] = useState(false);

  const limitCharacters = (inputString) => inputString?.slice(0, 100);

  const mergeArrays = (gods, lastMessage) => {
    const allMsgId = Object.keys(messages);
    const mergedArray = [];

    allMsgId.forEach((chatId) => {
      const message = messages[chatId];
      const godLink = "krishna";
      const god = gods.find((g) => g.link === godLink);
      const last = message.length > 0 ? message[0] : lastMessage.find((msg) => msg.link === godLink);
      const lastMessageText = limitCharacters(last?.text);
      const lastMessageTime = last.createdAt;

      const mergedObject = {
        chatId: chatId,
        user: god,
        lastMessage: lastMessageText,
        lastMessageTime: lastMessageTime,
      };

      mergedArray.push(mergedObject);
    });

    return mergedArray;
  };

  const sortMessagesByCreatedAt = (messages) => {
    messages.sort((a, b) => {
      const dateA = new Date(a.lastMessageTime);
      const dateB = new Date(b.lastMessageTime);
      return dateB - dateA; // Sort in descending order
    });
    return messages;
  };

  const { t } = useTranslation();
  const gods = t('gods');
  const foGods = JSON.parse(gods);
  const mergedData = sortMessagesByCreatedAt(mergeArrays(foGods, lastMsg));

  const updateChatHis = async () => {
    const allMsgId = Object.keys(messages);
    const localChatCount = allMsgId.length;
    console.log({ localChatCount });
    setLoading(true);

    if (localChatCount <= 0) {
      await checkAndUpdateChatHistory(
        messages,
        clearMessages,
        replaceMessagesInAsyncStorageAndContext
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    updateChatHis();
  }, []); // Run the updateChatHis function once when the component mounts

  if (mergedData.length === 0) {
    return <><NoChatHistory />
      <GeneralLoading loading={loading} loadingText={'Updating Chat History'} />
    
    </>;
  }

  return (
    <ImageBackground source={image} style={styles.backgroundImage}>
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
