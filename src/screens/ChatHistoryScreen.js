import { View, Text } from 'react-native'
import React, { useContext } from 'react';
import ChatHistoryItem from '../components/ChatHistoryItem'
import enChats from '../../assets/data/enChats.json'
import lastMsg from '../../assets/data/lastMsg.json'
// import hiChats from '../../assets/data/hiChats.json'
import { FlatList } from 'react-native'
import {useTranslation} from 'react-i18next';
import { MessageContext } from '../components/Message/MessageProvider';

const ChatHistoryScreen = () => {
  const { messages } = useContext(MessageContext);

  function mergeArrays( gods, lastMessage) {
    const allMsgId = Object.keys(messages);

    const mergedArray = [];
  
  
    allMsgId.forEach((chatId) => {
      const message = messages[chatId];
      const godLink =  "krishna";
      const god = gods.find((g) => g.link === godLink);
      const lastMsg = message.length > 0 ? message[0] : lastMessage.find((msg) => msg.link === godLink);
      
  
      const mergedObject = {
        chatId: chatId,
        user: god,
        lastMessage: lastMsg,
      };
  
      mergedArray.push(mergedObject);
    });
    // Rest of your code...
  
    return mergedArray;
  }
         
  function sortMessagesByCreatedAt(messages) {
    messages.sort((a, b) => {
      const dateA = new Date(a.lastMessage.createdAt);
      const dateB = new Date(b.lastMessage.createdAt);
      return dateB - dateA; // Sort in descending order
    });
    return messages;
  }
  const { t } = useTranslation();
  const gods = t('gods');
  const foGods = JSON.parse(gods);
  const mergedData = sortMessagesByCreatedAt(mergeArrays(foGods, lastMsg));
  return (
    <>    
    
    <FlatList
    data={mergedData}
    renderItem={({item}) => <ChatHistoryItem chat={item}/>} /> 

    </>

  )
}

export default ChatHistoryScreen